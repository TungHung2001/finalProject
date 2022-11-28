import {useField} from "formik";
import React, {useCallback} from "react";
import {Checkbox, Form, Label} from "semantic-ui-react";

export interface ICheckboxOptionItem {
  label: string;
  value: any;
}

interface Props {
  name: string;
  label?: string;
  isLoading?: boolean;
  options: ICheckboxOptionItem[];
}

export default function MyCheckboxListInput(props: Props) {
  const {name, options, isLoading} = props;
  const [, meta, helpers] = useField(name);

  const {value} = meta;
  const {setValue} = helpers;

  const onChange = useCallback((option: ICheckboxOptionItem) => (event: any, data: any) => {
    const newValue = (!value || !Array.isArray(value)) ? [] : [...value];
    const checked = !!data?.checked;
    if (checked) {
      if (!newValue.includes(option.value)) {
        newValue.push(option.value);
      }
    } else {
      const index = newValue.findIndex(item => item === option.value);
      if (index >= 0) {
        newValue.splice(index, 1);
      }
    }
    setValue(newValue);
  }, [value, setValue]);

  const isChecked = useCallback((option: ICheckboxOptionItem) => {
    return value && value.includes(option.value);
  }, [value]);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {
        !isLoading &&
        <>
          {
            !!options.length &&
            <div className="checkbox-group">
              {
                options.map((item, index) => (
                  <Checkbox label={item.label} key={index} checked={isChecked(item)} onChange={onChange(item)}/>
                ))
              }
            </div>
          }
          {
            !options.length &&
            <p>No options available.</p>
          }
        </>
      }
      {
        isLoading &&
        <p>Loading...</p>
      }
      {meta.touched && meta.error ? (
        <Label basic color="red" className="error-msg">{meta.error}</Label>
      ) : null}
    </Form.Field>
  );
}
