"use client";

import React from "react";
import Link from "next/link";
import { Button } from "src/components/Button/Button";
import { signIn } from "next-auth/react";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[#131217] z-0" />

      {/* Content styling */}
      <div className="relative z-10">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to the Discord Bot Dashboard
        </h1>
        <p className="text-xl mb-6">
          Manage your Discord bot easily from this interface.
        </p>

        {/* Login Button */}
        <Button
          href="#"
          onClick={() => {
            signIn("discord", { callbackUrl: "/servers" });
          }}
          className="bg-[#d1294e] text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
        >
          Login with Discord
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
