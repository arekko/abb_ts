import { loginSchema } from "@abb/common";
import * as React from "react";
import * as Antd from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { InputField } from "../../shared/InputField";
import { Link } from "react-router-dom";

const { Form: AntForm, Icon, Button } = Antd;
const FormItem = AntForm.Item;

interface FormValues {
  email: string;
  password: string;
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

          <Field
            name="password"
            type="password"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            component={InputField}
          />

          <FormItem>
            <Link className="login-form-forgot" to="/forgot-password">
              Forgot password
            </Link>
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          <FormItem>
            Or <Link to="/register">register</Link>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const Loginview = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: props => ({
    email: "",
    password: ""
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
