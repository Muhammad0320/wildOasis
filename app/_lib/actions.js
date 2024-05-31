"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

export const createBooking = async (data, formData) => {
  const session = await auth();

  if (!session.user) throw new Error(" You must be logged in ");

  const newBooking = {
    ...data,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: data.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "uncomfirmed",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) throw new Error("Booking could not be created");
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

export const editReservation = async (formData) => {
  const session = await auth();

  if (!session.user) throw new Error(" You must be logged in ");

  const bookingId = +formData.get("id");

  const bookingIds = (await getBookings(session.user.guestId)).map(
    (booking) => booking.id
  );

  if (!bookingIds.includes(bookingId))
    throw new Error(" You are not allowed to perform this action ");

  if (error) throw new Error("Guest could not be updated");

  const guests = +formData.get("numGuests");

  const observations = formData.get("observations").slice(0, 1000);

  const { error } = await supabase
    .from("guests")
    .update({ numGuests: guests, observations })
    .eq("id", bookingIds)
    .select()
    .single();

  revalidatePath("/account/reservations", "layout");

  redirect("/account/reservations");
};
