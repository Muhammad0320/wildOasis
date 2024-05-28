"use server";

import { auth, signIn, signOut } from "./auth";

export const signinAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signoutAction = async () => {
  await signOut({ redirect: "/" });
};

export const updateFunction = async (formData) => {
  const session = await auth();

  if (!session) throw new Error(" You must be logged in ");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationaity").split("%");
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (!regex.test(nationalID)) {
    throw new Error("Please provide a valid national id");
  }
};
