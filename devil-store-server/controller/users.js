const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const transporter = require("../mail/nodemailer");
const user_welcome_template = require("../mail/templates/user-welcome");
const { validatePasswordError } = require("../config/function");

class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({ userRole: 0 })
        .populate("name email")
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      return res.json({ error: err.message });
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          .select("name email phoneNumber userImage updatedAt createdAt");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        return res.json({ error: err.message });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All filled must be required" });
    } else if (phoneNumber.length != 10) {
      return res.json({ error: "Phone number must be 10 digits" });
    } else {
      try {
        let currentUser = userModel.findByIdAndUpdate(uId, {
          name: name,
          phoneNumber: phoneNumber,
          updatedAt: Date.now(),
        });
        currentUser.exec();
        return res.status(201).json({ success: "User updated successfully" });
      } catch (error) {
        return res.json({ error: err.message });
      }
    }
  }

  async verifyUser(req, res) {
    let { email } = req.query;
    email = decodeURIComponent(email);
    if (!email) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let user = await userModel.findOne({ email });
        if (!user) {
          return res.json({ error: "User not found" });
        }
        if (user.verified == "true") {
          return res.json({ error: "Already verified" });
        }
        user.verified = true;
        await user.save();
        const app_url = process.env.APP_URL;
        const html_template = user_welcome_template(user.name, email, app_url);
        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: "Welcome to our platform",
          html: html_template,
        };
        await transporter.sendMail(mailOptions);
        return res.json({
          success:
            "User verified successfully. You will receive confirmation mail shortly",
        });
      } catch (err) {
        return res.json({ error: err.message });
      }
    }
  }

  async getDeleteUser(req, res) {
    let { _id } = req.body;
    if (!_id) {
      return res.json({ message: "ID must be provided" });
    } else {
      try {
        let currentUser = await userModel.findByIdAndDelete(_id);
        if (!currentUser)
          return res.json({ error: "User not found" });
        return res.json({ success: "User deleted successfully" });
      } catch (err) {
        return res.json({ error: err.message });
      }
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        try {
          const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
          if (!oldPassCheck) {
            return res.json({
              error: "Your old password is wrong!!",
            });
          }
          if (oldPassword == newPassword) {
            return res.json({ error: "New password is same as old password" });
          }
          const passError = validatePasswordError(newPassword);
          if (passError) {
            return res.json({ error: passError });
          }
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec();
          return res.json({ success: "Password updated successfully" });
        } catch (err) {
          return res.json({ error: err.message });
        }
      }
    }
  }
}

const ordersController = new User();
module.exports = ordersController;
