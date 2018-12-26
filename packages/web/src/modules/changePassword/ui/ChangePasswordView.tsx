import * as React from "react";
import { Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { InputField } from "../../shared/InputField";
import { changePasswordSchema } from "@abb/common";
import {
  ForgotPasswordChangeMutationVariables,
  normalizeErrorMap
} from "@abb/controller";

interface FormValues {
  newPassword: string;
}

interface Props {
  onFinish: () => void;
  token: string;
  submit: (
    values: ForgotPasswordChangeMutationVariables
  ) => Promise<normalizeErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="newPassword"
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="New password"
            component={InputField}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Change password
          </Button>
        </div>
      </Form>
    );
  }
}

export const ChangePasswordView = withFormik<Props, FormValues>({
  validationSchema: changePasswordSchema,
  mapPropsToValues: props => ({
    newPassword: ""
  }),
  handleSubmit: async ({ newPassword }, { props, setErrors }) => {
    const errors = await props.submit({ newPassword, key: props.token });
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);
