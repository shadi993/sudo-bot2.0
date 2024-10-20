import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = req.cookies['access_token']; 

    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const response = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching servers:', error);
    return res.status(500).json({ error: 'Failed to fetch servers' });
  }
}