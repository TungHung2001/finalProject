import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./PostItem.scss";
import {getImageUrl, getPostUrl, timeToNow} from '../../../app/common/util/helpers';
import {Post} from '../../../app/models/post';

type Props = {
  post: Post;
  imagesType?: "big-thumb" | "mid-thumb" | "small-thumb";
  displayCategory?: boolean;
  layout?: "flex-row" | "flex-col";
  children?: React.ReactNode;
};

const PostItem: React.FC<Props> = ({
  post,
  imagesType = "mid-thumb",
  displayCategory = false,
  layout = "flex-col",
  children,
}) => {
  const cover = post.cover ? getImageUrl(post.cover) : '/assets/no-image.png';

  return (
    <>
      {layout === "flex-col" ? (
        <div className="post-item" data-type={imagesType}>
          <Link to={getPostUrl(post)} className="thumbnail">
            <i style={{ backgroundImage: `url(${cover})` }}/>
          </Link>
          {displayCategory && (
            <Link to="/category/news" className="type">
              News
            </Link>
          )}
          <h3 className="title">
            <Link to={getPostUrl(post)}>{post.title}</Link>
          </h3>
        </div>
      ) : (
        <div className="post-item-d-flex">
          <Link to="/post" className="thumb" title={post.title}>
            <Image src={cover} />
          </Link>
          <div className="info">
            {children ? (
              children
            ) : (
              <>
                {displayCategory && (
                  <Link to="/category/news" className="type">
                    News
                  </Link>
                )}
                <h3 className="title">
                  <Link to={getPostUrl(post)}>{post.title}</Link>
                </h3>
                <span className="intro">{post.shortBody}</span>
                <span className="created-time">{timeToNow(post.createdDate)}</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
