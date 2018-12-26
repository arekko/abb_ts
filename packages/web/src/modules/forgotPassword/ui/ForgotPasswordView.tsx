import * as React from "react";
import { Icon, Button } from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            component={InputField}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            reset password
          </Button>
        </div>
      </Form>
    );
  }
}

export const ForgotPasswordView = withFormik<Props, FormValues>({
  mapPropsToValues: props => ({
    email: ""
  }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
