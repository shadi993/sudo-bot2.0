"use client";

import session from "express-session";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { hasAdminPermissions } from "src/lib/utils";
import Image from "next/image";

export default function ServersList() {
  const { data: session, status } = useSession();
  const [servers, setServers] = useState<any>([]);
  const [fetching, setFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken && !fetching) {
      setFetching(true);
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
          setHasFetched(true);
        })
        .catch((err) => {
          console.error("Error fetching guilds:", err);
          setFetching(false); // Allow retry on error
        });
    } else if (status === "unauthenticated") {
      signIn();
    }
  }, [session, status, fetching]);

  return (
    <ul className="space-y-4 ">
      {servers.length > 0 ? (
        servers.map((server: any) => (
          <li
            key={server.id}
            className="flex items-center space-x-3 hover:bg-black/25 rounded-md p-2 cursor-pointer"
            onClick={() => {
              alert("add bot to the server or whatever");
            }}
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
              <div className="rounded-full w-[64px] h-[64px] bg-gray-500 "></div>
            )}
            <h2 className="font-semibold text-lg">{server.name}</h2>
          </li>
        ))
      ) : (
        <p className="text-red-500">
          {!hasFetched
            ? "Loading your servers..."
            : "You are not in any servers or they failed to load."}
        </p>
      )}
    </ul>
  );
}
