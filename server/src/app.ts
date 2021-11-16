import express, { Request, Response } from "express";
import http from "http";
import WebSocket from "ws";
import { config as dotenv } from "dotenv";
import { buffer } from "stream/consumers";

dotenv();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client connected");
  ws.send("Welcome New clien!");

  ws.on("message", function incoming(message) {
    const newMessage = JSON.parse(message.toString());

    console.log(newMessage);
    ws.send("got message ");
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
