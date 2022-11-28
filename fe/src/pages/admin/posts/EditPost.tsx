import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Post} from '../../../app/models/post';
import agent from '../../../app/api/agent';
import {toast} from 'react-toastify';
import {Header, Placeholder} from 'semantic-ui-react';
import FormPost from './FormPost';
import {getInnerText, sleep} from '../../../app/common/util/helpers';
import {Helmet} from 'react-helmet';

const EditPost = () => {
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '');

  useEffect(() => {
    if (!id) {
      return;
    }
    agent.Posts.detail(id).then(res => {
      setPost(res);
    }).catch((error) => {
      console.error(error);
      toast.error('Could not get post detail!');
    });
  }, [id]);

  const handleSubmit = useCallback(async (values: any) => {
    try {
      const postData = {
        ...post,
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
      await agent.Posts.update(postData);
      toast.success('Post updated!');
      await sleep(500);
      navigate('/manage/posts');
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    }
  }, [post, navigate]);

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Edit Post</title>
        </Helmet>
        <Header as="h1">Edit post</Header>
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
        <title>Edit Post</title>
      </Helmet>
      <Header as="h1">Edit post</Header>
      <FormPost
        post={post}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditPost;
