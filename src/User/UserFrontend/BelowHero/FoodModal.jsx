import React, { useState } from "react";
import axios from "axios";
import "./FoodModal.css";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const FoodModal = ({ food, onClose }) => {
  if (!food) return null; // ✅ prevent crash if no food selected

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const FIXED_AMOUNT = 1.20; // USD amount PayPal will accept
  const ITEM_NAME = food.name || "Food Order";

  const handleBuyNow = async () => {
    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/payment/create-order`, // ✅ using env
        { itemName: ITEM_NAME }
      );

      const { approvalUrl } = response.data;
      const paypalWindow = window.open(
        approvalUrl,
        "_blank",
        "width=500,height=600"
      );

      const interval = setInterval(() => {
        if (paypalWindow?.closed) {
          clearInterval(interval);
          setPaymentStatus("success");
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
          alt={food.name || "Food"}
          className="modal-image"
        />

        <h3>{food.name || "Food"}</h3>
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
              <p>Thank you for your order of {food.name || "Food"}.</p>
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
