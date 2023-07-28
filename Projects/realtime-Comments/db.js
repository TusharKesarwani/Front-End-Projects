function dbConnect() {

    const mongoose = require('mongoose')

    mongoose.connect('mongodb://127.0.0.1:27017', {
        dbName: "comments"
    }).then(() => console.log("Database Connected..."))
    .catch(e => console.log("Connection failed..."))
}


module.exports = dbConnect