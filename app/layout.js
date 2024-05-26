import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import { Josefin_Sans } from "next/font/google";

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationContextProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },

  description:
    " Luxirious Cabin Hotel located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} antialiased bg-primary-950 text-primary-50 min-h-screen flex flex-col `}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full ">
            <ReservationContextProvider>{children}</ReservationContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
