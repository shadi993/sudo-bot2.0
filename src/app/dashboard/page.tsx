/**
 * Dashboard Page
 *
 * This component renders the dashboard for a specific server, identified by its serverId.
 * It ensures that the user is authenticated before granting access.
 *
 * Features:
 * - Redirects unauthenticated users to the sign-in page.
 * - Displays the server ID passed via query parameters.
 * - Includes a "Back to Server List" link for easy navigation.
 */

"use client";

import { useSession, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const serverId = searchParams.get("serverId");
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    signIn();
    return null; // Prevent rendering anything while redirecting
  }

  return (
    <div className="p-4">
      <button
        onClick={() => router.push("/servers")}
        className="text-blue-500 hover:underline"
      >
        &larr; Back to Server List
      </button>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-700">Server ID: {serverId}</p>
      {/* Add your dashboard functionality here */}
    </div>
  );
}
