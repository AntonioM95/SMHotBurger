const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");

log = (arg) => {
    fs.appendFile("logs/logfile.txt", `Route ${arg} was received and response was sent\n`, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
}
app.get('/version', (req, res) => {
 log('/version');
 res.send('This is version 0 of the HotBurger service')
}
);

app.get('/logs', (req, res) => {
    log('/logs');
    fs.readFile("logs/logfile.txt", (err, data) => {
    if (err) { console.log(err) }
    let senddata = data.toString();
    res.send(senddata);
    });

    
    
});


app.listen(port, () => console.log(`A new connection has been made`));
