import React from "react";
import { Redirect, useHistory } from "react-router";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: history.location } }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
