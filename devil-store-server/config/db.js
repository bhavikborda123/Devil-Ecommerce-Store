const mongoose = require('mongoose');

const db_url = process.env.DATABASE;

const ConnectToDB = () => mongoose
    .connect(db_url)
    .then(() => console.log("🔗🔗 Database connected 🔗🔗"))
    .catch((err) => console.log("❗❗ Database Not Connected ❗❗", err));

module.exports = { ConnectToDB };