import * as React from "react";
import { LoginController } from "@abb/controller";
import { LoginView } from './ui/RegisterView';
import { SecureStore } from "expo";
import { SID_KEY } from "../shared/constant";


export class LoginConnector extends React.PureComponent {

  saveSessionId = (sid: string) => {
    SecureStore.setItemAsync(SID_KEY, sid)
  }

  render() {
   
    return (
      <LoginController onSessionid={this.saveSessionId}>
        {({ submit }) => <LoginView submit={submit} />}
      </LoginController>
    );
  }
}