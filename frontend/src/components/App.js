import React from "react";
// import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route, } from "react-router-dom";
import SplashContainer from './splash/splash_container'


import LoginFormContainer from "./session/login_container";
import SignupFormContainer from "./session/signup_container";

const App = () => (
  <div>
    {/* <NavBarContainer /> */}
    <Switch>

      <Route exact path="/" component={SplashContainer} />
      {/* <AuthRoute exact path="/" component={SplashContainer} /> */}
      <Route exact path="/login" component={LoginFormContainer} />  {/* NEED TO CHANGE TO AUTH ROUTES */}
      <Route exact path="/signup" component={SignupFormContainer} /> 
    </Switch>
  </div>
);

export default App;