import CarPage from "../pages/Car/Car";
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
    path: "/:carID",
    name: "Car",
    component: CarPage,
  },
  {
    exactly: false,
    path: "*",
    name: "Page 404",
    component: CarPage,
  },
] as IRoutes[];
