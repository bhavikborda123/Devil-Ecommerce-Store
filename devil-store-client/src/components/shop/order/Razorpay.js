import { useEffect, useContext } from "react";
import { createOrderRazorPay, getUser, paymentProcess } from "./FetchApi";
import { useHistory } from "react-router-dom";
import { totalCost } from "../partials/Mixins";
import { LayoutContext } from "../layout";
import { cartListProduct } from "../partials/FetchApi";
import { pay, fetchData } from "./Action";
import logo from "../../../Assets/images/logo.png";

const RenderRazorpay = ({ state, setState }) => {
  // Receive state and setState as props
  const history = useHistory();
  // eslint-disable-next-line
  const { data, dispatch } = useContext(LayoutContext);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const DisplayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await createOrderRazorPay({ amount: totalCost() });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result;
    
    const userData = await getUser();

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: "Devil-Store",  // Product Name
      description: "Order payment",
      image: logo,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const transactionId = response.razorpay_payment_id;
        const paymentResult = await paymentProcess(data);
        if (paymentResult.msg === "success") {
          await fetchData(cartListProduct, dispatch);
          await pay(amount, transactionId, dispatch, state, setState, history);
        }
      },
      prefill: {
        contact: userData.phoneNumber,
        name: userData.name,
        email: userData.email,
      },
      notes: {
        description: "Order payment",
      },
      theme: {
        color: "#0D94FB",
      }
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  useEffect(() => {
    DisplayRazorpay();
    // eslint-disable-next-line
  }, []);

  return null;
};

export default RenderRazorpay;
