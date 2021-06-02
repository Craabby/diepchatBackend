module.exports = (ws, wss) => {
  const users = [];
  for (let client of wss.clients) {
    if (client.readyState === 1 && (client.server === ws.server) || client.spectator) users.push(ws.name);
  }
  ws.send(JSON.stringify({
    type: 'userlist',
    users
  }));
}