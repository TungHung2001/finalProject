import {useField} from "formik";
import React, {useCallback} from "react";
import {Checkbox, Form, Label} from "semantic-ui-react";

interface Props {
  name: string;
  label?: string;
  checkboxLabel?: string;
  checkedValue?: any;
  unCheckValue?: any;
  isLoading?: boolean;
}

export default function MyCheckboxInput(props: Props) {
  const {name, checkboxLabel, checkedValue, unCheckValue, isLoading} = props;
  const [, meta, helpers] = useField(name);

  const {value} = meta;
  const {setValue} = helpers;

  const onChange = useCallback((event: any, data: any) => {
    const checked = !!data?.checked;
    if (checked) {
      setValue(checkedValue);
    } else {
      setValue(unCheckValue);
    }
  }, [value, checkedValue, unCheckValue, setValue]);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Checkbox label={checkboxLabel} checked={value === checkedValue} onChange={onChange}/>
      {meta.touched && meta.error ? (
        <Label basic color="red" className="error-msg">{meta.error}</Label>
      ) : null}
    </Form.Field>
  );
}
