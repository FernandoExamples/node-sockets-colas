const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
  //Listen Events
  client.on('nextTicket', (data, callback) => {
    let nextTicket = ticketControl.nextTicket();
    callback(nextTicket);
    console.log('Siguiente ticket: ' + nextTicket);
  });

  client.on('attendTicket', function (data, callback) {
    let attendTicket = ticketControl.attendTicket(data.escritorio);

    callback(attendTicket);

    if (attendTicket)
      client.broadcast.emit('last4', {
        last4: ticketControl.getLast4(),
      });
  });

  //Emit Events
  client.emit('actualState', {
    actual: ticketControl.getLastTicket(),
    last4: ticketControl.getLast4(),
  });
});
