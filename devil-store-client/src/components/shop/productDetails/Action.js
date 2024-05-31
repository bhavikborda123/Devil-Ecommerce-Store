import React from "react";
import { postAddReview, postDeleteReview } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";

export const Alert = (color, text) => (
  <div className={`bg-${color}-200 px-4 py-2 my-2 rounded`}>{text}</div>
);

export const reviewSubmitHandler = (formData, setFormData, fetchData) => {
  if (!formData.rating || !formData.review) {
    setFormData({ ...formData, error: "Rating and review must be required" });
  } else if (!isAuthenticate()) {
    setFormData({ ...formData, error: "You must need login to review" });
  } else {
    addReview(formData, setFormData, fetchData);
  }
};

export const deleteReview = async (
  reviewId,
  productId,
  fetchData,
  setFormData
) => {
  try {
    let responseData = await postDeleteReview({
      rId: reviewId,
      pId: productId,
    });
    if (responseData.success) {
      fetchData();
      setFormData({ success: responseData.success });
    } else if (responseData.error) {
      fetchData();
    }
  } catch (error) {
    console.error(error);
  }
};

export const addReview = async (formData, setFormData, fetchData) => {
  let reviewData = {
    rating: formData.rating,
    review: formData.review,
    pId: formData.pId,
    uId: JSON.parse(localStorage.getItem("jwt")).user._id,
  };
  try {
    let responseData = await postAddReview(reviewData);
    if (responseData.success) {
      setFormData({
        ...formData,
        success: responseData.success,
        review: "",
        rating: "",
      });
      fetchData();
    } else if (responseData.error) {
      setFormData({ ...formData, error: responseData.error, review: "", rating: "" });
      fetchData();
    }
  } catch (error) {
    console.error(error);
  }
};
