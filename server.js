import {express} from 'express';
import {next} from 'next';
import {session} from 'express-session';
import {dotenv} from 'dotenv';


dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Setup express-session
  server.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in production
  }));

  // Custom route for OAuth2 (can also be part of the API routes)
  server.get('/api/auth/discord', async (req, res) => {
    const { code } = req.query;

    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const tokenData = tokenResponse.data;

    // Fetch the user data
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    req.session.user = userResponse.data;
    res.redirect('/dashboard');
  });

  // Handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});