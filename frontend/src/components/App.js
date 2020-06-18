import React from "react";
import { Switch, Route, } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

import Modal from './modal/modal';
import SplashContainer from './splash/splash_container';
import LoginFormContainer from "./session/login_container";
import SignupFormContainer from "./session/signup_container";
import RecipeCreate from "./recipe/recipe_create";
import RecipeShowContainer from "./recipe/recipe_show_container";
import ProfileShow from './profile/profile_show';

const App = () => (
  <div>
    <Modal />
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <Route exact path="/new-recipe" component={RecipeCreate} />
      <Route exact path="/recipes/:recipeId" component={RecipeShowContainer} /> 
      
      <AuthRoute exact path="/login" component={LoginFormContainer} />  {/* NEED TO CHANGE TO AUTH ROUTES */}
      <AuthRoute exact path="/signup" component={SignupFormContainer} /> 
      <ProtectedRoute exact path="/users/:userId" component={ProfileShow} />
    </Switch>
  </div>
);

export default App;
