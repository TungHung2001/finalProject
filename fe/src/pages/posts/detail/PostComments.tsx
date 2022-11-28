import React, { useCallback, useEffect, useRef, useState } from "react"
import { INote } from "../../../app/models/note"
import CommentList from "./CommentList"
import CommentBox from "./CommentBox"
import agent from "../../../app/api/agent"
import { useStore } from "../../../app/stores/store"
import { Segment } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

interface IProps {
  postId: number
}

export interface IPostCommentItem extends INote {
  localId?: string
  error?: any
}

function PostComments(props: IProps) {
  const { postId } = props
  const [comments, setComments] = useState<IPostCommentItem[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const {
    userStore: { isLoggedIn, user },
  } = useStore()
  const formRef = useRef<any>(null)

  const getComments = useCallback(() => {
    agent.Notes.list({
      postId,
      pageNumber: 1,
      pageSize: 50,
    })
      .then((data) => {
        setComments(data)
        setIsLoaded(true)
      })
      .catch((error) => {
        console.error(error)
        setIsLoaded(true)
      })
  }, [postId])

  const handleSubmit = useCallback(
    async (values: INote) => {
      const postData = {
        content: values.content,
        postId,
      }
      const c = {
        ...postData,
        userName: user?.displayName,
      }
      const updateComment = (data: any) => {
        setComments((prevValue) => {
          const value = [...prevValue]
          const index = value.findIndex((item) => item === c)
          if (index >= 0) {
            value[index] = {
              ...value[index],
              ...data,
            }
          }
          return value
        })
      }
      setComments((prevValue) => {
        return [c, ...prevValue]
      })
      if (formRef.current?.resetForm) {
        formRef.current.resetForm()
      }
      agent.Notes.create(postData, postId)
        .then((res) => {
          if (!res) {
            updateComment({
              error: new Error(),
            })
          } else {
            updateComment(res)
          }
        })
        .catch((error) => {
          console.error(error)
          updateComment({ error })
        })
    },
    [postId, user]
  )

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <Segment clearing className="mb-20">
      <h2>Comment</h2>
      {isLoggedIn && (
        <CommentBox handleSubmit={handleSubmit} formRef={formRef} />
      )}
      {!isLoggedIn && !!comments.length && (
        <p className="no-comments">
          Please <NavLink to="/login">login</NavLink> to comment!
        </p>
      )}
      {!isLoggedIn && !comments.length && (
        <p className="no-comments">
          there is no comment! Please <NavLink to="/login">login</NavLink> to
          comment!
        </p>
      )}
      {isLoggedIn && !comments.length && (
        <p>No comments yet! Be the first to comment on this post!</p>
      )}
      {isLoaded && <CommentList comments={comments} />}
    </Segment>
  )
}

export default React.memo(PostComments)
