import { validUserSchema } from "@abb/common";
import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { InputField } from "../../shared/InputField";
import { View, Text } from "react-native";
import { Card, Button } from "react-native-elements";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Register</Text>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />

          <Field
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />
          <Button
            buttonStyle={{ marginTop: 30 }}
            title="submit"
            onPress={handleSubmit as any}
          />
        </Card>
      </View>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: props => ({
    email: "",
    password: ""
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
