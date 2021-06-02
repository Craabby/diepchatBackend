module.exports = (ws, wss) => {
  const users = [];
  wss.clients.forEach(client => {
    if ((client.server === ws.server) || client.spectator) users.push(client.name);
  })
  ws.send(JSON.stringify({
    type: 'userlist',
    users
  }));
}