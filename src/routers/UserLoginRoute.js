import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import UserList from "../component/userlogin/UserList";
import UserDetail from "../component/userlogin/UserDetail";
import UserCreate from "../component/userlogin/UserCreate";
import UserEdit from "../component/userlogin/UserEdit";

function UserLoginRoute(props) {
  const { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route component={UserList} path={`${path}/list`} />
        <Route component={UserDetail} path={`${path}/:partyId`} />
        <Route component={UserCreate} path={`${path}/create`} />
        <Route component={UserEdit} path={`${path}/:partyId/edit`} />
      </Switch>
    </div>
  );
}

export default UserLoginRoute;
