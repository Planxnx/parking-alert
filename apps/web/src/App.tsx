import React from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

import { RouterManagementViews } from "./router";

const App: React.FC = () => {
  return (
    <Router>
      <RouterManagementViews />
    </Router>
  );
};

export default withRouter(App);
