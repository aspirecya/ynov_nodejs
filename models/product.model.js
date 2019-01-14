const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ProductSchema =  new Schema ({
    ref : Number,
    name : String,
    desc : String,
    prixHT : Number,
    tauxTVA : Number
});

// export schema to mongodb database
module.exports = mongoose.model('Product', ProductSchema);