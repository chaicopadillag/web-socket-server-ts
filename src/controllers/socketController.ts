import { Socket } from 'socket.io';
const socketController = (socket: Socket) => {
  console.log('client connection established', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });

  socket.on('message', (payload: any, callback: Function) => {
    const payloadResult = { id: 'fsdfsdf544545', date: new Date().toLocaleDateString() };
    callback(payloadResult);
    socket.broadcast.emit('messages', payload);
  });
};

export default socketController;
