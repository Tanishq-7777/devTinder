const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://tanipani:tanipani@tani.jnwmz8m.mongodb.net/devTinder"
    );
}
module.exports = {
    connectDB,
}
