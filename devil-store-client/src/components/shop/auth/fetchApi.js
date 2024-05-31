import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const signupReq = async ({ name, email, phoneNumber, password, cPassword }) => {
  const data = { name, email, phoneNumber, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOtp = async (email) => {
  try {
    let res = await axios.post(`${apiURL}/api/reset-password/sent-otp`, {
      email: email
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const otpVerification = async (otp) => {
  try {
    let res = await axios.post(`${apiURL}/api/reset-password/verify-otp`, {
      otp: otp
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const resetPassword = async (password) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/reset-password/reset-password`,
      {
        password: password,
      });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}