import {useNavigate} from "react-router-dom";
import FormPost from "./FormPost";
import React, {useCallback, useMemo} from 'react';
import agent from '../../../app/api/agent';
import {toast} from 'react-toastify';
import {getInnerText, sleep} from '../../../app/common/util/helpers';
import {Helmet} from 'react-helmet';

const CreatePost = () => {
  const navigate = useNavigate();

  const post = useMemo(() => ({
    title: '',
    cover: '',
    shortBody: '',
    fullBody: '',
  }), []);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      const postData = {
        ...values,
        innerText: `${values.title}. ${getInnerText(values.fullBody)}`.toLowerCase(),
      };
      if (values.image) {
        const {data: cover} = await agent.Photos.uploadPostPhoto({
          file: values.image,
        });
        postData.cover = cover || undefined;
      }
      delete postData.image;
      await agent.Posts.create(postData);
      toast.success('Post created!');
      await sleep(500);
      navigate('/manage/posts');
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Create Post</title>
      </Helmet>
      <h1>Create Post</h1>
      <FormPost
        post={post}
        onSubmit={handleSubmit}
      />
    </>
  );
};


export default CreatePost;
