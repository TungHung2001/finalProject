import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import LoginForm from './LoginForm';
import {Helmet} from 'react-helmet';

const LoginPage = () => {
  return (
    <>
      <Container>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="login-form-wrapper">
          <LoginForm/>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
