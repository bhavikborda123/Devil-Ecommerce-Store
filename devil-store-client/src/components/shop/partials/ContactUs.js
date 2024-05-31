import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../layout/index";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    loading: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    if (formData.number === "" || formData.email === "" || formData.message === "") {
      setFormData({ ...formData, loading: false, error: "Please fill all the details" });
    } else {
      console.log(formData);
      setFormData({
        name: "",
        email: "",
        number: "",
        message: "",
        loading: false,
        success: "Message sent successfully",
        error: false
      });
    }
  }

  if (formData.success || formData.error) {
    setTimeout(() => {
      setFormData({ ...formData, success: false, error: false });
    }, 3000);
  }

  if (formData.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center ">
        <svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99">
          </path>
        </svg>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mt-32">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <div className="mt-2 h-1 w-24 bg-green-500 inline-block" />
        </div>
        <div className="row g-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="shadow-md rounded-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Sales Department</h2>
              <p className="text-lg font-medium">Vaibhav Borda</p>
              <p className="text-lg">Mobile: +91-81282 53214</p>
              <p className="text-lg">Email: salesdevil@gmail.com</p>
            </div>
            <div className="shadow-md rounded-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Purchase Department</h2>
              <p className="text-lg font-medium">Om Gadhiya</p>
              <p className="text-lg">Mobile: +91 90818 04600</p>
              <p className="text-lg">Email: edevil@gmail.com</p>
            </div>
            <div className="shadow-md rounded-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Management Department</h2>
              <p className="text-lg font-medium">Bhavik Borda</p>
              <p className="text-lg">Mobile: +91 97251 35677</p>
              <p className="text-lg">Email: devilgroup@gmail.com</p>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.8886165841195!2d72.87223057447252!3d21.236264980465464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f93d2e9ee6b%3A0x2874f99705a3aa5a!2sPlatinum%20Point!5e0!3m2!1sen!2sin!4v1710408169101!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              frameBorder="0"
              style={{ minHeight: "250px" }}
            ></iframe>
          </div>
          <div className="col-12 col-md-6 mt-4">
            <div className="bg-white p-5 shadow-md rounded-md contact-form">
              {formData.success && (
                <div className="bg-green-200 text-green-700 rounded-md p-2 mb-4">
                  {formData.success}
                </div>
              )}
              {formData.error && (
                <div className="bg-red-200 text-red-700 rounded-md p-2 mb-4">
                  {formData.error}
                </div>
              )}
              <form className="w-100">
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    placeholder="John Doe"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    className="form-control"
                    placeholder="john@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="number"
                  >
                    Your Number
                  </label>
                  <input
                    id="number"
                    className="form-control"
                    placeholder="1234567890"
                    type="tel"
                    name="number"
                    maxLength={10}
                    value={formData.number}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="Hello, I would like to..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  onClick={(e) => handleSendMessage(e)}
                  style={{ background: "#303031" }}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  {formData.loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
