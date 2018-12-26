import * as React from "react";
import { Loginview } from "./ui/LoginView";
import { LoginController } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    const {
      history,
      location: { state }
    } = this.props;
    if (state && state.next) {
      return history.push(state.next);
    }

    history.push("/");
  };

  render() {
    return (
      <LoginController>
        {({ submit }) => <Loginview onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
