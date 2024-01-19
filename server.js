const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('pong')
})

app.listen(3000, ()=> {
    console.log('nodi api is running in the 3000 port')
});
