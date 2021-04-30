import React from "react";
import { Switch, Route } from "react-router-dom";
import { IRoutes } from "./routes";

const createRoute = (route: IRoutes) => (
  <Route exact={route.exactly} path={route.path} key={route.name}>
    <route.component />
  </Route>
);

const RouterView: React.FC<{ routeList: IRoutes[] }> = ({ routeList }) => {
  const Routes = routeList.map(createRoute);
  return <Switch>{Routes}</Switch>;
};

export default RouterView;
