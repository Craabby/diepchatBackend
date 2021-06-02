module.exports = (ws, data, wss) => {
  if (!data) return;
  if (!data.m) return;
  if (!data.pos) return;
  if (data.pos.x == null || data.pos.y == null) return; // error handling
  wss.clients.forEach(client => {
    if (client.readyState !== 1) return; // dont send a message to a client that has not finished connecting
    if ((ws.server === client.server) || client.spectator) client.send(JSON.stringify({
      type: "message",
      pos: {
        x: data.pos.x,
        y: data.pos.y
      },
      m: data.m,
      from: ws.name
    }));
  });
}