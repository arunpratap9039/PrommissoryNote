const mongoose = require('mongoose');

const uri = "mongodb+srv://arunpratap9039:zMrEYt03lb8FlEI5@cluster0.yntskaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
