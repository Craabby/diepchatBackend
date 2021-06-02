module.exports = (ws, name) => {
  return (name || "Unnamed").split('').splice(0, 15).join('') + ws.tag;
}