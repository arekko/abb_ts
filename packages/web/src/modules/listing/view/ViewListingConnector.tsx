import * as React from "react";
import { ViewListing } from "@abb/controller";
import { Link, RouteComponentProps } from "react-router-dom";
export class ViewListingConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <ViewListing listingId={listingId}>
        {data => {
          if (!data.listing) {
            return <div>loading...</div>;
          }
          return (
            <div>
              <div>{data.listing.name}</div>
              <Link to={`/listing/${listingId}/chat`}>Chat</Link>
            </div>
          );
        }}
      </ViewListing>
    );
  }
}
