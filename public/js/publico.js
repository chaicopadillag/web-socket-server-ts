((d, c) => {

    const socket = io();


    socket.on('connect', () => {
        console.log('connectado');

    })

    socket.on('disconnect', () => {
        console.log('desconectado');
    })


    const $lblTicket1 = d.getElementById('lblTicket1'),
        $lblEscritorio1 = d.getElementById('lblEscritorio1'),
        $lblTicket2 = d.getElementById('lblTicket2'),
        $lblEscritorio2 = d.getElementById('lblEscritorio2'),
        $lblTicket3 = d.getElementById('lblTicket3'),
        $lblEscritorio3 = d.getElementById('lblEscritorio3'),
        $lblTicket4 = d.getElementById('lblTicket4'),
        $lblEscritorio4 = d.getElementById('lblEscritorio4');

    socket.on('cola-actual', payload => {
        const audio = new Audio('./audio/new-ticket.mp3');
        audio.play();

        const [ticket1, ticket2, ticket3, ticket4] = payload;
        if (ticket1) {
            $lblTicket1.innerText = 'Ticket # ' + ticket1.numero;
            $lblEscritorio1.innerText = 'Escritorio # ' + ticket1.escritorio;
        }

        if (ticket2) {
            $lblTicket2.innerText = 'Ticket # ' + ticket2.numero;
            $lblEscritorio2.innerText = 'Escritorio # ' + ticket2.escritorio;
        }

        if (ticket3) {
            $lblTicket3.innerText = 'Ticket # ' + ticket3.numero;
            $lblEscritorio3.innerText = 'Escritorio # ' + ticket3.escritorio;
        }

        if (ticket4) {
            $lblTicket4.innerText = 'Ticket # ' + ticket4.numero;
            $lblEscritorio4.innerText = 'Escritorio # ' + ticket4.escritorio;
        }

    });

})(document, console)