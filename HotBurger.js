const express = require('express');
const app = express();
const port = 3000;
const log = require('simple-node-logger').createSimpleFileLogger('./Monitoring/monitoring.log');
const fs = require('fs');
const request = require('request');

const menu = {
    Hotdog: '$20',
    Hamburger: '$35',
    Soda: '$4',
    Cookie: '$6'
}

update = (err, res, body) => {
   
    if (err) { return console.log(err); }
    const itemBody = body.split(" ");
    item = itemBody[0].replace(':', '');

    if(item[1] !== 0) {
        const amount = itemBody[1] -1;
        request.post(`http://localhost:3002/setcount/${item}/${amount}`, {} , (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(`statuscode: ${res.statusCode}`);
        console.log(body);
      });
    }else {
        request.post(`http://localhost:3002/setcount/${item[0]}/${0}`, {} , (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(`statuscode: ${res.statusCode}`);
        console.log(body);
      });
    }
}

validatePurchase = (purchase) =>{
    request(`http://localhost:3002/getcount/${purchase.item}`, update);
}

getPrice = (item) => {
    const price = Object.keys(menu).filter((key, index) => {
        //console.log(menu[key]);
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
    console.log(`Loggin results for purchase`);
    itemPrice = getPrice(purchase.item);
    log.info(`Purchase of item: ${purchase.item} count: ${purchase.quantity} price: ${itemPrice} at ${new Date().toJSON()}`)
}

app.get('/version', (req, res) => {
 logging('/version');
 res.send('This is version 0 of the HotBurger service')
}
);

app.get('/getmenu', (req, res) => {
    logging('/getmenu');
    res.send(menu);
}
);

app.post('/purchase/:item/:quantity', (req, res) =>{
    
    validatePurchase(req.params);
    logPurchase(req.params);
    res.sendStatus(200);
});


app.listen(port, () => console.log(`A new connection has been made`));
