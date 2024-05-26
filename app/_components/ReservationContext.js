"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

const ReservationContextProvider = ({ children }) => {
  const { range, setRange } = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {" "}
      {children}{" "}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) throw new Error("Context is used outside of it's provider");

  return context;
};

export { useReservation, ReservationContextProvider };
