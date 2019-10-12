const express = require('express')
const app = express()
const port = 3000

log = (arg) => {
    console.log(`Loggin results for ${arg}`)
}
app.get('/version', (req, res) => {
 log('/version');
 res.send('This is version 0 of the HotBurger service')
}
);

app.get('/logs', (req, res) => {
    log('/logs');
    
});


app.listen(port, () => console.log(`A new connection has been made`));
