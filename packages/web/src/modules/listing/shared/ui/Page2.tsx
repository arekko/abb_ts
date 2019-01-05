import * as React from "react";
import { InputField } from "../../../shared/InputField";
import { Field } from "formik";

export const Page2 = () => (
  <>
    <Field
      label="Price"
      name="price"
      placeholder="Price"
      component={InputField}
      useNumberComponent="true"
    />
    <Field
      useNumberComponent="true"
      label="Beds"
      name="beds"
      placeholder="Name"
      component={InputField}
    />
    <Field
      label="Guests"
      name="guests"
      placeholder="Guests"
      component={InputField}
      useNumberComponent="true"
    />
  </>
);
