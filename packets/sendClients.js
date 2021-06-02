module.exports = (ws, wss) => {
  const users = [];
  wss.clients.forEach(client => {
    if (client.readyState === 1 && (client.server === ws.server) || client.spectator) users.push(ws.name);
  })
  ws.send(JSON.stringify({
    type: 'userlist',
    users
  }));
}