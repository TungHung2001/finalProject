import React, { useEffect, useState } from "react"
import { Grid, Loader } from "semantic-ui-react"
import { dummyPosts } from "../../../dummy/posts"
import agent from "../../../app/api/agent"
import PostItem from "../category/PostItem"

interface Props {
  postId: number
}

function Related(props: Props) {
  const [posts, setPosts] = useState<any[]>([])
  const { postId } = props

  useEffect(() => {
    agent.Posts.list({
      pageNumber: 1,
      pageSize: 5,
    })
      .then((data) => {
        setPosts(data.filter((p) => p.id != postId).slice(0, 4))
      })
      .catch((error) => {
        console.error(error)
        setPosts([...dummyPosts])
      })
  }, [postId])

  if (!posts.length) {
    return (
      <div className="pb-10">
        <Loader active inline="centered" />
      </div>
    )
  }

  return (
    <div className="related">
      <h1 className="app-post-label">
        <span>Related posts</span>
      </h1>
      <Grid>
        {posts.map((item, index) => (
          <Grid.Column computer={4} tablet={8} mobile={16} key={index}>
            <PostItem post={item} displayCategory />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  )
}

export default React.memo(Related)
