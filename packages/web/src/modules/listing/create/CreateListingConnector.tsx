import * as React from "react";

import { Form, Formik, FormikActions } from "formik";
import { Form as AntForm, Button } from "antd";
import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { Page3 } from "./ui/Page3";
import { RouteComponentProps } from "react-router-dom";
import { withCreateListing, WithCreateListing } from "@abb/controller";
const FormItem = AntForm.Item;

interface State {
  page: number;
}

interface FormValues {
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

export class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListing,
  State
> {
  state = {
    page: 0
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));

  submit = async (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    console.log(values);
    await this.props.createListing(values);
    setSubmitting(false);
  };

  render() {
    return (
      <Formik<FormValues, {}>
        initialValues={{
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
        }}
        onSubmit={this.submit}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "flex" }}>
            <div style={{ width: 400, margin: "auto" }}>
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
export const CreateListingConnector = withCreateListing(C);
