module.exports = (ws, name) => {
  return (msg.name || "Unnamed").split('').splice(0, 15).join('') + ws.tag;
}