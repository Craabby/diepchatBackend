const WebSocket = require('ws');
const crypto = require('crypto');
const readline = require('readline');
const terminalCommands = require("./packets/terminalCommands");
const sendToAll = require("./packets/sendToAll");
const makeName = require("./packets/makeName");
const join = require("./packets/onJoin");
const sendClients = require("./packets/sendClients");
const init = require("./packets/init");
const alert = require("./sendNotification")

const wss = new WebSocket.Server({ port: 3000 });

const rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', line => {
  terminalCommands(line, alert, wss);
});

let usercount = 0;

wss.on('connection', (ws, req) => {
  console.log('connection');
  ws.on('error', console.log)
  if (!req.headers.upgrade ||
    !req.headers.connection ||
    !req.headers.host ||
    !req.headers.pragma ||
    !req.headers['cache-control'] ||
    !req.headers['user-agent'] ||
    (req.headers.origin !== 'https://diep.io' &&
      req.headers.origin !== 'https://www.diepchat.xyz') ||
    !req.headers['sec-websocket-version'] ||
    !req.headers['accept-encoding'] ||
    !req.headers['accept-language'] ||
    !req.headers['sec-websocket-key'] ||
    !req.headers['sec-websocket-extensions']) ws.terminate();

  if (req.headers.origin === "https://www.diepchat.xyz") ws.spectator = true;

  if (ws.spectator) {
    sendClients(ws, wss);
    console.log("hello spectator")
  }

  ws.tag = '#' + crypto.createHmac('sha256', 'DiepChat').update(Math.random().toString()).digest('hex').split('').splice(0, 4).join(''); // math random so that i dont have to change very much and it is 0-f
  ws.id = Math.random().toString(16).substr(2);
  usercount++;

  ws.versionTimeout = setTimeout(() => alert(ws, "Your script is out of date. Please update it"), 2000)
  ws.on('close', () => {

    console.log('bye client', typeof ws.name === "string" ? ws.name : "spectator");
    usercount--;
    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        type: 'usercount',
        count: usercount
      }));
    });
  });
  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      type: 'usercount',
      count: usercount
    }));
  });

  ws.on('message', (msg) => {
    try {
      msg = JSON.parse(msg);
    }
    catch {
      return ws.close();
    }

    if (!(msg instanceof Object)) {
      console.log('crash');
      return ws.close();
    };
    console.log(msg);
    switch (msg.type) {
      case 'message': return sendToAll(ws, msg, wss);
      case 'join': return join(ws, msg, makeName);
      case 'users': return sendClients(ws, wss);
      case 'init': return init(msg, ws, alert);
      default: ws.terminate();
    }
  });
});

process.on('uncaughtExeption', console.log);
