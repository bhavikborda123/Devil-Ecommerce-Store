import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllUsers = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/user/all-user`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (_id) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/delete-user`, {
      _id,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
