import React, {useEffect, useMemo, useState} from "react";
import {Breadcrumb, Container, Icon, Loader} from "semantic-ui-react";
import Related from "./Related";
import agent from "../../../app/api/agent";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Post} from "../../../app/models/post";
import {Helmet} from "react-helmet";
import PostComments from './PostComments';
import LikePost from './LikePost';
import "./PostDetail.scss";
import {formatDate, timeToNow} from '../../../app/common/util/helpers';

const PostDetail = () => {
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  const slug = params?.slug || "";
  const id = parseInt(slug.split("-").pop() || '');

  useEffect(() => {
    if (!id) {
      return;
    }
    setPost(null);
    agent.Posts.detail(id)
    .then((data) => {
      setPost(data);
    })
    .catch((error) => {
      console.error(error);
      navigate("/not-found");
    });
  }, [id]);

  const sections = useMemo(() => {
    const list: any[] = [];
    if (post?.categories?.length) {
      const c = post.categories[0];
      list.push({
        key: c,
        content: c,
        link: false,
      });
    }
    return list;
  }, [post]);

  return (
    <div className="post-detail-page">
      <Container>
        {!post && <Loader active inline="centered"/>}
        {!!post && (
          <>
            <Helmet>
              <title>{post.title}</title>
            </Helmet>
            <div className="post-detail-content-wrapper">
              <div className="breadcrumb-wrapper">
                <Breadcrumb>
                  <Breadcrumb.Section><Link to="/">Home page</Link></Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle"/>
                  {
                    sections.map((item) => (
                      <Breadcrumb.Section key={item.key}>{item.content}</Breadcrumb.Section>
                    ))
                  }
                </Breadcrumb>
              </div>

              <div className="post-detail-header">
                <div className="meta">
                  <span className="author">{post.editor || 'Admin'}, </span>
                  <span className="time" title={formatDate(post.createdDate)}>
                      <Icon disabled name="clock outline"/>{timeToNow(post.createdDate)}
                    </span>
                </div>
                <LikePost post={post}/>
              </div>
              <h1 className="pt-10">{post.title}</h1>
              <div className="post-detail-content">
                <div className="share-menu">
                  <div className="share-icon facebook">
                    <Icon name="facebook f"/>
                  </div>
                  <div className="share-icon email">
                    <Icon name="mail outline"/>
                  </div>
                </div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{__html: post.fullBody}}
                />
              </div>
              <div className="post-comments">
                {
                  !!post.id &&
                  <PostComments postId={post.id}/>
                }
              </div>
              <Related postId={id}/>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default PostDetail;
