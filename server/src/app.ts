import express, { Request, Response } from "express";
import http from "http";
import WebSocket from "ws";
import { config as dotenv } from "dotenv";

dotenv();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client connected");
  ws.send("Welcome New clien!");

  ws.on("message", function incoming(message) {
    console.log("received:", message);
    ws.send("got message " + message);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
