import React, { useState } from "react";
import axios from "axios";
import "./FoodModal.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FoodModal = ({ food, onClose }) => {
  if (!food) return null;

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const FIXED_AMOUNT = 1.20; // USD
  const ITEM_NAME = food.Food_name || "Food Order";

  const handleBuyNow = async () => {
    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Step 1: Start PayPal Order
      const response = await axios.post(`${BASE_URL}/payment/create-order`, {
        itemName: ITEM_NAME,
      });

      const { approvalUrl } = response.data;
      const paypalWindow = window.open(
        approvalUrl,
        "_blank",
        "width=500,height=600"
      );

      // Step 2: Poll if PayPal closed
      const interval = setInterval(async () => {
        if (paypalWindow?.closed) {
          clearInterval(interval);

          try {
            // Step 3: Create Order in Backend (after payment success)
            await axios.post(`${BASE_URL}/order/create`, {
              foodId: food._id, // from schema
              customerName: "John Doe", // TODO: Replace with logged-in user
              customerAddress: "123 Main Street", // TODO: Replace with user input/profile
              restaurantId: food.restaurantId,
              dropLocation: "Office, Downtown", // TODO: Replace with live location/choice
            });

            setPaymentStatus("success");
          } catch (orderErr) {
            console.error("Order creation failed:", orderErr);
            setPaymentStatus("error");
          }

          setIsProcessing(false);
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setPaymentStatus("error");
      setIsProcessing(false);
    }
  };

  const closePaymentMessage = () => {
    if (paymentStatus === "success") onClose();
    setPaymentStatus(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <img
          src={food.image || "https://source.unsplash.com/400x400/?food"}
          alt={food.Food_name || "Food"}
          className="modal-image"
        />

        <h3>{food.Food_name || "Food"}</h3>
        <p className="modal-price">Price: ${FIXED_AMOUNT} USD</p>

        <button
          className={`buy-btn ${isProcessing ? "processing" : ""}`}
          onClick={handleBuyNow}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay $${FIXED_AMOUNT}`}
        </button>

        {/* Payment Status */}
        {paymentStatus === "success" && (
          <div className="payment-popup-overlay">
            <div className="payment-popup success">
              <h3>Payment Successful!</h3>
              <p>Thank you for your order of {food.Food_name || "Food"}.</p>
              <button onClick={closePaymentMessage}>OK</button>
            </div>
          </div>
        )}

        {paymentStatus === "error" && (
          <div className="payment-popup-overlay">
            <div className="payment-popup error">
              <h3>Payment Failed</h3>
              <p>Something went wrong. Please try again.</p>
              <button onClick={closePaymentMessage}>Try Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodModal;
