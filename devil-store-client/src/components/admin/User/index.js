import React, { Fragment, createContext, useReducer } from "react";
import AllUsers from "./AllUsers";
import AdminLayout from "../layout";
import { userState, userReducer } from "./UserContext";
export const UserContext = createContext();

const UserComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <AllUsers />
    </div>
  );
};

const Userinfo = (props) => {
  const [data, dispatch] = useReducer(userReducer, userState);
  return (
    <Fragment>
      <UserContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<UserComponent />} />
      </UserContext.Provider>
    </Fragment>
  );
};

export default Userinfo;
