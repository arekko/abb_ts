import * as React from "react";
import { FieldProps } from "formik";
import { Form, Select } from "antd";

const FormItem = Form.Item;

export const TagField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    useNumberComponent?: boolean;
  }
> = ({
  field: { onChange, onBlur: _, ...field },
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  useNumberComponent = false,
  ...props
}) => {
  const handleOnChange = (newValue: any) => {
    setFieldValue(field.name, newValue);
  };
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <FormItem
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <Select {...field} {...props} mode="tags" onChange={handleOnChange} />
    </FormItem>
  );
};
