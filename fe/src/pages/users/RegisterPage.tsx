import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import RegisterForm from './RegisterForm';
import {Helmet} from 'react-helmet';

const RegisterPage = () => {
  return (
    <>
      <Container>
        <Helmet>
          <title>Register</title>
        </Helmet>
        <div className="login-form-wrapper">
          <RegisterForm/>
        </div>
      </Container>
    </>
  );
};

export default RegisterPage;
