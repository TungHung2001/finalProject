import {useNavigate} from "react-router-dom";
import FormCategory from "./FormCategory";
import React, {useCallback, useMemo} from 'react';
import agent from '../../../app/api/agent';
import {toast} from 'react-toastify';
import {sleep} from '../../../app/common/util/helpers';
import {Helmet} from 'react-helmet';
import {Category} from '../../../app/models/category';

const CreateCategory = () => {
  const navigate = useNavigate();

  const category = useMemo(() => {
    return new Category({
      displayName: '',
      shortName: '',
      sortOrder: 0,
    });
  }, []);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      const postData = {
        ...values,
      };
      delete postData.image;
      await agent.Categories.create(postData);
      toast.success('Category created!');
      await sleep(500);
      navigate('/manage/categories');
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Create Category</title>
      </Helmet>
      <h1>Create Category</h1>
      <FormCategory
        category={category}
        onSubmit={handleSubmit}
      />
    </>
  );
};


export default CreateCategory;
