import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import agent from '../../../app/api/agent';
import {toast} from 'react-toastify';
import {Header, Placeholder} from 'semantic-ui-react';
import {sleep} from '../../../app/common/util/helpers';
import {Helmet} from 'react-helmet';
import {User} from '../../../app/models/user';
import FormUser from './FormUser';
import {useStore} from '../../../app/stores/store';

const EditUser = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id || '';
  const {accountStore: {getUserDetail}} = useStore();

  useEffect(() => {
    if (!id) {
      return;
    }
    getUserDetail(id).then(setUser).catch(() => {
      toast.error('Error!');
    });
  }, [id, getUserDetail]);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      await agent.Account.updateUser({
        ...user,
        ...values,
      });
      toast.success('User updated!');
      if (user?.userId && values.changePassword && values.password) {
        await agent.Account.setUserPassword({
          userId: user.userId,
          newPassword: values.password,
        });
        toast.success('Password changed!');
      }
      await sleep(500);
      navigate('/manage/users');
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Edit User</title>
        </Helmet>
        <Header as="h1">Edit User</Header>
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
          </Placeholder.Paragraph>
        </Placeholder>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <Header as="h1">Edit User</Header>
      <FormUser
        isEdit={true}
        user={user}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditUser;
