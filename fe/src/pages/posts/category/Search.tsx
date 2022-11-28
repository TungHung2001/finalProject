import React, { useCallback, useEffect, useRef, useState } from "react"
import { Container, Grid, Image, Loader } from "semantic-ui-react"
import { Helmet } from "react-helmet"
import PostItem from "./PostItem"
import adsRightImage2 from "../../../app/assets/ads-top-right.png"
import adsRightImage from "../../../app/assets/ads-home-top-right.png"
import { Link, useSearchParams } from "react-router-dom"
import agent from "../../../app/api/agent"
import { getPostUrl, getTotalPage } from "../../../app/common/util/helpers"
import "./PostCategory.scss"

const Search = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [search] = useSearchParams()
  const keyword = search.get("q") || undefined
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const pageSize = 10
  const requestIdRef = useRef<number>(0)

  const getPosts = useCallback(
    (pageNumber: number) => {
      setIsLoading(true)
      const requestId = requestIdRef.current + 1
      requestIdRef.current = requestId
      agent.Posts.listV2({
        pageNumber,
        pageSize,
        keyword: keyword?.toLowerCase(),
      })
        .then((data) => {
          if (requestIdRef.current !== requestId) {
            return
          }
          setIsLoading(false)
          if (pageNumber > 1) {
            setPosts((v) => [...v, ...data.items])
          } else {
            setPosts(data.items)
          }
          setPageNumber(pageNumber)
          setTotalItems(data.totalItem)
          setTotalPage(getTotalPage(data.totalItem, pageSize))
        })
        .catch((error) => {
          console.error(error)
          if (requestIdRef.current !== requestId) {
            return
          }
          setIsLoading(false)
        })
    },
    [keyword, pageSize]
  )

  const loadMore = useCallback(() => {
    setPageNumber((v) => v + 1)
  }, [])

  useEffect(() => {
    setPosts([])
    setPageNumber(1)
  }, [keyword])

  useEffect(() => {
    getPosts(pageNumber)
  }, [getPosts, pageNumber])

  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <Container className="category-page">
        <Grid>
          <Grid.Column computer={12} tablet={12} mobile={16}>
            <h1 className="app-post-label">
              <span>Search {`"${keyword}"`}</span>
            </h1>
            {!isLoading && <p>there are {totalItems} results founded.</p>}
            {!!posts.length && (
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
                          <span className="created-time">2022-11-09</span>
                        </span>
                        <span className="intro">{item.shortBody}</span>
                      </PostItem>
                    </li>
                  ))}
                </ul>
                {isLoading && (
                  <div className="pt-10 pb-20">
                    <Loader active inline="centered" />
                  </div>
                )}
                {totalPage > pageNumber && !isLoading && (
                  <div className="wrapper text-center">
                    <button className="load-more-button" onClick={loadMore}>
                      <span>Load More</span>
                    </button>
                  </div>
                )}
              </>
            )}
            {!posts.length && isLoading && <Loader active inline="centered" />}
          </Grid.Column>
          <Grid.Column computer={4} tablet={4} mobile={16}>
            <div className="a-box clickable pb-20">
              <Image src={adsRightImage} />
            </div>
            <div className="a-box clickable  pb-20">
              <Image src={adsRightImage2} />
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}

export default Search
