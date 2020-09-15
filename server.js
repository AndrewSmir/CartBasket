const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/cart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            let cart = JSON.parse(data); //Массив данных cart.json
            const item = req.body; //Тело запроса

            if (item.clear) {
                cart = [];

            } else if (item.plus) {
                if (cart.find(el => el.product_id === item.good.product_id)) {
                    cart.find(el => el.product_id === item.good.product_id).quantity++
                }

            } else if (item.minus) {
                if (cart.find(el => el.product_id === item.good.product_id)) {
                    cart.find(el => el.product_id === item.good.product_id).quantity--
                }
                if (cart.find(el => el.product_id === item.good.product_id).quantity < 1) {
                    cart.splice(cart.findIndex(el => el.product_id === item.good.product_id), 1)
                }

            } else {
                if (cart.find(el => el.product_id === item.product_id)) {
                    cart.find(el => el.product_id === item.product_id).quantity++
                } else {
                    cart.push(item);
                    cart.find(el => el.product_id === item.product_id).quantity++;
                }
            }

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});


app.listen(3000, function () {
    console.log('server is running on port 3000!');
});