import { Socket } from 'socket.io';
import TicketControl from '../models/ticketControl';

const ticketControl = new TicketControl();

const socketController = (socket: Socket) => {
  console.log('client connection established', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
  // TODO: ticket
  socket.emit('lastTicket', ticketControl.ultimo);
  socket.emit('cola-actual', ticketControl.ultimosCuatro);
  socket.emit('tickets-pendientes', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    callback(ticketControl.next());
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
  });

  socket.on('asignar-escritorio', (payload, callback) => {
    if (!payload.pc) {
      return callback({
        status: 412,
        message: 'El escritorio es requerido',
      });
    }

    const ticket = ticketControl.asignarTicketToEscrito(parseInt(payload.pc));

    if (!ticket) {
      return callback({
        status: 404,
        message: 'No hay más tickets pendientes',
      });
    } else {
      socket.broadcast.emit('cola-actual', ticketControl.ultimosCuatro);
      socket.emit('tickets-pendientes', ticketControl.tickets.length);
      socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
      callback({
        status: 200,
        ticket,
      });
    }
  });
  // socket.on('message', (payload: any, callback: Function) => {
  //   const payloadResult = {
  //     id: 'fsdfsdf544545',
  //     date: new Date().toLocaleDateString(),
  //   };

  //   callback(payloadResult);

  //   socket.broadcast.emit('messages', payload);
  // });
};

export default socketController;
