const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MedicineSchema = new Schema({
    title: String,
    price: Number,
    image: String,
    description: String,

})
module.exports = mongoose.model('Medicine', MedicineSchema);