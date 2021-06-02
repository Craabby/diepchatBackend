module.exports = (ws, msg, makeName) => {
  ws.server = msg.server;
  ws.name = ws.name ? ws.name : makeName(ws, msg);
}