"use client";

import session from "express-session";
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
    if (status === "authenticated" && session?.accessToken) {
      fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const filteredServers = data.filter((guild: any) =>
            hasAdminPermissions(guild.permissions)
          );
          setServers(filteredServers);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching guilds:", err);
          setLoading(false); // Allow retry on error
        });

      // Fetch bot guilds
      fetch("/api/bot-guilds", {
        headers: {
          Authorization: `Bot ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Bot guilds:", data);
          setBotGuilds(data);
        })
        .catch((err) => console.error("Error fetching bot guilds:", err))
        .finally(() => setLoading(false));        

    } else if (status === "unauthenticated") {
      signIn();
    }
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
