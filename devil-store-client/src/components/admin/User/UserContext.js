// Define initial state for user info
export const userState = {
    users: [],
    addUserModal: false,
    updateUserModal: {
      modal: false,
      userId: null,
      role: "",
    },
    loading: false,
    error: null,
  };
  
  // Define user reducer to handle user-related actions
  export const userReducer = (state, action) => {
    switch (action.type) {
      /* Get all users and update state */
      case "fetchUsersAndChangeState":
        return {
          ...state,
          users: action.payload,
        };
      /* Create a new user */
      case "addUserModal":
        return {
          ...state,
          addUserModal: action.payload,
        };
      /* Edit a user */
      case "updateUserModalOpen":
        return {
          ...state,
          updateUserModal: {
            modal: true,
            userId: action.userId,
            role: action.role,
          },
        };
      case "updateUserModalClose":
        return {
          ...state,
          updateUserModal: {
            modal: false,
            userId: null,
            role: "",
          },
        };
      case "loading":
        return {
          ...state,
          loading: action.payload,
        };
      case "error":
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  