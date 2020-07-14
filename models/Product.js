var mongoose = require('mongoose');

//var UserSchema = new mongoose.Schema({
//  name: String,
//  address: String,
//  position: String,
//  salary: Number,
//  updated_at: { type: Date, default: Date.now },
//});

var ProductSchema = new mongoose.Schema({
  name: String,
  productid: String,
  price: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);

