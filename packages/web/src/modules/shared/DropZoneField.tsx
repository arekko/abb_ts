import * as React from "react";
import { FieldProps } from "formik";
import Dropzone from "react-dropzone";
import { Button } from "antd";

export const DropZoneField: React.SFC<FieldProps<any>> = ({
  field: { name, value },
  form: { setFieldValue, values, setValues }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const pUrl = (value ? value.preview : null) || values.pictureUrl;
  return (
    <div>
      <Dropzone
        accept="image/jpeg, image/png, image/jpg"
        multiple={false}
        // tslint:disable-next-line:jsx-no-lambda
        onDrop={([file]) => {
          setFieldValue(name, file);
        }}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      {pUrl && <img src={pUrl} style={{ maxHeight: 200 }} />}
      <Button
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => {
          setValues({
            ...values,
            pictureUrl: "",
            picture: null
          });
        }}
      >
        Remove
      </Button>
    </div>
  );
};
