import React, { Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectedFunction } from "../action";
import { mapPathMenu } from "../config/menuconfig";
import Layout from "../layout/Layout";
import Loading from "./Loading";
import NotFoundError from "./NotFoundError";
import PrivateRoute from "./PrivateRoute";
import Home from "../component/Home";
import { lazy } from "yup";

const UserLoginRoute = lazy(() => import("../routers/UserLoginRoute"));

function MainAppRoute(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  // each time "location" change, update selected function
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "")
      dispatch(updateSelectedFunction(null));

    let selectedFunction = mapPathMenu.get(location.pathname); // selected function = menu obj
    if (selectedFunction !== undefined && selectedFunction !== null)
      dispatch(updateSelectedFunction(selectedFunction));
  }, [location]);

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <PrivateRoute component={Home} layout={Layout} exact path="/" />

          <PrivateRoute
            component={UserLoginRoute}
            layout={Layout}
            path="/userLogin"
          />

          <Route component={NotFoundError} path="*" />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default MainAppRoute;
