const fs = require('fs');

class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4 = [];

    let data = require('../data/data.json');

    if (data.today === this.today) {
      this.lastTicket = data.lastTicket;
      this.tickets = data.tickets;
      this.last4 = data.last4;
    } else {
      this.resetCounter();
    }
  }

  /**
   * Crea un nuevo ticket y lo almacena al final de un arreglo
   * Regresa el ultimo ticket atendido
   */
  nextTicket() {
    this.lastTicket++;
    let ticket = new Ticket(this.lastTicket, null);
    this.tickets.push(ticket);
    this.writeData();

    return `Ticket ${this.lastTicket}`;
  }

  /**
   * Regresa todo el estado de la clase a 0 y lo escribe en el archivo
   */
  resetCounter() {
    this.lastTicket = 0;
    this.tickets = [];
    this.last4 = [];
    this.writeData();
  }

  /**
   * Escribe el estado de esta clase en un archivo para persistirlo en caso de que el servidor se reinicie
   */
  writeData() {
    let data = {
      lastTicket: this.lastTicket,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4,
    };

    fs.writeFileSync('./server/data/data.json', JSON.stringify(data));
  }

  getLastTicket() {
    return `Ticket ${this.lastTicket}`;
  }

  getLast4() {
    return this.last4;
  }

  /**
   * Elimina la ultima posicion del arreglo de tickets, le asigna un escritorio y
   * lo pasa a un arreglo en donde se almacenan los ultimos 4 tickets atendidos.
   * Regresa el ticket que esta siendo atendido o null si ya no hay tickets
   * @param {int} escritorio
   */
  attendTicket(escritorio) {
    if (this.tickets.length === 0) return null;

    let ticket = this.tickets.shift();
    ticket.escritorio = escritorio;

    this.last4.unshift(ticket);

    if (this.last4.length > 4) this.last4.pop();

    console.log('Ultimos 4: ', this.last4);

    this.writeData();
    return ticket;
  }
}

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

module.exports = {
  TicketControl,
};
