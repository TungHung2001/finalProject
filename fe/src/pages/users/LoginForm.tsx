import {ErrorMessage, Form, Formik} from "formik";
import {observer} from "mobx-react-lite";
import React from "react";
import {Button, Header, Label} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {useStore} from "../../app/stores/store";
import {NavLink} from 'react-router-dom';

export default observer(function LoginForm() {
  const {userStore} = useStore();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        error: null,
      }} onSubmit={(values, {setErrors}) => userStore.login(values)
    .catch(() => setErrors({error: 'Could not login'}))}
    >
      {({handleSubmit, isSubmitting, errors}) => (
        <Form className="ui form login-form" onSubmit={handleSubmit} autoComplete="off">
          <Header as="h2" content="Login" textAlign="center"/>
          <MyTextInput name="email" label="Email"/>
          <MyTextInput name="password" label="Password" type="password"/>
          <ErrorMessage name="error" render={() =>
            <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>}/>
          <Button loading={isSubmitting} primary={true} content="Login" type="submit" fluid/>
          <p className="pt-10">New to us? <NavLink to="/register">Register</NavLink></p>
        </Form>
      )}
    </Formik>
  );
});
