const express = require('express');
const app = express();
const port = 3000;
const log = require('simple-node-logger').createSimpleFileLogger('./Monitoring/monitoringlogs.log');
const fs = require('fs');

const menu = {
    Hotdog: '$20',
    Hamburger: '$35',
    Soda: '$4',
    Cookie: '$6'
}

getPrice = (item) => {
    const price = Object.keys(menu).filter((key, index) => {
        console.log(menu[key]);
        if(key.toString().toLowerCase() === item.toString().toLowerCase()){
            return key
        };
    });
    return menu[price];
}

logging = (arg) => {
    console.log(`Loggin results for ${arg}`);
    log.info(`Loggin results for ${arg} at ${new Date().toJSON()}` );
}

logPurchase = (purchase) => {
    itemPrice = getPrice(purchase.item);
    log.info(`Purchase of item: ${purchase.item} count: ${purchase.quantity} price: ${itemPrice} at ${new Date().toJSON()}`)
}

app.get('/version', (req, res) => {
 logging('/version');
 res.send('This is version 0 of the HotBurger service')
}
);

app.get('/logs', (req, res) => {
    logging('/logs');
    fs.readFile('./Monitoring/monitoringlogs.log', 'utf8', (err,data) => {
        if(err){
            console.log(err);
            throw err;
        }
        res.send(data.toString())
    })
});

app.get('/getmenu', (req, res) => {
    logging('/getmenu');
    res.send(menu);
}
);

app.post('/purchase/:item/:quantity', (req, res) =>{
    logPurchase(req.params);
    res.sendStatus(200);
});


app.listen(port, () => console.log(`A new connection has been made`));
