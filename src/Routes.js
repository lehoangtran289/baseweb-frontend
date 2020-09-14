import React, {Suspense} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_REQUESTING} from "./action";
import {Route, Switch} from "react-router-dom";
import Error500 from "./common/Error500";
import Loading from "./common/Loading";
import SignInContainer from "./container/SignInContainer";
import MainAppRoute from "./common/MainAppRoute";

function Routes(props) {
  const isError = useSelector((state) => state.error.isError);
  if (isError)
    return <Route component={Error500} path="*" />;

  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route component={SignInContainer} path="/login"/>
        <Route component={MainAppRoute} path="*"/>
      </Switch>
    </Suspense>
  );
}

export default Routes;