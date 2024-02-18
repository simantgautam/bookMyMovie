import React from "react";
import { Route, Routes } from "react-router-dom";
import TicketBookingForm from "../TicketBookingForm";
import MovieSitting from "../MovieSitting";

function AllRoutes(props) {
  const route = [
    {
      path: "/",
      element: (
        <>
          <TicketBookingForm />
        </>
      ),
    },
    {
      path: "/movieSitting",
      element: (
        <>
          <MovieSitting />
        </>
      ),
    },
  ];
  return (
    <>
      <Routes>
        {route.map((elem, i) => {
          return <Route key={i} path={elem.path} element={elem.element} />;
        })}
      </Routes>
    </>
  );
}

export default AllRoutes;
