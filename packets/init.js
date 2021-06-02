module.exports = (data, ws, alert) => {
  if (data.version !== "2.3") return alert(ws, "Your client is out of date")
}