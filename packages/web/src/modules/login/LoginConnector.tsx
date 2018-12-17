import * as React from "react";
import { Loginview } from "./ui/LoginView";
import { LoginController } from '@abb/controller';


export class LoginConnector extends React.PureComponent {
 
  render() {
    return (
      <LoginController>
        {({ submit }) => <Loginview submit={submit}/>}
      </LoginController>
    );
  }
}
