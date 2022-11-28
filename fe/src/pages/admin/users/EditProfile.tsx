import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import agent from '../../../app/api/agent';
import {toast} from 'react-toastify';
import {Header, Placeholder} from 'semantic-ui-react';
import {sleep} from '../../../app/common/util/helpers';
import {Helmet} from 'react-helmet';
import {User} from '../../../app/models/user';
import FormUser from './FormUser';
import {useStore} from '../../../app/stores/store';

const EditProfile = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const {userStore: {getUser}} = useStore();

  useEffect(() => {
    getUser().then(u => {
      if (u?.userId) {
        setUser(new User(u));
      }
    }).catch(() => {
      toast.error('Error!');
    });
  }, [getUser]);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      await agent.Account.updateProfile({
        displayName: values.displayName,
        email: values.email,
      });
      if (values.changePassword && values.password) {
        await agent.Account.changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.password,
        });
      }
      toast.success('User updated!');
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
          <title>Edit Profile</title>
        </Helmet>
        <Header as="h1">Edit Profile</Header>
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
        <title>Edit Profile</title>
      </Helmet>
      <Header as="h1">Edit Profile</Header>
      <FormUser
        isEdit={true}
        isCurrentUser={true}
        user={user}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditProfile;
