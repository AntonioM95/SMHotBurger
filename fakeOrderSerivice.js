const request = require('request');

const menu = {
    Hotdog: '$20',
    Hamburger: '$35',
    Soda: '$4',
    Cookie: '$6'
}

const purchase = (item, amount) =>{
    console.log("Purchasing");
    request.post(`ip-172-31-27-234.ec2.internal/purchase/${item}/${amount}`, {} , (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(`statuscode: ${res.statusCode}`);
        console.log(body);
      });
       
}


getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}


const call =() => setInterval( () =>{
    const item = Object.keys(menu)[getRandomInt(4)];
    const amount = getRandomInt(5);
    purchase(item, amount);
}, 5000);

call();
