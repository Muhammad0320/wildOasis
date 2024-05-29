"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export const signinAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signoutAction = async () => {
  await signOut({ redirect: "/" });
};

export const updateFunction = async (formData) => {
  const session = await auth();

  if (!session.user) throw new Error(" You must be logged in ");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationaity").split("%");
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (!regex.test(nationalID)) {
    throw new Error("Please provide a valid national id");
  }

  const updateDate = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updateDate)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
};

export const deleteReservation = async (bookingId) => {
  const session = await auth();

  if (!session.user) throw new Error(" You must be logged in ");

  const bookingIds = (await getBookings(session.user.guestId)).map(
    (booking) => booking.id
  );

  if (!bookingIds.includes(bookingId))
    throw new Error(" You are not allowed to perform this action ");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
};
