import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
    showPassword: false,
    showCPassword: false
  });

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          ></path>
        </svg>
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setData({ ...data, showPassword: !data.showPassword });
  };

  const toggleCPasswordVisibility = () => {
    setData({ ...data, showCPassword: !data.showCPassword });
  };
  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Register</div>
      <form className="space-y-4">
        {data.success ? alert(data.success, "green") : ""}
        <div className="flex flex-col">
          <label htmlFor="name">
            Name<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                name: e.target.value,
              })
            }
            value={data.name}
            type="text"
            id="name"
            className={`${data.error.name ? "border-red-500" : ""
              } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error.name, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">
            Email address<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                email: e.target.value,
              })
            }
            value={data.email}
            type="text"
            id="email"
            className={`${data.error.email ? "border-red-500" : ""
              } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error.email, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber">
            Phone Number<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                phoneNumber: e.target.value,
              })
            }
            value={data.phoneNumber}
            type="text"
            id="phoneNumber"
            maxLength={10}
            className={`${data.error.phoneNumber ? "border-red-500" : ""
              } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error.phoneNumber, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                password: e.target.value,
              })
            }
            value={data.password}
            type={data.showPassword ? "text" : "password"} // Toggle password visibility
            id="password"
            className={`${!data.error ? "" : "border-red-500"
              } px-4 py-2 focus:outline-none border`}
          />
          {/* Eye icon for toggling password visibility */}
          <FontAwesomeIcon
            icon={data.showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            className=" absolute right-0  m-16 mt-10 box-border cursor-pointer"
          />
          {!data.error ? "" : alert(data.error.password, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm password
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                cPassword: e.target.value,
              })
            }
            value={data.cPassword}
            type={data.showCPassword ? "text" : "password"} // Toggle password visibility
            id="cpassword"
            className={`${!data.error ? "" : "border-red-500"
              } px-4 py-2 focus:outline-none border`}
          />
          {/* Eye icon for toggling password visibility */}
          <FontAwesomeIcon
            icon={data.showCPassword ? faEye : faEyeSlash}
            onClick={toggleCPasswordVisibility}
            className=" absolute right-0  m-16 mt-10 box-border cursor-pointer"
          />
          {!data.error ? "" : alert(data.error.cPassword, "red")}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
        </div>
        <div
          onClick={(e) => formSubmit()}
          style={{ background: "#303031" }}
          className="px-4 py-2 text-white text-center cursor-pointer font-medium"
        >
          Create an account
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
