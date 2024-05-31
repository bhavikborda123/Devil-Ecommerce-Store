const orderModel = require("../models/orders");
const userModel = require("../models/users");
const productModel = require("../models/products");
const transporter = require("../mail/nodemailer");
const invoice_template = require("../mail/templates/invoice-template");
const puppeteer = require('puppeteer');

class Order {
    async getAllOrders(req, res) {
        try {
            let Orders = await orderModel
                .find({})
                .populate("allProduct.id", "pName pImages pPrice")
                .populate("user", "name email")
                .sort({ _id: -1 });
            if (Orders) {
                return res.json({ Orders });
            }
        } catch (err) {
            return res.json({ error: err.message });
        }
    }

    async getOrderByUser(req, res) {
        let { uId } = req.body;
        if (!uId) {
            return res.json({ message: "All filled must be required" });
        } else {
            try {
                let Order = await orderModel
                    .find({ user: uId })
                    .populate("allProduct.id", "pName pImages pPrice")
                    .populate("user", "name email")
                    .sort({ _id: -1 });
                if (Order) {
                    return res.json({ Order });
                }
            } catch (err) {
                return res.json({ error: err.message });
            }
        }
    }

    async postCreateOrder(req, res) {
        let { allProduct, user, amount, transactionId, address, phone } = req.body;
        if (!allProduct || !user || !amount || !transactionId || !address || !phone) {
            return res.json({ message: "All filled must be required" });
        } else {
            try {
                let newOrder = new orderModel({ allProduct, user, amount, transactionId, address, phone });
                let save = await newOrder.save();

                if (save) {
                    return res.json({ success: "Order created successfully" });
                }
            } catch (err) {
                return res.json({ error: err.message });
            }
        }
    }

    async postUpdateOrder(req, res) {
        let { oId, status } = req.body;
        if (!oId || !status) {
            return res.json({ message: "All filled must be required" });
        } else {
            try {
                let currentOrder = orderModel.findByIdAndUpdate(oId, {
                    status: status,
                    updatedAt: Date.now(),
                });
                currentOrder.exec();
                return res.json({ success: "Order updated successfully" });
            } catch (err) {
                return res.json({ error: err.message });
            }
        }
    }

    async postDeleteOrder(req, res) {
        let { oId } = req.body;
        if (!oId) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {
                let deleteOrder = await orderModel.findByIdAndDelete(oId);
                if (deleteOrder) {
                    return res.json({ success: "Order deleted successfully" });
                }
            } catch (err) {
                return res.json({ error: err.message });
            }
        }
    }

    async sendInvoiceEmail(req, res) {
        let orderData = req.body;
        try {
            const address = orderData.address;
            const phone = orderData.phone;
            const uId = orderData.user
            let userData = await userModel.findById(uId).select("name email");

            const allProduct = orderData.allProduct;
            const productData = await Promise.all(allProduct.map(async (data) => {
                const { id, quantity, price } = data;
                let product = await productModel.findById(id).select("pName");
                let subtotal = quantity * price;
                return { ...product.toObject(), quantity, price, subtotal }
            }));

            const allDetails = {
                userData: { ...userData.toObject(), address, phone },
                productData: productData,
                paymentData: {
                    totalAmount: orderData.amount,
                    paymentID: orderData.transactionId
                }
            }

            const html_template = invoice_template(allDetails);

            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(html_template);
            const invoicePDF = await page.pdf({ format: 'A4' });

            await browser.close();

            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: userData.email,
                subject: "Invoice",
                html: html_template,
                attachments: [
                    {
                        filename: 'Invoice.pdf',
                        content: invoicePDF
                    }]
            };
            await transporter.sendMail(mailOptions);
            return res.json({ success: "Invoice sent" });
        } catch (err) {
            return res.json({ error: err.message });
        }
    }
}


const ordersController = new Order();
module.exports = ordersController;