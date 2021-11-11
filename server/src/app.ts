import { config as dotenv } from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import WebSocket from "ws";

dotenv();

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });

app.get("/", (req: Request, res: Response) => {
  res.send("Server");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
