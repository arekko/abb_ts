import * as React from "react";
import { Form, Icon, Input, Button } from "antd";
import { withFormik } from "formik";

const FormItem = Form.Item;

class C extends React.PureComponent {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <FormItem>
            <Input
              name="Email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          </FormItem>
          <FormItem>
            <Input
              name="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </FormItem>
          <FormItem>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
          <FormItem>
            Or <a href="">login now!</a>
          </FormItem>
        </div>
      </div>
    );
  }
}

export const RegisterView = withFormik({
  mapPropsToValues: props => ({
    email: "",
    password: ""
  }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);
  }
})(C);
