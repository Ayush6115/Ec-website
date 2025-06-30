const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: String,

    price: {
        type: Number,
        required: true
    },

    category: String,

    imageUrl: String,

    stock: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Products = mongoose.model('Products', productSchema)
module.exports = Products