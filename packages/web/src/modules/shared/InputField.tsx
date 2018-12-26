import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input, InputNumber } from "antd";

const FormItem = Form.Item;

export const InputField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    useNumberComponent?: boolean;
  }
> = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  useNumberComponent = false,
  ...props
}) => {

  const changeNumberValue = (newValue: any) => {
    setFieldValue(field.name, newValue)
  }
  const errorMsg = touched[field.name] && errors[field.name];



  return (
    <FormItem
      label={label}
      help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
    >
      {useNumberComponent ? <InputNumber
        {...field}
        onChange={changeNumberValue}
      /> : <Input
        {...field}
        {...props}
        onChange={onChange}
      />

}    </FormItem>
  );
};
