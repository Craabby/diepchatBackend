module.exports = (ws, msg) => {
  return (msg.name || "Unnamed").split('').splice(0, 15).join('') + ws.tag;
}