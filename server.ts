import { createServer } from "http";
import next from "next";
import { startBot } from "./src/bot/index";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  server.listen(port, async () => {
    console.log(`> Ready on http://localhost:${port}`);
    await startBot(); 
  });
});