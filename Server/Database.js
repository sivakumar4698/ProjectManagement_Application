const mongoose = require('mongoose')

const connectDatabase = async() => {
     
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database connected: ${connect.connection.host}`)
}

module.exports = connectDatabase;