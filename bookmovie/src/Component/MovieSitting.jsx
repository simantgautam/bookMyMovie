import React, { useEffect, useState, useMemo } from "react";
import "./MovieSitting.css"; // Import CSS for styling (see below)
import BookingConfirmationPopup from "./PopUp";
import "./PopUp.css";
import { useNavigate } from "react-router-dom";

const MovieSitting = () => {
  // Initialize state to keep track of selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBookingValid, setIsBookingValid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const user = useMemo(
    () => JSON.parse(localStorage.getItem("ticket")) || {},
    []
  );

  useEffect(() => {
    // let ls = JSON.parse(localStorage.getItem("ticket")) || {};
    setIsBookingValid(
      user.name !== "" && selectedSeats.length === user.numOfTickets
    );
  }, [user, selectedSeats]);

  const handleBooking = () => {
    console.log("Booking confirmed for seats:", selectedSeats);
    localStorage.setItem("bookedTickets", JSON.stringify(selectedSeats));

    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedSeats([]);
    navigate("/");
    setShowPopup(false);
  };

  // Dummy data for theater rows and seats
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = [8, 8, 8, 8, 8, 6];

  // Function to toggle seat selection
  const toggleSeat = (row, seat) => {
    const seatIndex = selectedSeats.findIndex(
      (s) => s.row === row && s.seat === seat
    );
    if (seatIndex !== -1) {
      // Seat already selected, remove it
      setSelectedSeats(selectedSeats.filter((s, index) => index !== seatIndex));
    } else {
      console.log(user.numOfTickets);
      if (selectedSeats.length < user.numOfTickets) {
        setSelectedSeats([...selectedSeats, { row, seat }]);
      }
    }
  };

  return (
    <div className="theater-seating">
      <h2>Hello {user.name}. Please select your seats.</h2>
      <h2>Seating Arrangement</h2>
      <div className="seats-container">
        {rows.map((row, index) => (
          <div key={row} className="row">
            <span className="row-label">{row}</span>
            {[...Array(seatsPerRow[index]).keys()].map((seat) => (
              <div
                key={seat}
                className={`seat ${
                  selectedSeats.some((s) => s.row === row && s.seat === seat)
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleSeat(row, seat)}
              >
                {seat + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="book-button"
        onClick={handleBooking}
        disabled={!isBookingValid}
      >
        Book
      </button>
      {showPopup && <BookingConfirmationPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default MovieSitting;
