import React from "react";

export default React.createContext({
  isAuthenticated: false,
  user: {},
  loading: true,
  token: "",
  login: () => {},
  logout: () => {},
  setToken: (token: string) => {},
});
