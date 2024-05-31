const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class RazorpayController {
    async generateOrder(req, res) {
        const { amount } = req.query;
        if (!amount) {
            res.json({ error: "Amount should not be empty" });
        }
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "order_receipt",
            payment_capture: 1,
        };

        try {
            const order = await razorpay.orders.create(options);
            res.json(order);
        } catch (err) {
            res.json({ error: err.message });
        }
    }

    async paymentProcess(req, res) {
        try {
            const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body["orderDetails"];

            const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

            hmac.update(`${orderCreationId}|${razorpayPaymentId}`);

            const calculatedSignature = hmac.digest("hex");

            if (calculatedSignature !== razorpaySignature)
                return res.json({
                    msg: "Transaction not legit!",
                    calculatedSignature: calculatedSignature,
                    razorpaySignature: razorpaySignature,
                });

            res.json({
                msg: "success",
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
            });
        } catch (err) {
            res.json({ error: err.message });
        }
    }
}


const razorpayController = new RazorpayController();
module.exports = razorpayController;