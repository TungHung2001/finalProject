import {Form, Formik, FormikHelpers} from 'formik';
import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Segment} from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import {Category} from '../../../app/models/category';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  displayName: Yup.string().required('The category name is required'),
  shortName: Yup.string().required('The slug is required'),
  sortOrder: Yup.string().required('The short order is required'),
});

interface IProps {
  category: Category;
  onSubmit(values: Category, action: FormikHelpers<Category>): void;
}

const FormCategory = (props: IProps) => {
  const {category, onSubmit} = props;

  return (
    <>
      <Segment clearing>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={category}
          onSubmit={onSubmit}
        >
          {({handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
              <MyTextInput name="displayName" label="Category name"/>
              <MyTextInput name="shortName" label="Slug"/>
              <MyTextInput name="sortOrder" label="Sort order"/>
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={isSubmitting}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button as={Link} to="/manage/categories" floated="right" type="button" content="Cancel"/>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
};

export default FormCategory;
