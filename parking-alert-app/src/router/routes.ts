import CarContainer from "../containers/Car/Car";
import HomeContainer from "../containers/Home/Home";
import Page404Container from "../containers/404";
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
    component: HomeContainer,
  },
  {
    exactly: true,
    path: "/car/:carID",
    name: "Car",
    component: CarContainer,
  },
  {
    exactly: false,
    path: "*",
    name: "Page 404",
    component: Page404Container,
  },
] as IRoutes[];
