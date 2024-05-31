import { getUserById, updatePersonalInformationFetch, getOrderByUser, updatePassword } from "./FetchApi";

export const logout = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("cart");
  localStorage.removeItem("wishList");
  window.location.href = "/";
};

export const fetchData = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let userId = JSON.parse(localStorage.getItem("jwt"))
    ? JSON.parse(localStorage.getItem("jwt")).user._id
    : "";
  try {
    let responseData = await getUserById(userId);
    setTimeout(() => {
      if (responseData && responseData.User) {
        dispatch({ type: "userDetails", payload: responseData.User });
        dispatch({ type: "loading", payload: false });
      }
    }, 500);
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrderByUser = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let userId = JSON.parse(localStorage.getItem("jwt"))
    ? JSON.parse(localStorage.getItem("jwt")).user._id
    : "";
  try {
    let responseData = await getOrderByUser(userId);
    setTimeout(() => {
      if (responseData && responseData.Order) {
        dispatch({ type: "OrderByUser", payload: responseData.Order });
        dispatch({ type: "loading", payload: false });
      }
    }, 500);
  } catch (error) {
    console.error(error);
  }
};

export const updatePersonalInformationAction = async (formData, setFormData, dispatch) => {
  const fData = {
    uId: formData.id,
    name: formData.name,
    phoneNumber: formData.phone,
  };
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await updatePersonalInformationFetch(fData);
    if (responseData && responseData.success) {
      dispatch({ type: "loading", payload: false });
      fetchData(dispatch);
      setFormData({ ...formData, success: responseData.success })
    } else {
      dispatch({ type: "loading", payload: false });
      fetchData(dispatch);
      setFormData({ ...formData, error: responseData.error })
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleChangePassword = async (formData, setFormData, dispatch) => {
  if (!formData.newPassword || !formData.oldPassword || !formData.confirmPassword) {
    setFormData({
      ...formData,
      error: "Please provide your all password and a new password",
    });
  } else if (formData.newPassword !== formData.confirmPassword) {
    setFormData({ ...formData, error: "Password does't match" });
  } else {
    const fData = {
      uId: JSON.parse(localStorage.getItem("jwt")).user._id,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await updatePassword(fData);
      if (responseData && responseData.success) {
        setFormData({
          ...formData,
          success: responseData.success,
          error: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        dispatch({ type: "loading", payload: false });
      } else if (responseData.error) {
        dispatch({ type: "loading", payload: false });
        setFormData({
          ...formData,
          error: responseData.error,
          success: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
};
