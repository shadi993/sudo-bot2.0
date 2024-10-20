import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&response_type=code&scope=identify guilds email`;

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
        <a 
          href={discordAuthUrl} 
          className="bg-[#d1294e] text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
          Login with Discord
        </a>

        {/* Link to dashboard */}
        <Link href="/dashboard" legacyBehavior>
          <a className="mt-4 text-lg text-[#d1294e] underline hover:text-red-300">
            Go to Dashboard
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;