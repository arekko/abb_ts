import * as React from "react";
import { RegisterView } from "./ui/RegisterView";
import { RegisterController } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";

export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/confirm-email", {message: "check your email to confirm your account"});
  };

  render() {
    return (
      <React.Fragment>
        <RegisterController>
          {({ submit }: { submit: any }) => <RegisterView onFinish={this.onFinish} submit={submit} />}
        </RegisterController>
      </React.Fragment>
    );
  }
}
