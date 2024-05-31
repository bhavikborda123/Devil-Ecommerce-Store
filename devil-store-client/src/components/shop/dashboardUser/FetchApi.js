import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getUserById = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/single-user`, { uId });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/edit-user`, userData);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderByUser = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/order-by-user`, { uId });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/change-password`, formData);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const wishListProducts = async () => {
  let productArray = JSON.parse(localStorage.getItem("wishList"));
  if (productArray) {
    try {
      let res = await axios.post(`${apiURL}/api/product/wish-product`, {
        productArray,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
};
