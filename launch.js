// includes
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productController = require('./controllers/product.controller.js');

// setting server port constant
const serverPort = 3000;

// settings for jsonify
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// database connection
mongoose.connect('mongodb://aspirecya:hsgYR48XBJAA5fJ@ds253104.mlab.com:53104/mongotest', { useNewUrlParser: true },(err) => {
    if(err) {
        console.log('[LOG] Database connection failure, see logs for more infos.');
        console.log(err);
    } else {
        console.log('[LOG] Database connection successful.');
    }
});

// routes
app.get('/:name', (req,res) => { res.send(`Bonjour ${req.params.name}, bienvenue sur votre API de gestion de catalogue produit.`); });
app.get('/', (req, res) => { res.send("Je ne parviens pas à vous identifier."); });

app.get('/api/products', productController.getProduct);
app.post('/api/createproduct', productController.createProduct);
app.get('/api/product/:id', productController.getProductByID);
app.get('/api/product/delete/:id', productController.removeProduct);
app.post('/api/product/deletemany', productController.deleteMany);
app.put('/api/product/update/:id', productController.updateProduct);
app.put('/api/product/updatemany', productController.updateMany);
app.get('/api/product/tax/:id', productController.taxCalculation);

// server init
app.listen(serverPort, () => {
    console.log(`[LOG] Server listening on port ${serverPort}.`);
});