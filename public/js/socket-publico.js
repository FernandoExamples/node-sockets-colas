var socket = io();

var lblTickets = [
  $('#lblTicket1'),
  $('#lblTicket2'),
  $('#lblTicket3'),
  $('#lblTicket4'),
];
var lblEscritorios = [
  $('#lblEscritorio1'),
  $('#lblEscritorio2'),
  $('#lblEscritorio3'),
  $('#lblEscritorio4'),
];

socket.on('actualState', function (data) {
  console.log(data);
  updateHTML(data.last4);
});

socket.on('last4', function (data) {
  console.log(data);
  var audio = new Audio('audio/new-ticket.mp3');
  audio.play();
  updateHTML(data.last4);
});

function updateHTML(last4) {
  for (var i = 0; i <= last4.length - 1; i++) {
    lblTickets[i].text('Ticket ' + last4[i].numero);
    lblEscritorios[i].text('Escritorio ' + last4[i].escritorio);
  }
}
