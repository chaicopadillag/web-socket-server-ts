((d, c) => {
    const socket = io();

    const labelTicketActual = d.querySelector('.ticket-actual'),
        btnAtenderTicket = d.querySelector('.btn-primary'),
        pcLabel = d.querySelector('.pc'),
        $lblPendientes = d.getElementById('lblPendientes');

    const queryParams = new URLSearchParams(window.location.search);

    if (!queryParams.has('escritorio')) {
        window.location = 'index.html';
        throw new Error('El escritorio es requerido');
    }

    const pc = queryParams.get('escritorio');
    pcLabel.innerText = 'Escritorio # ' + pc;


    socket.on('connect', () => {
        console.log('connectado');
        btnAtenderTicket.disabled = false;

    })

    socket.on('disconnect', () => {
        btnAtenderTicket.disabled = true;
        console.log('desconectado');
        labelTicketActual.innerText = 'Reconectando... ';
    })

    socket.on('tickets-pendientes', payload => {
        $lblPendientes.innerText = payload;
    })
    
    btnAtenderTicket.addEventListener('click', () => {
        socket.emit('asignar-escritorio', { pc }, (result) => {

            if (result.status === 200) {
                const { ticket } = result;
                labelTicketActual.innerText = 'Ticket # ' + ticket.numero;
                d.querySelector('.alert').classList.add('d-none');
            } else {
                labelTicketActual.innerText = 'Nadie';
                d.querySelector('.alert').classList.remove('d-none');
            }
        });
    });




})(document, console)