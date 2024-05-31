import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const getUser = async () => {
  const uId = JSON.parse(localStorage.getItem("jwt"))
    ? JSON.parse(localStorage.getItem("jwt")).user._id
    : "";
  try {
    const res = await axios.post(`${apiURL}/api/user/single-user`, { uId });
    return res.data.User;
  } catch (error) {
    console.error(error);
  }
};

export const createOrderRazorPay = async (totalAmount) => {
  try {
    const response = await axios.get(`${apiURL}/api/razorpay/create-order`, {
      params: { amount: totalAmount.amount },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create order");
  }
};

export const paymentProcess = async (orderDetails) => {
  try {
    const response = await axios.post(`${apiURL}/api/razorpay/paymentProcess`, {
      orderDetails,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Payment processing failed");
  }
};

export const createOrder = async (orderData) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/create-order`, orderData);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateStock = async (productData) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/product/update-stock`,
      productData
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendInvoiceEmail = async (orderData) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/order/send-invoice-email`,
      orderData
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}