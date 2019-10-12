const express = require('express');
const app = express();
const port = 3000;
const log = require('simple-node-logger').createSimpleFileLogger('project.log');
const fs = require('fs');

logging = (arg) => {
    console.log(`Loggin results for ${arg}`)
    log.info(`Loggin results for ${arg}`);
}
app.get('/version', (req, res) => {
 logging('/version');
 res.send('This is version 0 of the HotBurger service')
}
);

app.get('/logs', (req, res) => {
    logging('/logs');
    fs.readFile('project.log', 'utf8', (err,data) => {
        if(err){
            throw err;
        }
        res.send(data.toString())
    })
});


app.listen(port, () => console.log(`A new connection has been made`));
