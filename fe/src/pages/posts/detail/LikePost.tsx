import React, { useCallback, useState } from "react"
import { Post } from "../../../app/models/post"
import { useStore } from "../../../app/stores/store"
import { Icon } from "semantic-ui-react"
import agent from "../../../app/api/agent"
import { toast } from "react-toastify"

interface IProps {
  post: Post
}

function LikePost(props: IProps) {
  const { post } = props
  const {
    userStore: { isLoggedIn },
  } = useStore()
  const postId = post.id || 0
  const [likeCount, setLikeCount] = useState(post.likeCount || 0)
  const [likeValue, setLikeValue] = useState(post.likeValue || 0)

  const toggleLike = useCallback(() => {
    const data = {
      id: postId,
      likeValue: likeValue < 1 ? 1 : -1,
    }
    agent.Posts.like(postId, data)
      .then(() => {
        setLikeCount((prevValue) => {
          return prevValue + data.likeValue
        })
        setLikeValue(data.likeValue)
      })
      .catch((error) => {
        console.error(error)
        toast.error(title)
      })
  }, [likeValue, postId])

  let title = `${likeCount} người thích bài viết này`

  if (!isLoggedIn) {
    title = "Please login to like this post!"
  }

  return (
    <div className="like-stats" title={title} onClick={toggleLike}>
      <Icon
        name={likeValue > 0 ? "heart" : "heart outline"}
        size="large"
        className={isLoggedIn ? "" : "disabled"}
      />
      <div className="speech-bubble">{likeCount}</div>
    </div>
  )
}

export default React.memo(LikePost)
