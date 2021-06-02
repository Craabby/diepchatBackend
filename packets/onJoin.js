const makeName = require("./makeName")

module.exports = (ws, msg) => {
  ws.server = msg.server;
  if (!ws.name) return ws.name = makeName(ws, msg.name);
  ws.name = msg.name;
}