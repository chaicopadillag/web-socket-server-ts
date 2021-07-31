((d, c) => {
    const socket = io();

    socket.on('connect', () => {
        console.log('connectado');
        // d.querySelector('.alert-success').style.display = 'block';
        // d.querySelector('.alert-danger').style.display = 'none';
    })

    socket.on('disconnect', () => {
        console.log('desconectado');
        // d.querySelector('.alert-success').style.display = 'none';
        // d.querySelector('.alert-danger').style.display = 'block';
    })

    // d.querySelector('#formMessage').addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     socket.emit('message', e.target.message.value, (payloadResult) => {
    //         console.log(payloadResult)
    //     });

    // })

    socket.on('messages', (payload) => {
        console.log(payload);
    })
})(document, console)