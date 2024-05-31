import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { totalCost, subTotal, quantity } from "../partials/Mixins";
import { LayoutContext } from "../layout";
import RenderRazorpay from "./Razorpay";


const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {

  // eslint-disable-next-line
  const { data, dispatch } = useContext(LayoutContext);
  const [state, setState] = useState({
    address: "",
    phone: "",
    transactionAmount: 0,
    error: false,
    success: false,
  });

  const [displayRazorpay, setDisplayRazorpay] = useState(false);

  const handleClick = async () => {

    if (!state.address || !state.phone) {
      if (!state.address && !state.phone) {
        setState({ ...state, error: "Address and phone fields are required." });
        return;
      } else if (!state.address) {
        setState({ ...state, error: "Address is required." });
        return;
      } else if (!state.phone) {
        setState({ ...state, error: "Phone number is required." });
        return;
      }
    }
    try {
      setDisplayRazorpay(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Order Details</div>
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
            <div
              onBlur={(e) => setState({ ...state, error: false })}
              className="p-4 md:p-8"
            >
              {state.error && (
                <div className="bg-red-200 py-2 px-4 rounded">
                  {state.error}
                </div>
              )}
              {state.success && (
                <div className="bg-green-200 py-2 px-4 rounded">
                  {state.success}
                </div>
              )}
              <div className="flex flex-col py-2">
                <label htmlFor="address" className="pb-2">
                  Delivery Address*
                </label>
                <input
                  value={state.address}
                  onChange={(e) =>
                    setState({
                      ...state,
                      address: e.target.value,
                      error: false,
                    })
                  }
                  type="text"
                  id="address"
                  className="border px-4 py-2"
                  placeholder="Address..."
                />
              </div>
              <div className="flex flex-col py-2 mb-2">
                <label htmlFor="phone" className="pb-2">
                  Phone*
                </label>
                <input
                  value={state.phone}
                  onChange={(e) =>
                    setState({ ...state, phone: e.target.value, error: false })
                  }
                  type="text"
                  id="phone"
                  className="border px-4 py-2"
                  placeholder="phone number..."
                  maxLength={10}
                />
              </div>
              <div
                onClick={handleClick}
                className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                style={{ background: "#303031" }}
              >
                Pay now ₹{totalCost()}.00
              </div>
              {displayRazorpay && (
                <RenderRazorpay state={state} setState={setState} />
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
            >
              <div className="md:flex md:items-center md:space-x-4">
                <img
                  onClick={() => history.push(`/products/${product._id}`)}
                  className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                  src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                  alt="wishListProduct"
                />
                <div className="text-lg md:ml-6 truncate">{product.pName}</div>
                <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                  Price : ₹{product.pPrice}.00
                </div>
                <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                  quantity : {quantity(product._id)}
                </div>
                <div className="font-semibold text-gray-600 text-sm">
                  Subtotal : ₹{subTotal(product._id, product.pPrice)}.00
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutComponent;
