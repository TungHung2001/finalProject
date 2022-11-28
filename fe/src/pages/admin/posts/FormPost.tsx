import {Form, Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form as SForm, Segment} from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextInputArea';
import * as Yup from 'yup';
import MySunEditor from '../../../app/common/editor/MySunEditor';
import MyFileInput from '../../../app/common/form/MyFileInput';
import {Post} from '../../../app/models/post';
import {useStore} from '../../../app/stores/store';
import MyCheckboxListInput, {ICheckboxOptionItem} from '../../../app/common/form/MyCheckboxListInput';

const validationSchema = Yup.object({
  title: Yup.string().required('The title is required'),
  shortBody: Yup.string().required('The description is required'),
  fullBody: Yup.string().required('The content is required'),
});

interface FormPostProps {
  post: Post;

  onSubmit(values: Post, action: FormikHelpers<Post>): void;
}

const FormPost = (props: FormPostProps) => {
  const {post, onSubmit} = props;
  const [categoryOptions, setCategoryOptions] = useState<ICheckboxOptionItem[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);

  const {categoryStore} = useStore();
  const {getCategories} = categoryStore;

  useEffect(() => {
    getCategories().then((data) => {
      const options: ICheckboxOptionItem[] = [];
      data.forEach(category => {
        options.push({
          label: category.displayName,
          value: category.categoryId,
        });
      });
      setCategoryOptions(options);
    }).catch(error => {
      console.error(error);
      setCategoryOptions([]);
    }).finally(() => {
      setIsLoadingCategories(false);
    });
  }, [getCategories]);

  return (
    <>
      <Segment clearing>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={post}
          onSubmit={onSubmit}
        >
          {({handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
              <MyTextInput name="title" label="Title"/>
              <MyTextArea name="shortBody" label="Summary" rows={3}/>
              <MyFileInput name="image" label="Cover"/>
              <MyCheckboxListInput
                name="categoryIds"
                label="Category"
                options={categoryOptions}
                isLoading={isLoadingCategories}
              />
              <SForm.Field className="pb-10">
                <label>Content</label>
                <MySunEditor name="fullBody"/>
              </SForm.Field>
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={isSubmitting}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button as={Link} to="/manage/posts" floated="right" type="button" content="Cancel"/>
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
};

export default FormPost;
