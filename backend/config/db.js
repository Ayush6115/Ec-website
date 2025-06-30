const mongoose = require ('mongoose')
const dotenv = require ('dotenv')
dotenv.config()

const mongo_URI = process.env.MONGO_URL

mongoose.connect(mongo_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;

db.on('connected', ()=> {
    console.log("Connected to Server")
})

db.on('error', (err)=>{
    console.error("Connetion error", err)
} )

db.on('disconnected', ()=> {
    console.log("Disconnected from Server")
})

module.exports = db

