import * as React from "react";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import gql from "graphql-tag";
import { graphql, ChildProps } from "react-apollo";
import { MeQuery } from "../../schemaTypes";

type Props = RouteProps;

export class C extends React.PureComponent<ChildProps<Props, MeQuery>> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { data, component } = this.props;

    if (!data || data.loading) {
      return null;
    }

    if (!data.me) {
      // user not logged in
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname } // after login we redirect user to the current page
          }}
        />
      );
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  };

  render() {
    const { data: _, component: __, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const meQuery = gql`
  query MeQuery {
    me {
      email
    }
  }
`;

export const AuthRoute = graphql<Props, MeQuery>(meQuery)(C);
