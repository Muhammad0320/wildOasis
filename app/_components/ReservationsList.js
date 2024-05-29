"use client";

import { deleteReservation } from "../_lib/actions";

import { useOptimistic } from "react";

import ReservationCard from "./ReservationCard";

export default function ReservationList({ bookings }) {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const handleDelete = async (bookingId) => {
    optimisticDelete(bookingId);

    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
