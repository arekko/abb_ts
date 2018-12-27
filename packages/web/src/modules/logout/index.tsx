import * as React from "react";
import { LogoutController } from "@abb/controller";
import { CallLogout } from "./CallLogout";
import { RouteComponentProps } from "react-router-dom";

export class Logout extends React.PureComponent<RouteComponentProps> {
  onFinish = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <LogoutController>
        {({ logout }) => (
          <CallLogout logout={logout} onFinish={this.onFinish} />
        )}
      </LogoutController>
    );
  }
}
