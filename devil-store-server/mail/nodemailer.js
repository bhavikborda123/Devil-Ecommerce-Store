const nodemailer = require("nodemailer");
require("dotenv").config();


const EMAIL_FROM = process.env.EMAIL_FROM
const admin_password = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_FROM,
        pass: admin_password,
    },
});


module.exports = transporter;