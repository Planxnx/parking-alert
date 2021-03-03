import { BrowserRouter as Router, withRouter } from "react-router-dom";

import React from "react";
import RouterView from "../router";
import RoutesList from "../router/routes";

const App: React.FC = () => {
  return (
      <Router>
        <RouterView routeList={RoutesList} />
      </Router>
  );
};

export default withRouter(App);
