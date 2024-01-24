const express = require('express');

const app = express();

app.get('/ping', (req, res) => {
    res.json({'message': 'pong'})
})

app.listen(3000, ()=> {
    console.log('nodi api is running in the 3000 port')
});
