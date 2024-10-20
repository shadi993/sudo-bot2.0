"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ServersPage() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    async function fetchServers() {
      try {
        const response = await axios.get('/api/servers');
        setServers(response.data);
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    }
    fetchServers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Your Discord Servers</h1>
      <ul className="space-y-4">
        {servers.length > 0 ? (
          servers.map((server: any) => (
            <li key={server.id} className="flex items-center space-x-3">
              <img
                src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                alt={`${server.name} icon`}
                width="32"
                height="32"
                className="rounded"
              />
              <span>{server.name}</span>
            </li>
          ))
        ) : (
          <p className="text-red-500">You are not in any servers or they failed to load.</p>
        )}
      </ul>
    </div>
  );
}
