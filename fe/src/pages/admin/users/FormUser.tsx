import {Form, Formik, FormikHelpers} from 'formik';
import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {Button, Segment} from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import * as Yup from 'yup';
import {IEditUserForm, User} from '../../../app/models/user';
import MySelectInput from '../../../app/common/form/MySelectInput';
import {UserRoleOptions} from '../../../app/common/options/userRoles';
import ValidatePassword from '../../../app/common/form/ValidatePassword';
import {validatePassword} from '../../../app/common/util/helpers';
import MyCheckboxInput from '../../../app/common/form/MyCheckboxInput';

const validationSchema = Yup.object({
  email: Yup.string().required('The email is required'),
  displayName: Yup.string().required('The full name is required'),
  roleId: Yup.string().required('The role is required'),
});

interface IProps {
  user: User;
  isEdit: boolean;
  isCurrentUser?: boolean;

  onSubmit(values: IEditUserForm, action: FormikHelpers<IEditUserForm>): void;
}

const FormCategory = (props: IProps) => {
  const {user, isEdit, isCurrentUser, onSubmit} = props;

  const validatePass = useCallback((value: string) => {
    let error;
    if (isEdit && !value) {
      return;
    }
    if (!value) {
      error = 'Password is required!';
    } else {
      if (Object.values(validatePassword(value)).some(x => x)) {
        error = 'Invalid password!';
      }
    }
    return error;
  }, [isCurrentUser, isEdit]);

  return (
    <>
      <Segment clearing>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={user}
          onSubmit={onSubmit}
        >
          {({values, handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
              {
                !isCurrentUser &&
                <MySelectInput options={UserRoleOptions} label="Role" name="roleId" pointing="bottom"/>
              }
              <MyTextInput name="displayName" label="Full name"/>
              <MyTextInput name="email" label="Email"/>
              {
                !isEdit &&
                <MyTextInput name="password" label="Password" type="password"/>
              }
              {
                isEdit &&
                <MyCheckboxInput name="changePassword" checkboxLabel="Change password" checkedValue={true} unCheckValue={false}/>
              }
              {
                isEdit && !!values.changePassword &&
                <>
                  {
                    isCurrentUser &&
                    <MyTextInput name="currentPassword" label="Current Password" type="password"/>
                  }
                  <MyTextInput name="password" label="Password" type="password"/>
                  <ValidatePassword password={values.password}/>
                </>
              }
              <div className="clearfix">
                <Button
                  disabled={isSubmitting || !dirty || !isValid || !!validatePass(values.password || '')}
                  loading={isSubmitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button as={Link} to="/manage/users" floated="right" type="button" content="Cancel"/>
              </div>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
};

export default FormCategory;
