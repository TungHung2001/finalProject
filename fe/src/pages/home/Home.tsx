import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import adsImage from "../../app/assets/ads-home-top-right.png";
import {Container, Grid, Image} from "semantic-ui-react";
import HomeLoading from "./HomeLoading";
import PostItem from "../posts/category/PostItem";
import {useStore} from '../../app/stores/store';
import {Post} from '../../app/models/post';
import {toast} from 'react-toastify';
import "./HomePage.scss";

const Home = () => {
  const {postStore} = useStore();
  const {getLatestPosts} = postStore;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getLatestPosts().then(data => {
      setPosts(data.slice(0, 12));
    }).catch(() => {
      toast.error('Could not fetch data! Using dummy data!');
    });
  }, [getLatestPosts]);

  if (!posts.length) {
    return <HomeLoading/>;
  }

  const p1 = posts.slice(0, 1);
  const p2 = posts.slice(1, 3);
  const p3 = posts.slice(3, 4);
  const p4 = posts.slice(4, 8);
  const p5 = posts.slice(0, 4);
  const p6 = posts.slice(4, 8);

  return (
    <>
      <Helmet>
        <title>Tech Review - Home page</title>
      </Helmet>
      <Container className="home-page">
        <Grid className="app-section-top">
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <PostItem post={p1[0]} imagesType="big-thumb"/>
            <Grid>
              {p2.map((item, index) => (
                <Grid.Column key={index} computer={8} tablet={8} mobile={16}>
                  <PostItem post={item} imagesType="mid-thumb"/>
                </Grid.Column>
              ))}
            </Grid>
          </Grid.Column>
          <Grid.Column computer={4} tablet={6} mobile={16}>
            <PostItem post={p3[0]} imagesType="big-thumb"/>
            <ul className="list-news-top-right">
              {p4.map((item, index) => (
                <li key={index}>
                  <PostItem post={item} imagesType="small-thumb"/>
                </li>
              ))}
            </ul>
          </Grid.Column>
          <Grid.Column computer={4} tablet={16} mobile={16} className="hidden-mobile hidden-tablet">
            <div className="a-box clickable">
              <Image src={adsImage}/>
            </div>
          </Grid.Column>
        </Grid>

        <div className="app-hot-news">
          <h3 className="label">
            <span>Đáng chú ý</span>
          </h3>
          <Grid>
            {p5.map((item, index) => (
              <Grid.Column computer={4} tablet={8} mobile={16} key={index}>
                <PostItem post={item} displayCategory/>
              </Grid.Column>
            ))}
          </Grid>
        </div>
        <div className="app-section-mid">
          <ul className="list-news">
            {p6.map((item, index) => (
              <li className="news-item" key={index}>
                <PostItem post={item} displayCategory layout="flex-row"/>
              </li>
            ))}
          </ul>
          {/*<div className="wrapper text-center">*/}
          {/*  <button className="load-more-button">*/}
          {/*    <span>Xem thêm</span>*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </Container>
    </>
  );
};

export default Home;
