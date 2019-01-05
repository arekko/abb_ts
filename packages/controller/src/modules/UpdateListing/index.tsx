// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import {
  UpdateListingMutation,
  UpdateListingMutationVariables
} from "../../schemaTypes";
import { Mutation, MutationFn } from "react-apollo";

export const updateListingMutation = gql`
  mutation UpdateListingMutation(
    $listingId: String!
    $input: UpdataListingInput!
  ) {
    updateListing(listingId: $listingId, input: $input)
  }
`;

export interface WithUpdateListing {
  updateListing: MutationFn<
    UpdateListingMutation,
    UpdateListingMutationVariables
  >;
}

interface Props {
  children: (data: WithUpdateListing) => JSX.Element | null;
}

export class UpdateListing extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<UpdateListingMutation, UpdateListingMutationVariables>
        mutation={updateListingMutation}
      >
        {mutate => {
          return children({
            updateListing: mutate
          });
        }}
      </Mutation>
    );
  }
}
