import React from "react";
import { useRouteMatch } from "react-router";
import { Route, Switch } from "react-router-dom";
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
        <Route component={UserCreate} path={`${path}/create`} />
        <Route component={UserEdit} path={`${path}/:partyId/edit`} />
        <Route component={UserDetail} path={`${path}/:partyId`} />
      </Switch>
    </div>
  );
}

export default UserLoginRoute;
