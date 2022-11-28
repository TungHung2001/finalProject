import {useField} from "formik";
import React, {useCallback} from "react";
import {Form, Label} from "semantic-ui-react";

interface Props {
  placeholder?: string;
  name: string;
  rows: number;
  label?: string;
  useAltEnter?: boolean;
}

export default function MyTextArea(props: Props) {
  const {useAltEnter, name, label, ...inputProps} = props;
  const [, meta, helpers] = useField(name);
  const {value} = meta;
  const {setValue} = helpers;

  const onChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, [setValue]);

  const onKeydown = useCallback((e: any) => {
    if (!useAltEnter) {
      return;
    }
    if (e.key === 'Enter' && e.altKey) {
      e.preventDefault();
      setValue((value || '') + "\n");
    }
  }, [useAltEnter, value]);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea value={value} onChange={onChange} onKeyDown={onKeydown} {...inputProps} />
      {meta.touched && meta.error ? (
        <Label basic color="red" className="error-msg">{meta.error}</Label>
      ) : null}
    </Form.Field>
  );
}
