import * as http from "http";
// import { Server } from 'ws';
import { normalizePort } from "./src/utils/normalizePort";
import { getExpressApp } from "./src/endpoints";
import { DEV_PORT, IS_PROD } from "./conf";

const port = normalizePort(process.env.PORT || IS_PROD ? "80" : DEV_PORT);

const server = http.createServer();

// const wss: Server = new Server({ server, perMessageDeflate: false });
// wss.on('connection', (ws) => {
//   ws.on('close', () => {});
//   ws.on('message', (websocketData) => {});
// });

server.on("request", getExpressApp());

server.listen(port, () => console.log(`Listening on ${port}`));
