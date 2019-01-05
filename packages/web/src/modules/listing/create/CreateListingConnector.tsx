import * as React from "react";

import { FormikActions } from "formik";
import { RouteComponentProps } from "react-router-dom";
import { withCreateListing, WithCreateListing } from "@abb/controller";
import { ListingFormValues, ListingForm } from "../shared/ListingForm";

export class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListing
> {
  submit = async (
    values: ListingFormValues,
    { setSubmitting }: FormikActions<ListingFormValues>
  ) => {
    console.log(values);
    await this.props.createListing(values);
    setSubmitting(false);
  };

  render() {
    return <ListingForm submit={this.submit} />;
  }
}
export const CreateListingConnector = withCreateListing(C);
