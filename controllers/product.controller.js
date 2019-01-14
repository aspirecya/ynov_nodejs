const Product = require('../models/product.model.js');
const fs = require('fs');
var dateFormat = require('dateformat');
var now = new Date();

exports.createProduct = function(req, res) {
    var product = new Product ({
            ref: req.body.ref,
            name: req.body.name,
            desc: req.body.desc,
            prixHT: req.body.prixHT,
            tauxTVA: req.body.tauxTVA
        }
    );

    console.log(product);

    product.save((err)=> {
        if(err) {
            console.log('[LOG] Product creation failure, see logs for more infos.');
            console.log(err);
        }  else {
            console.log('[LOG] Product created.');
            console.log(product);
        }

        res.send(product);
    })
};

exports.getProduct = (req, res) => {
    Product.find((err, product) => {
        if(err) {
            console.log('[LOG] Product fetching failure, see logs for more infos.');
            console.log(err);
        } else {
            console.log('[LOG] All products fetched.');
        }

        res.send(product);
    })
};

exports.getProductByID = (req, res) => {
    Product.findById({ _id : req.params.id }, (err, product) => {
        if(err) {
            console.log('[LOG] Product fetching failure, see logs for more infos.');
            console.log(err);
        } else {
            console.log('[LOG] Product fetched.');
        }

        res.send(product);
    })
};

exports.removeProduct = (req, res) => {
    Product.findOneAndDelete({ _id : req.params.id }, (err, product) => {
        if(err) {
            console.log('[LOG] Product deletion failure, see logs for more infos.');
            console.log(err);
        } else {
            console.log('[LOG] Product deleted.');
            res.redirect("/api/products");
        }
    })
};

exports.deleteMany = (req, res) => {
    Product.deleteMany(req.body, (err, product) => {
        if (err) {
            console.log('[LOG] Products deletion failure, see logs for more infos.');
            console.log(err);
        } else {
            console.log('[LOG] Products deleted.');
            res.send('Products updated.');
        }
    })
};

exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate({ _id : req.params.id }, req.body, (err, product) => {
        if (err) {
            console.log('[LOG] Product update failure, see logs for more infos.');
            console.log(err);
        } else {
            console.log('[LOG] Product updated.');
        }

        res.send(product);
    })
};

exports.updateMany = (req, res) => {
    console.log(req.query);
    Product.updateMany(req.query, req.body, (err, product) => {
        if(err) {
            console.log('[LOG] Products update failure, see logs for more infos.');
            console.log(err);
        } else {
            console.log('[LOG] Products updated.');
            res.send('Products updated.');
        }
    })
};

exports.taxCalculation = (req, res) => {
    Product.findById({ _id : req.params.id }, (err, product) => {
        fs.appendFile("./logs/taxcalculator.txt", `${dateFormat(now, "dS mmmm yyyy - h:MM:ss TT")} - (PRODUCT ID ${product._id}) ${product.prixHT + (product.prixHT * product.tauxTVA / 100)} \r\n`, (error) => {
            if(error) {
                console.log('[LOG] Tax calculation failure, see logs for more infos.');
                console.log(error);
            } else {
                console.log("[LOG] Tax calculation computed, check /logs/taxcalculator.txt.");
                res.redirect('/api/products');
            }
        });
    })
};