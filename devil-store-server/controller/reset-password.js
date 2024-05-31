const localStorage = require("localStorage");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const transporter = require("../mail/nodemailer");
const forgot_pass_template = require("../mail/templates/forget-password");
const { validatePasswordError } = require("../config/function");


async function generateOTP(length) {
    let otp = "";
    for (var i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

class ResetPassword {

    async sendOtp(req, res) {
        try {
            const { email } = req.body;

            // Check if email exists
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.json({ error: "User not found. Please check email again" });
            }

            // Generate OTP
            const otp = await generateOTP(6);

            // Storing some important variables in localStorage
            localStorage.setItem("otp", otp.toString());
            localStorage.setItem("email", email);
            localStorage.setItem("userId", user._id);

            const currentDate = new Date().toDateString();
            let userName = await User.findById(user._id).select("name");

            const html_template = forgot_pass_template(otp, currentDate, userName.name)
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Reset Password OTP",
                html: html_template,
            };

            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: "OTP sent successfully" });
        } catch (err) {
            return res.json({ error: err.message });
        }
    };

    async verifyOTP(req, res) {
        try {
            const { otp: requestOTP } = req.body;
            const storedOTP = localStorage.getItem("otp");

            // Verify OTP
            if (storedOTP !== requestOTP) {
                return res.json({ error: "Invalid OTP" });
            }

            localStorage.removeItem("otp");

            return res.status(200).json({ message: "OTP verification successful" });
        } catch (err) {
            return res.json({ error: err.message });
        }
    };

    async resetPassword(req, res) {
        try {
            const newPassword = req.body.password;
            const userId = localStorage.getItem("userId");
            const passError = validatePasswordError(newPassword);

            if (passError) {
                return res.json({ error: passError });
            }
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Salt rounds: 10

            // Update password using user ID with the hashed password
            const updatedUser = await User.findByIdAndUpdate(userId, {
                password: hashedPassword,
            });

            if (!updatedUser) {
                return res.json({ error: "User not found please Retry for Generate otp" });
            }

            // Remove email and user ID from localStorage
            localStorage.removeItem("email");
            localStorage.removeItem("userId");

            return res.status(200).json({ message: "Password reset successful" });
        } catch (err) {
            return res.json({ error: err.message });
        }
    };
}

const resetPasswordController = new ResetPassword();
module.exports = resetPasswordController;