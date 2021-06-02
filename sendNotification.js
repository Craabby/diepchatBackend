module.exports = (ws, alert) => {
  ws.send(JSON.stringify({
    type: "message",
    pos: {
      x: undefined,
      y: undefined
    },
    m: alert,
    from: "[SERVER]"
  }))
}