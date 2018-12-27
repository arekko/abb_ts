import * as React from "react";
import { FieldProps } from "formik";
import Dropzone from "react-dropzone";

export const DropZoneField: React.SFC<FieldProps<any>> = ({
  field: { name },
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
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
  );
};
