import React, { useContext } from "react";
import AuthContext from "../util/authCtx";
import api from "../util/api";

function Login() {
  const authContext = useContext(AuthContext);

  function fakeLogin() {
    console.log(process.env.REACT_APP_API_URL);
    api
      .post("login", { username: "deleonn", password: "secret" })
      .then((res) => {
        const { token } = res.data;
        authContext.setToken(token);
        authContext.login();
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <button onClick={fakeLogin}>Login</button>
      <div>Login</div>
    </div>
  );
}

export default Login;
