import React, { Fragment, useState, useContext } from "react";
import Layout from "./Layout";
import { handleChangePassword } from "./Action";
import { DashboardUserContext } from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SettingComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    success: false,
    error: false,
    oldPasswordView: false,
    newPasswordView: false,
    confirmPasswordView: false,
    type: "password",
  });

  const togglePasswordVisibility = (field) => {
    setFormData({ ...formData, [`${field}View`]: !formData[`${field}View`] });
  };

  if (formData.success || formData.error) {
    setTimeout(() => {
      setFormData({ ...formData, success: false, error: false });
    }, 1500);
  }

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center ">
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
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="shadow-lg border">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
            Change Password
          </div>
          <hr />
          <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
            {formData.success ? (
              <div className="bg-green-200 px-4 py-2 rounded">
                {formData.success}
              </div>
            ) : (
              ""
            )}
            {formData.error ? (
              <div className="bg-red-200 px-4 py-2 rounded">{formData.error}</div>
            ) : (
              ""
            )}
            <div className="flex flex-col space-y-2">
              <label htmlFor="oldPassword">Old Password</label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
                  }
                  value={formData.oldPassword}
                  type={formData.oldPasswordView ? "text" : "password"}
                  id="oldPassword"
                  className="z-10 border px-4 py-2 w-full focus:outline-none"
                />
                <FontAwesomeIcon
                  icon={formData.oldPasswordView ? faEye : faEyeSlash}
                  onClick={() => togglePasswordVisibility("oldPassword")}
                  className="absolute right-0 mr-2 cursor-pointer"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="newPassword">New Password</label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  value={formData.newPassword}
                  type={formData.newPasswordView ? "text" : "password"}
                  id="newPassword"
                  className="border px-4 py-2 w-full focus:outline-none"
                />
                <FontAwesomeIcon
                  icon={formData.newPasswordView ? faEye : faEyeSlash}
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-0 mr-2 cursor-pointer"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  value={formData.confirmPassword}
                  type={formData.confirmPasswordView ? "text" : "password"}
                  id="confirmPassword"
                  className="border px-4 py-2 w-full focus:outline-none"
                />
                <FontAwesomeIcon
                  icon={formData.confirmPasswordView ? faEye : faEyeSlash}
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-0 mr-2 cursor-pointer"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
            </div>
            <div
              onClick={(e) => handleChangePassword(formData, setFormData, dispatch)}
              style={{ background: "#303031" }}
              className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
            >
              Change password
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const SettingUser = (props) => {
  return (
    <Fragment>
      <Layout children={<SettingComponent />} />
    </Fragment>
  );
};

export default SettingUser;
