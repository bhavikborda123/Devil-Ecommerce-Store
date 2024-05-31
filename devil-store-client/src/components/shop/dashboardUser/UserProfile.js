import React, { Fragment, useContext, useState, useEffect } from "react";
import Layout from "./Layout";
import { DashboardUserContext } from "./Layout";
import { updatePersonalInformationAction } from "./Action";

const ProfileComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const userDetails = data.userDetails !== null ? data.userDetails : "";

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    success: false,
    error: false
  });

  if (formData.success || formData.error) {
    setTimeout(() => {
      setFormData({ ...formData, success: false, error: false });
    }, 3000);
  }

  useEffect(() => {
    setFormData({
      ...formData,
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phoneNumber,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleSubmit = () => {
    updatePersonalInformationAction(formData, setFormData, dispatch);
  };

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
            Personal Information
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
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                value={formData.name}
                type="text"
                id="name"
                className="border px-4 py-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <input
                value={formData.email}
                readOnly
                type="email"
                id="email"
                className="cursor-not-allowed border px-4 py-2 bg-gray-200 w-full focus:outline-none focus:cursor-not-allowed"
              />
              <span className="text-xs text-gray-500">
                You can't change your email
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="number">Phone Number</label>
              <input
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                value={formData.phone}
                type="text"
                id="number"
                className="border px-4 py-2 w-full focus:outline-none"
                maxLength={10}
              />
            </div>
            <div
              onClick={(e) => handleSubmit()}
              style={{ background: "#303031" }}
              className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
            >
              Update Information
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<ProfileComponent />} />
    </Fragment>
  );
};

export default UserProfile;
