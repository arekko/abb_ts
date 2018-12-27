import * as React from "react";

import { NativeRouter, Route, Switch } from "react-router-native";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";

const Routes = () => (
  <NativeRouter initialEntries={["/listing/create"]}>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route
        exact={true}
        path="/listing/create"
        component={CreateListingConnector}
      />
    </Switch>
  </NativeRouter>
);

export default Routes;
