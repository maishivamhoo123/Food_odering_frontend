import React, { useEffect, useState } from "react";
import { getPendingOrders, acceptOrder, updatePartnerLocation } from "../API/DeliveryPartner";
import OrderCard from "./OrderCard";
import MapView from "./MapView";
import "./dashboard.css";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [acceptedOrder, setAcceptedOrder] = useState(null);
  const [partnerLocation, setPartnerLocation] = useState({ latitude: 0, longitude: 0 });

  const fetchOrders = async () => {
    try {
      const { data } = await getPendingOrders();
      setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const handleAccept = async (order) => {
    try {
      // Get partnerId from JWT
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const partnerId = JSON.parse(atob(token.split(".")[1]))._id;

      await acceptOrder(order._id, partnerId); // Send partnerId in body
      setAcceptedOrder(order);

      // Remove accepted order from pending list
      setOrders((prev) => prev.filter((o) => o._id !== order._id));
    } catch (err) {
      console.error("Failed to accept order", err);
    }
  };

  // Live location tracking
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setPartnerLocation({ latitude, longitude });

        if (acceptedOrder) {
          try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const partnerId = JSON.parse(atob(token.split(".")[1]))._id;

            await updatePartnerLocation(partnerId, latitude, longitude);
          } catch (err) {
            console.error("Failed to update location", err);
          }
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [acceptedOrder]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Delivery Partner Dashboard</h1>

      <div className="orders-list">
        <h2>Pending Orders</h2>
        {orders.length === 0 ? (
          <p>No pending orders</p>
        ) : (
          orders.map((order) => (
            <OrderCard key={order._id} order={order} onAccept={handleAccept} />
          ))
        )}
      </div>

      {acceptedOrder && acceptedOrder.dropLocation && (
        <div className="map-section">
          <h2>Live Location & Drop Point</h2>
          <MapView partnerLocation={partnerLocation} dropLocation={acceptedOrder.dropLocation} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
