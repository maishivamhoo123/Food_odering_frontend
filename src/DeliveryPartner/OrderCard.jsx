import React from "react";

const OrderCard = ({ order, onAccept }) => {
  return (
    <div className="order-card">
      <p><strong>Customer:</strong> {order.customerName}</p>
      <p><strong>Address:</strong> {order.customerAddress}</p>
      <p><strong>Restaurant ID:</strong> {order.restaurantId}</p>
      <button onClick={() => onAccept(order)}>Accept Order</button>
    </div>
  );
};

export default OrderCard;
