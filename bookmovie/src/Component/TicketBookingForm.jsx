import React, { useState } from "react";
import "./TicketBookingForm.css";
import { useNavigate } from "react-router-dom";

const TicketBookingForm = () => {
  const [name, setName] = useState("");
  const [numTickets, setNumTickets] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      name: name,
      numOfTickets: numTickets,
    };
    console.log(`Booking submitted for ${name} for ${numTickets} ticket(s)`);
    localStorage.setItem("ticket", JSON.stringify(user));

    setName("");
    setNumTickets(1);
    navigate("/movieSitting");
  };

  return (
    <div>
      <h2>Ticket Booking</h2>
      <form className="ticket-booking-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Number of Tickets:
          <select
            value={numTickets}
            onChange={(event) => setNumTickets(parseInt(event.target.value))}
          >
            {[...Array(8).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default TicketBookingForm;
