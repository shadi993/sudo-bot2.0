"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { hasAdminPermissions } from "src/lib/utils";
import Image from "next/image";
import ServersList from "src/components/ServersList/ServersList";

export default function ServersPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <Image
        src={session?.user?.image || ""}
        alt="User avatar"
        width={100}
        height={100}
        className="rounded-full mt-10"
      />
      <h1 className="text-4xl font-bold mt-4">
        Welcome, {session?.user?.name || "User"}
      </h1>
      <h1 className="text-4xl font-bold mb-6">Your Discord Servers</h1>
      <ServersList />
    </div>
  );
}
