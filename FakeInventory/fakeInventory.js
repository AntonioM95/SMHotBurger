const express = require('express');
const app = express();
const port = 3002;

const menu = {
    Hotdog: 5,
    Hamburger: 5,
    Soda: 5,
    Cookie: 5
}

app.get('/getcount/:item', (req, res) => {
    const item = req.params.item;
    const available = menu[item];
    const validItem = Object.keys(menu).filter((name) => name.toString().toLowerCase() === item.toString().toLowerCase());
    const response = validItem.length ? `${validItem[0]}: ${menu[validItem[0]]}` : 'invalid';
    res.send(response);
}
);

app.post('/setcount/:item/:quantity', (req, res) => {
    const item = req.params.item;
    const available = menu[item];
    const validItem = Object.keys(menu).filter((name) => name.toString().toLowerCase() === item.toString().toLowerCase());
    if(validItem.length) {
        menu[validItem[0]] = req.params.quantity;
    }
  
    res.send(menu);
}
);

app.listen(port, () => console.log(`A new connection has been made`));
