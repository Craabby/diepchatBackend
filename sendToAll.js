module.exports = (ws, data, wss) => {
  if (!data) return;
  if (!data.pos) return;
  if (data.pos.x == null || data.pos.y == null) return; 
  wss.clients.forEach(client => {
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