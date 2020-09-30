import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Login, Game, Register } from "../pages";
import AuthContext from "../util/authCtx";

function Router() {
  const authContext = useContext(AuthContext);

  const publicRoutes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Redirect to="/login" />
    </Switch>
  );

  const privateRoutes = (
    <Switch>
      <Route path="/" component={Game} />
    </Switch>
  );

  const getRoutes = () => {
    if (authContext.isAuthenticated) {
      return privateRoutes;
    }

    return publicRoutes;
  };

  return <BrowserRouter>{!authContext.loading && getRoutes()}</BrowserRouter>;
}

export default Router;
