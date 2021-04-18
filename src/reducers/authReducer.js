const initState = {
  username: "hruday@gmail.com",
  password: "hruday123",
  isLoggedIn: localStorage.getItem("isLoggedIn") === 'true' || false,
  errorMessage: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      if (
        action.logininfo.username === state.username &&
        action.logininfo.password === state.password
      ) {
        localStorage.setItem("isLoggedIn", true);
        return {
          ...state,
          isLoggedIn: true,
          errorMessage: "Login Success",
        };
      } else {
        return {
          ...state,
          errorMessage: "User name or password is incorrect",
        };
      }
    case "SIGNOUT": {
      localStorage.setItem("isLoggedIn", false);
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: "Logout Successfully",
      };
    }
    default:
      return state;
  }
};

export default authReducer;
