import { RouterManagement } from "react-router-management";

import CarPage from "../pages/Car/Car";

const routes = [
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
];

export const RouterManagementViews = () => {
  return RouterManagement({ routes });
};
