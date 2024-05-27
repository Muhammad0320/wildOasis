"use server";

import { signIn, signOut } from "./auth";

export const signinAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signoutAction = async () => {
  await signOut({ redirect: "/" });
};
