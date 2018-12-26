import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { normalizeErrorMap } from '../../types/NormalizeErrorMap';
import {
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
} from "../../schemaTypes";

interface Props {
  children: (
    data: {
      submit: (
        values: ForgotPasswordChangeMutationVariables
      ) => Promise<normalizeErrorMap | null>;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    ForgotPasswordChangeMutation,
    ForgotPasswordChangeMutationVariables
  >
> {
  submit = async (values: ForgotPasswordChangeMutationVariables) => {
    const {
      data: { forgotPasswordChange }
    }: any = await this.props.mutate({
      variables: values
    });
    console.log(forgotPasswordChange);

    if (forgotPasswordChange) {
      return normalizeErrors(forgotPasswordChange);
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const forgotPasswordMutation = gql`
  mutation ForgotPasswordChangeMutation($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
      path
      message
    }
  }
`;
export const ChangePasswordController = graphql<
  Props,
  ForgotPasswordChangeMutation,
  ForgotPasswordChangeMutationVariables
>(forgotPasswordMutation)(C);
