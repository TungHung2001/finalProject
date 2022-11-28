import React, {useCallback, useEffect, useRef, useState} from "react";
import {Container, Grid, Image, Loader} from "semantic-ui-react";
import {Helmet} from 'react-helmet';
import PostItem from "./PostItem";
import adsRightImage2 from "../../../app/assets/ads-top-right.png";
import adsRightImage from "../../../app/assets/ads-home-top-right.png";
import {Link, useParams} from "react-router-dom";
import agent from '../../../app/api/agent';
import {getPostUrl, getTotalPage, timeToNow} from '../../../app/common/util/helpers';
import {Category} from '../../../app/models/category';
import {useStore} from '../../../app/stores/store';
import "./PostCategory.scss";

const PostCategory = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [category, setCategory] = useState<Category | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const slug = params?.slug || "";
  const id = parseInt(slug.split("-").pop() || '');
  const {categoryStore: {getCategory}} = useStore();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const pageSize = 10;
  const requestIdRef = useRef<number>(0);

  const getPosts = useCallback((pageNumber: number) => {
    setIsLoading(true);
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    agent.Posts.listV2({
      pageNumber,
      pageSize,
      categoryId: id,
    }).then((data) => {
      if (requestIdRef.current !== requestId) {
        return;
      }
      setIsLoading(false);
      if (pageNumber > 1) {
        setPosts(v => [...v, ...data.items]);
      } else {
        setPosts(data.items);
      }
      setPageNumber(pageNumber);
      setTotalPage(getTotalPage(data.totalItem, pageSize));
    }).catch(error => {
      console.error(error);
      if (requestIdRef.current !== requestId) {
        return;
      }
      setIsLoading(false);
    });
  }, [id, pageSize]);

  const loadMore = useCallback(() => {
    setPageNumber(v => v + 1);
  }, []);

  useEffect(() => {
    setPosts([]);
    setPageNumber(1);
  }, [id]);

  useEffect(() => {
    getPosts(pageNumber);
  }, [getPosts, pageNumber]);

  useEffect(() => {
    getCategory(id)
    .then(setCategory)
    .catch((error) => {
      console.error(error);
    });
  }, [id, getCategory]);

  return (
    <>
      {
        !!category &&
        <Helmet>
          <title>{category.displayName}</title>
        </Helmet>
      }
      <Container className="category-page">
        <Grid>
          <Grid.Column computer={12} tablet={12} mobile={16}>
            <h1 className="app-post-label">
              <span>{category?.displayName}</span>
            </h1>
            {
              !!posts.length &&
              <>
                <ul className="list-post">
                  {posts.map((item) => (
                    <li key={item.id}>
                      <PostItem post={item} layout="flex-row">
                        {/* Post info */}
                        <h3 className="title">
                          <Link to={getPostUrl(item)}>{item.title}</Link>
                        </h3>
                        <span className="note">
                        <Link to="/category/news" className="type">
                          News
                        </Link>
                        <em>-</em>
                        <span className="created-time">{timeToNow(item.createdDate)}</span>
                      </span>
                        <span className="intro">{item.shortBody}</span>
                      </PostItem>
                    </li>
                  ))}
                </ul>
                {
                  isLoading &&
                  <div className="pt-10 pb-20">
                    <Loader active inline="centered"/>
                  </div>
                }
                {
                  totalPage > pageNumber && !isLoading &&
                  <div className="wrapper text-center">
                    <button className="load-more-button" onClick={loadMore}>
                      <span>Load More</span>
                    </button>
                  </div>
                }
              </>
            }
            {
              !posts.length && isLoading &&
              <Loader active inline="centered"/>
            }
          </Grid.Column>
          <Grid.Column computer={4} tablet={4} mobile={16}>
            <div className="a-box clickable pb-20">
              <Image src={adsRightImage}/>
            </div>
            <div className="a-box clickable  pb-20">
              <Image src={adsRightImage2}/>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default PostCategory;
