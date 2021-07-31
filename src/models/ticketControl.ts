import path from 'path';
import fs from 'fs';

import data from '../data/db.json';
import Ticket from './ticket';

class TicketControl {
  public ultimo: number;
  public hoy: number;
  public tickets: Ticket[];
  public ultimosCuatro: Ticket[];

  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimosCuatro = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimosCuatro: this.ultimosCuatro,
    };
  }

  init() {
    const { ultimo, ultimosCuatro, hoy, tickets } = data;
    if (this.hoy === hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimosCuatro = ultimosCuatro;
    } else {
      this.guardDB();
    }
  }
  guardDB() {
    fs.writeFileSync(path.join(__dirname, '../data/db.json'), JSON.stringify(this.toJson));
  }

  next() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, 0);
    this.tickets.push(ticket);

    this.guardDB();

    return ticket.numero;
  }

  asignarTicketToEscrito(escritorio: number) {
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets[0];
    this.tickets.shift();
    ticket.escritorio = escritorio;
    this.ultimosCuatro.unshift(ticket);
    if (this.ultimosCuatro.length > 4) {
      this.ultimosCuatro.splice(-1, 1);
    }
    this.guardDB();
    return ticket;
  }
}

export default TicketControl;
