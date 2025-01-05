"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { hasAdminPermissions } from "src/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServersList() {
  const { data: session, status } = useSession();
  const [servers, setServers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [botGuilds, setBotGuilds] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchServers() {
      try {
        if (status === "authenticated" && session?.accessToken) {
          // Fetch user guilds
          const userGuildsResponse = await fetch(
            "https://discord.com/api/users/@me/guilds",
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          if (!userGuildsResponse.ok) {
            throw new Error("Failed to fetch user guilds");
          }

          const userGuilds = await userGuildsResponse.json();
          const filteredServers = userGuilds.filter((guild: any) =>
            hasAdminPermissions(guild.permissions)
          );
          setServers(filteredServers);

          // Fetch bot guilds
          const botGuildsResponse = await fetch("/api/bot-guilds");
          if (!botGuildsResponse.ok) {
            throw new Error("Failed to fetch bot guilds");
          }

          const botGuildsData = await botGuildsResponse.json();
          setBotGuilds(botGuildsData);
        } else if (status === "unauthenticated") {
          signIn();
        }
      } catch (error) {
        console.error("Error fetching servers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServers();
  }, [session, status]);

  const isBotInstalled = (serverId: string) => {
    return botGuilds.some((botGuild: any) => botGuild.id === serverId);
  };

  const handleInstallBot = (serverId: string) => {
    const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=bot&permissions=8&guild_id=${serverId}`;
    window.open(inviteUrl, "_blank");
  };

  const handleRedirectToDashboard = (serverId: string) => {
    router.push(`/dashboard?serverId=${serverId}`);
  };

  if (loading) {
    return <p>Loading servers...</p>;
  }

  return (
    <ul className="space-y-4">
      {servers.map((server: any) => (
        <li
          key={server.id}
          className="flex items-center space-x-3 hover:bg-black/25 rounded-md p-2 cursor-pointer"
        >
          {server.icon ? (
            <Image
              src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
              alt={`${server.name} icon`}
              width="64"
              height="64"
              className="rounded-full"
            />
          ) : (
            <div className="rounded-full w-[64px] h-[64px] bg-gray-500"></div>
          )}
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{server.name}</h2>
          </div>
          {isBotInstalled(server.id) ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleRedirectToDashboard(server.id)}
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => handleInstallBot(server.id)}
            >
              Install Bot
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
