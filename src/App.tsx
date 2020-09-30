import React from "react";
import { Router } from "./router";
import AuthContext from "./util/authCtx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any>({});
  const [token, setAToken] = React.useState<string>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      login();
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setLoading(false);
  };

  const setToken = (token: string) => {
    setAToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        token,
        loading,
        setToken,
      }}
    >
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
