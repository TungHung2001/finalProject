import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import agent from '../../../app/api/agent';
import {toast} from 'react-toastify';
import {Header, Placeholder} from 'semantic-ui-react';
import FormCategory from './FormCategory';
import {sleep} from '../../../app/common/util/helpers';
import {Helmet} from 'react-helmet';
import {Category} from '../../../app/models/category';

const EditPost = () => {
  const [category, setCategory] = useState<Category>();
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '');

  useEffect(() => {
    if (!id) {
      return;
    }
    agent.Categories.detail(id).then(res => {
      setCategory(new Category(res));
    }).catch((error) => {
      console.error(error);
      toast.error('Could not get category detail!');
    });
  }, [id]);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      const postData = {
        ...category,
        ...values,
      };
      delete postData.image;
      await agent.Categories.update(postData);
      toast.success('Category updated!');
      await sleep(500);
      navigate('/manage/categories');
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    }
  }, [category, navigate]);

  if (!category) {
    return (
      <>
        <Helmet>
          <title>Edit Category</title>
        </Helmet>
        <Header as="h1">Edit Category</Header>
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
        <title>Edit Category</title>
      </Helmet>
      <Header as="h1">Edit Category</Header>
      <FormCategory
        category={category}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditPost;
