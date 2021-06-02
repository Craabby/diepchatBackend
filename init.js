module.exports = (data, ws, currentVersion) => {
  if (data !== currentVersion) return ws.send(JSON.stringify({
    type: "outdated_client"
  }));
}