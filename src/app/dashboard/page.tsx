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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // just a templet for chart 
  const joinLeaveData = {
    labels: ["2024-12-26", "2024-12-27", "2024-12-28", "2024-12-29", "2024-12-30", "2024-12-31", "2025-01-01"],
    datasets: [
      {
        label: "Joins",
        data: [2, 4, 3, 6, 4, 5, 3],
        borderColor: "#6efce4",
        backgroundColor: "rgba(110, 252, 228, 0.2)",
        fill: true,
      },
      {
        label: "Leaves",
        data: [1, 2, 3, 4, 3, 4, 2],
        borderColor: "#d1294e",
        backgroundColor: "rgba(209, 41, 78, 0.2)",
        fill: true,
      },
    ],
  };

  const memberFlowData = {
    labels: ["2024-12-26", "2024-12-27", "2024-12-28", "2024-12-29", "2024-12-30", "2024-12-31", "2025-01-01"],
    datasets: [
      {
        label: "Memberflow",
        data: [450, 460, 455, 452, 455, 450, 460],
        borderColor: "#6a5acd",
        backgroundColor: "rgba(106, 90, 205, 0.2)",
        fill: true,
      },
    ],
  };

  const messageData = {
    labels: ["2024-12-26", "2024-12-27", "2024-12-28", "2024-12-29", "2024-12-30", "2024-12-31", "2025-01-01"],
    datasets: [
      {
        label: "Messages",
        data: [200, 300, 450, 500, 700, 600, 400],
        borderColor: "#d1294e",
        backgroundColor: "rgba(209, 41, 78, 0.2)",
        fill: true,
      },
    ],
  };

  if (status === "loading") {
    return <p className="text-white">Loading...</p>;
  }

  if (status === "unauthenticated") {
    signIn();
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="flex h-screen bg-[#131217] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 h-full bg-[#1a1818] border-r border-gray-700 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:static lg:translate-x-0 lg:w-64`}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4 hidden lg:block text-center">
          Dashboard
        </h2>
        <ul className="space-y-4">
          {["overview", "utility", "moderation"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === tab ? "bg-[#d1294e]" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSidebarOpen(false); // Close sidebar on mobile after selecting
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto lg:ml-64">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white focus:outline-none lg:hidden"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-3xl font-bold">Server Dashboard</h1>
          <button
            onClick={() => router.push("/servers")}
            className="px-4 py-2 bg-[#6efce4] text-[#131217] rounded-md font-semibold"
          >
            Back to Server List
          </button>
        </div>

        <div>
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Joins / Leaves Chart */}
                <div className="bg-[#1a1818] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Joins / Leaves</h3>
                  <Line data={joinLeaveData} />
                </div>

                {/* Memberflow Chart */}
                <div className="bg-[#1a1818] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Memberflow</h3>
                  <Line data={memberFlowData} />
                </div>

                {/* Messages Chart */}
                <div className="bg-[#1a1818] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Number of messages (excl. Bots)</h3>
                  <Line data={messageData} />
                </div>
              </div>
            </div>
          )}
          {activeTab === "utility" && (
            <div>
              <h2 className="text-2xl font-semibold">Utility Settings</h2>
              <p>Utility-related settings and configurations go here.</p>
            </div>
          )}
          {activeTab === "moderation" && (
            <div>
              <h2 className="text-2xl font-semibold">Moderation Settings</h2>
              <p>Moderation-related settings and configurations go here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

