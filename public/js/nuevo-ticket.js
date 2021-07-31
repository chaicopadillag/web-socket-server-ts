((d, c) => {
    const labelNewTicket = d.querySelector('#lblNuevoTicket'),
        btnGenerateTicket = d.querySelector('.btn');

    const socket = io();

    socket.on('connect', () => {
        console.log('connectado');
        btnGenerateTicket.disabled = false;
        socket.on('lastTicket', payload => {

            labelNewTicket.innerText = 'Ticket # ' + payload;
        })

    })

    socket.on('disconnect', () => {
        btnGenerateTicket.disabled = true;
        console.log('desconectado');
        labelNewTicket.innerText = 'Reconectando... ';
    })

    btnGenerateTicket.addEventListener('click', () => {
        socket.emit('next-ticket', null, (next) => {
            labelNewTicket.innerText = 'Ticket # ' + next;
        });
    });


})(document, console)