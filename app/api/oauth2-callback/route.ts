import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const body = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    scope: 'identify email guilds',
  };

  try {
    const { data } = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams(body),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  
    const userInfo = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    const userGuilds = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
  
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';

    // Redirect to the servers page with an absolute URL
    return NextResponse.redirect(`${protocol}://${host}/servers`);
  } catch (error) {
    if (error.response) {
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error('Request error (no response received):', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
  
    return NextResponse.json({ error: 'OAuth2 token exchange failed' }, { status: 500 });
  }
}