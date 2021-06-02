module.exports = (ws, message) => {
  ws.send(JSON.stringify({
    type: "message",
    pos: {
      x: undefined,
      y: undefined
    },
    m: message,
    from: "[SERVER]"
  }))
}