import CarPage from "../pages/Car/Car";
import HomePage from "../pages/Home/Home";
import Page404Page from "../pages/404";
import React from "react";

export interface IRoutes {
  exactly: boolean;
  path: string;
  name: string;
  component: React.FC;
}

export default [
  {
    exactly: true,
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    exactly: true,
    path: "/:carID",
    name: "Car",
    component: CarPage,
  },
  {
    exactly: false,
    path: "*",
    name: "Page 404",
    component: Page404Page,
  },
] as IRoutes[];
