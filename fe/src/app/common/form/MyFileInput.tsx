import {useField} from "formik";
import React, {useCallback} from "react";
import {Form, Label} from "semantic-ui-react";

interface Props {
  name: string;
  label?: string;
}

export default function MyFileInput(props: Props) {
  const {name} = props;
  const [field, meta, helpers] = useField(name);

  const {setValue} = helpers;

  const onChange = useCallback((event: any) => {
    setValue(event.currentTarget.files[0]);
  }, [setValue]);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...props} type="file" onChange={onChange} />
      {meta.touched && meta.error ? (
        <Label basic color="red" className="error-msg">{meta.error}</Label>
      ) : null}
    </Form.Field>
  );
}
