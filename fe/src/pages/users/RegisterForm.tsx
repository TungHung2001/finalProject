import {ErrorMessage, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import React from "react";
import {Button, Header} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {useStore} from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";
import {NavLink} from 'react-router-dom';
import ValidatePassword from '../../app/common/form/ValidatePassword';
import {validatePassword} from '../../app/common/util/helpers';

function validatePass(value: string) {
  let error;
  if (!value) {
    error = 'Password is required!';
  } else {
    if (Object.values(validatePassword(value)).some(x => x)) {
      error = 'Invalid password!';
    }
  }
  return error;
}

export default observer(function RegisterForm() {
  const {userStore} = useStore();
  return (
    <Formik
      initialValues={{displayName: '', email: '', password: '', error: null}}
      onSubmit={(values, {setErrors}) => userStore.register(values)
      .catch(error => setErrors({error: error}))}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        email: Yup.string().required().email(),
      })}
    >

      {({values, handleSubmit, isSubmitting, errors, isValid, dirty}) => (
        <Form className="ui form login-form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Register" textAlign="center"/>
          <MyTextInput name="displayName" label="Full name"/>
          <MyTextInput name="email" label="Email"/>
          <MyTextInput name="password" label="Password" type="password"/>
          <ValidatePassword password={values.password}/>
          <ErrorMessage name="error" render={() => <ValidationErrors errors={errors.error}/>}/>
          <Button
            disabled={!isValid || !dirty || isSubmitting || !!validatePass(values.password)}
            loading={isSubmitting}
            primary={true}
            content="Register"
            type="submit"
            fluid
          />
          <p className="pt-10">New to us? <NavLink to="/register">Register</NavLink></p>
        </Form>
      )}
    </Formik>
  );
});
