const { toTitleCase, validateEmail, validatePasswordError } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const transporter = require("../mail/nodemailer");
const verify_user_template = require("../mail/templates/verify-user");


const JWT_SECRET = process.env.JWT_SECRET;

class Auth {

    // Sign up | registration
    async postSignup(req, res) {
        let { name, email, phoneNumber, password, cPassword } = req.body;
        let error = {};
        if (!name || !email || !phoneNumber || !password || !cPassword) {
            error = {
                ...error,
                name: "Filed must not be empty",
                email: "Filed must not be empty",
                phoneNumber: "Filed must not be empty",
                password: "Filed must not be empty",
                cPassword: "Filed must not be empty",
            };
            return res.json({ error });
        }
        if (name.length < 3 || name.length > 25) {
            error = { ...error, name: "Name must be 3-25 character" };
            return res.json({ error });
        } else {
            if (!validateEmail(email)) {
                error = {
                    ...error,
                    password: "",
                    name: "",
                    email: "Email is not valid",
                };
                return res.json({ error });
            }
            name = toTitleCase(name);
            if (phoneNumber.length != 10) {
                error = {
                    ...error,
                    phoneNumber: "Number must be 10 digits",
                    name: "",
                    email: "",
                    password: ""
                };
                return res.json({ error });
            }
            const data = await userModel.findOne({ email: email });
            if (data) {
                error = {
                    ...error,
                    password: "",
                    name: "",
                    email: "Email already exists",
                    phoneNumber: ""
                };
                return res.json({ error });
            }
            else {
                try {
                    const passError = validatePasswordError(password);
                    if (passError) {
                        error = {
                            password: passError,
                            name: "",
                            email: "",
                            phoneNumber: ""
                        }
                        return res.json({ error });
                    } else {
                        password = bcrypt.hashSync(password, 10);
                        let newUser = new userModel({
                            name,
                            email,
                            phoneNumber,
                            password,
                            // for admin userRole: 1 || for customer userRole: 0
                            userRole: 0,
                        });
                        await newUser
                            .save()
                            .then(async (data) => {
                                // send verification email after user is saved in the database
                                const app_url = process.env.APP_URL;
                                const api_url = process.env.API_URL;
                                const verificationUrl = `${api_url}/api/user/verify-user?email=${encodeURIComponent(email)}`;
                                const html_template = verify_user_template(name, verificationUrl, app_url);

                                const mailOptions = {
                                    from: process.env.EMAIL_FROM,
                                    to: email,
                                    subject: "Please verify your account",
                                    html: html_template
                                };
                                await transporter.sendMail(mailOptions);
                                return res.status(200).json({
                                    success: "A verification email has been sent to your mail. Please verify your account",
                                });
                            })
                            .catch((err) => {
                                return res.json({ error: err.message });
                            });
                    }
                } catch (err) {
                    return res.json({ error: err.message });
                }
            }
        }
    }

    // Sign in | login
    async postSignin(req, res) {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                error: "Fields must not be empty",
            });
        }
        try {
            const data = await userModel.findOne({ email: email });
            if (!data) {
                return res.json({
                    error: "Invalid email or password",
                });
            } else {
                const login = await bcrypt.compare(password, data.password);
                if (login) {
                    const token = jwt.sign(
                        { _id: data._id, role: data.userRole },
                        JWT_SECRET, { expiresIn: "7d" }
                    );
                    const encode = jwt.verify(token, JWT_SECRET);
                    return res.json({
                        token: token,
                        user: encode,
                    });
                } else {
                    return res.json({
                        error: "Invalid email or password",
                    });
                }
            }
        } catch (err) {
            return res.json({ error: err.message });
        }
    }
}


const authController = new Auth();
module.exports = authController;