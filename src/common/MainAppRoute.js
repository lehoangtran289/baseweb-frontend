import React, { Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectedFunction } from "../action";
import { mapPathMenu } from "../config/menuconfig";
import Layout from "../layout/Layout";
import Loading from "./Loading";
import NotFoundError from "./NotFoundError";

function MainAppRoute(props) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "")
      dispatch(updateSelectedFunction(null));

    let selectedFunction = mapPathMenu.get(location.pathname); //menu obj
    if (selectedFunction !== undefined && selectedFunction !== null)
      dispatch(updateSelectedFunction(selectedFunction));
  }, [location]);

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route component={NotFoundError} path="*"></Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default MainAppRoute;
