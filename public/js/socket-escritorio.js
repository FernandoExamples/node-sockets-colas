var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) window.location = 'index.html';

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').click(function (e) {
  e.preventDefault();

  socket.emit('attendTicket', { escritorio: escritorio }, function (resp) {
    if (!resp) {
      alert('Ya no hay tickets');
      $('small').text('Ya no hay tickets');

      return;
    }
    $('small').text('Ticket ' + resp.numero);
  });
});
