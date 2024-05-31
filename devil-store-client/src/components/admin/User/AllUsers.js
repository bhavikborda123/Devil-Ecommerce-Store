import React, { Fragment, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteUser, getAllUsers } from "./FetchApi";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let response = await getAllUsers();
      let usersData = response?.Users || [];
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQueryClick = async () => {
    let response = await getAllUsers();
    let filteredUsers = response.Users.filter(user => {
      const userValues = Object.values(user);
      return userValues.some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSearchQuery(null);
    setUsers(filteredUsers);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await deleteUser(_id);
      if (response.success) {
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
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
      <div className="flex items-center justify-between mb-4" style={{ maxWidth: '400px' }}>
        <div className="border-4 border-gray-400 rounded-full flex items-center justify-between overflow-hidden">
          <span style={{ background: "#303031" }}
            className="py-2 px-3"
            onClick={(e) => { if (searchQuery) handleSearchQueryClick() }}>
            <svg
              className="rounded-l-full w-6 h-6 text-gray-100"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            placeholder="Search..."
            className="py-2 px-4 focus:outline-none rounded-r-full w-full"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="relative text-white text-base font-semibold py-2 px-4 rounded-full uppercase"
          onClick={fetchUsers}
          style={{ background: "#303031" }}
        >
          Reset
        </button>
      </div>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td className="p-2 text-left">{user.name}</td>
                  <td className="p-2 text-left">{user.email}</td>
                  <td className="p-2 flex items-center justify-center">
                    <span
                      onClick={() => handleDelete(user._id)}
                      className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
                    >
                      <MdDelete className="w-6 h-6 fill-current text-red-500" />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-xl text-center font-semibold py-8"
                >
                  No user found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {users && users.length} users found
        </div>
      </div>
    </Fragment>
  );
};

export default AllUsers;
