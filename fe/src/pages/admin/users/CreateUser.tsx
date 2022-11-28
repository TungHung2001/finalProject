import {useNavigate} from "react-router-dom";
import FormUser from "./FormUser";
import React, {useCallback, useMemo} from 'react';
import agent from '../../../app/api/agent';
import {toast} from 'react-toastify';
import {sleep} from '../../../app/common/util/helpers';
import {Helmet} from 'react-helmet';
import {User} from '../../../app/models/user';
import {UserRoles} from '../../../app/common/options/userRoles';

const CreateUser = () => {
  const navigate = useNavigate();

  const user = useMemo(() => {
    return new User({
      username: '',
      displayName: '',
      roleId: UserRoles.Viewer.id,
      password: '',
    });
  }, []);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      const postData = {
        ...values,
      };
      delete postData.image;
      await agent.Account.createUser(postData);
      toast.success('User created!');
      await sleep(500);
      navigate('/manage/users');
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Add User</title>
      </Helmet>
      <h1>Add User</h1>
      <FormUser
        isEdit={false}
        user={user}
        onSubmit={handleSubmit}
      />
    </>
  );
};


export default CreateUser;
