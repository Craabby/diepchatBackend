module.exports = (line, alert, wss) => {
  switch (line.split(' ')[0]) {
    case "clients": {
      wss.clients.forEach(client => console.log(client.server, client.name))
      break;
    }
    case "alert": {
      wss.clients.forEach(client => client.send(JSON.stringify({
        type: 'message',
        m: line.substring("alert ".length),
        pos: {
          x: undefined, //if the client recieves a message with no position, it is in the top left
          y: undefined
        },
        from: "[SERVER]"
      })))
      break;
    }
    default: {
      console.log("Unknown command");
    }
  }
}