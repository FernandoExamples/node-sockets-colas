var socket = io();
var lblTicket = $('#lblNuevoTicket');

socket.on('connect', function () {
  console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
  console.log('Desconectado del servidor');
});

socket.on('actualState', function (data) {
  lblTicket.text(data.actual);
});

$('button').click(function (e) {
  e.preventDefault();
  socket.emit('nextTicket', null, function (nextTicket) {
    lblTicket.text(nextTicket);
  });
});
