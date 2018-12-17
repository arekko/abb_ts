/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_errors {
  __typename: "Error";
  path: string;
  message: string;
}

export interface LoginMutation_login {
  __typename: "LoginResponse";
  errors: LoginMutation_login_errors[] | null;
  sessionId: string;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}
