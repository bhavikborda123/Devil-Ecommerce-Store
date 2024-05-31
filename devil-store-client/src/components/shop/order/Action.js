import { createOrder, sendInvoiceEmail, updateStock } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 10000);
    }
  } catch (error) {
    console.error(error);
  }
};

export const pay = async (amount, transactionId, dispatch, state, setState, history) => {
  try {
    dispatch({ type: "loading", payload: true });

    let orderData = {
      allProduct: JSON.parse(localStorage.getItem("cart")),
      user: JSON.parse(localStorage.getItem("jwt")).user._id,
      amount: amount / 100,
      transactionId: transactionId,
      address: state.address,
      phone: state.phone,
    };
    try {
      let responseData = await createOrder(orderData);
      if (responseData.success) {
        let productData = orderData["allProduct"];
        let reData = await updateStock(productData);
        if (reData.success) {
          localStorage.setItem("cart", JSON.stringify([]));
          dispatch({ type: "cartProduct", payload: null });
          dispatch({ type: "cartTotalCost", payload: null });
          dispatch({ type: "orderSuccess", payload: true });
          // setState({ clientToken: "", instance: {} });
          dispatch({ type: "loading", payload: false });
          let sendMail = await sendInvoiceEmail(orderData);
          if (!sendMail.success) {
            await sendInvoiceEmail(orderData);
          }
          return history.push("/");
        } else if (reData.error) {
          console.error(reData.error);
        }
      } else if (responseData.error) {
        console.error(responseData.error);
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    setState({ ...state, error: error.message });
  }
};
