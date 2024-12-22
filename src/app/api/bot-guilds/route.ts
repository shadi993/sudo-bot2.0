/**
 * API Route: /api/bot-guilds
 *
 * Description:
 * This API route fetches the list of guilds (servers) where the bot is installed.
 *
 * Features:
 * - Authenticated endpoint that requires a valid user session.
 * - Fetches guilds using the Discord API with the bot token.
 * - Returns a JSON response containing the list of bot-installed guilds.
 *
 * Authentication:
 * - Requires a valid user session.
 *
 * Environment Variables:
 * - DISCORD_BOT_TOKEN: The bot token used to authenticate with the Discord API.
 *
 * Response:
 * - 200: A list of guilds where the bot is installed.
 * - 401: Unauthorized if the user session is not valid.
 *
 * Usage:
 * This route is used by the frontend to reconcile guilds where the bot is installed.
 */

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch bot guilds using the bot token
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`, // Ensure this is securely set in .env
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch bot guilds. Status: ${response.status}, Message: ${errorText}`
      );
      return NextResponse.json(
        { error: "Failed to fetch bot guilds" },
        { status: response.status }
      );
    }

    const botGuilds = await response.json();
    return NextResponse.json(botGuilds);
  } catch (error) {
    console.error("Error in bot-guilds route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
