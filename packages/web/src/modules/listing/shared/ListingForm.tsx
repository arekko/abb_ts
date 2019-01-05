import * as React from "react";

import { Form, Formik, FormikActions } from "formik";
import { Form as AntForm, Button } from "antd";
import { Link } from "react-router-dom";
import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { Page3 } from "./ui/Page3";

const FormItem = AntForm.Item;

interface State {
  page: number;
}

interface Props {
  initialValues?: ListingFormValues;
  submit: (
    data: ListingFormValues,
    action: FormikActions<ListingFormValues>
  ) => void;
}

export interface ListingFormValues {
  pictureUrl: string | null;
  picture: any | null;
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}

// tslint:disable-next-line:jsx-key
const pages = [<Page1 />, <Page2 />, <Page3 />];

export const defaultListingFormValues: ListingFormValues = {
  pictureUrl: null,
  picture: null,
  name: "",
  category: "",
  description: "",
  price: 0,
  beds: 0,
  guests: 0,
  latitude: 0,
  longitude: 0,
  amenities: []
};

export class ListingForm extends React.PureComponent<Props, State> {
  state = {
    page: 0
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));

  render() {
    const { submit, initialValues = defaultListingFormValues } = this.props;

    return (
      <Formik<ListingFormValues, {}>
        initialValues={initialValues}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "flex" }}>
            <div style={{ width: 400, margin: "auto" }}>
              <Link to="/logout">Logout</Link>
              <FormItem>
                {pages[this.state.page]}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  {this.state.page === pages.length - 1 ? (
                    <div>
                      <Button type="primary" htmlType="submit">
                        Create listing
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="primary"
                      onClick={this.nextPage}
                      disabled={isSubmitting}
                    >
                      Next page
                    </Button>
                  )}
                </div>
              </FormItem>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
