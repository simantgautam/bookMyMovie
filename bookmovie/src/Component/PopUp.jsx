import React from "react";
import "./PopUp.css";

const BookingConfirmationPopup = ({ onClose }) => {
  return (
    <div className="booking-confirmation-popup">
      <div className="popup-content">
        <h2>Booking Confirmed!</h2>
        <p>Your booking has been successfully confirmed.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingConfirmationPopup;
