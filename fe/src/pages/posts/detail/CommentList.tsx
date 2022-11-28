import React from "react"
import { IPostCommentItem } from "./PostComments"
import { Comment } from "semantic-ui-react"
import { timeToNow } from "../../../app/common/util/helpers"
import "./CommentList.scss"

interface IProps {
  comments: IPostCommentItem[]
}

function CommentList(props: IProps) {
  const { comments } = props

  return (
    <div className="comment-list">
      <Comment.Group>
        {comments.map((item, index) => (
          <Comment
            key={item.id || `index-${index}`}
            className={!!item.error ? "has-error" : ""}
          >
            <Comment.Avatar src="/assets/user.png" />
            <Comment.Content>
              <Comment.Author as="a">{item.userName}</Comment.Author>
              <Comment.Metadata>
                <div className="created-time">
                  {timeToNow(item.createdDate, true)}
                </div>
                {!!item.error && (
                  <div
                    className="has-error-icon"
                    title="Error not submit comment successfully"
                  >
                    !
                  </div>
                )}
              </Comment.Metadata>
              <Comment.Text>{item.content}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </div>
  )
}

export default React.memo(CommentList)
