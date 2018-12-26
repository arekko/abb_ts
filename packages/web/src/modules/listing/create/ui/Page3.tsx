import * as React from "react";
import { InputField } from "../../../shared/InputField";
import { Field } from "formik";
import { TagField } from '../../../shared/TagField';

export const Page3 = () => (
  <>
    <Field
      label="Latitude"
      name="latitude"
      placeholder="Latitude"
      component={InputField}
      useNumberComponent="true"
    />
    <Field
      label="Longitude"
      name="longitude"
      placeholder="Longitude"
      component={InputField}
      useNumberComponent="true"
    />
    <Field name="amenities" placeholder="Amenities" component={TagField} />
  </>
);
