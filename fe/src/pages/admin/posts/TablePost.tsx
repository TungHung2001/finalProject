import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Header, Image, Loader, Pagination, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {getImageUrl, getPostUrl, getTotalPage} from '../../../app/common/util/helpers';
import DeletePostModal, {IDeletePostModal} from './DeletePostModal';
import {Post} from '../../../app/models/post';
import {Helmet} from 'react-helmet';
import agent from '../../../app/api/agent';

const TablePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const deletePostModal = useRef<IDeletePostModal>();
  const pageSize = 10;

  const getPosts = useCallback((pageNumber: number) => {
    setIsLoading(true);
    agent.Posts.listV2({
      pageNumber,
      pageSize,
    }).then((data) => {
      setIsLoading(false);
      setPosts(data.items);
      setPageNumber(pageNumber);
      setTotalPage(getTotalPage(data.totalItem, pageSize));
    }).catch(error => {
      console.error(error);
      setIsLoading(false);
    });
  }, [pageSize]);

  const onPageChange = useCallback((e: any, data: any) => {
    setPageNumber(data.activePage);
  }, []);

  const handleDelete = useCallback((post: Post) => () => {
    if (!deletePostModal.current) {
      return;
    }
    deletePostModal.current.handleOpen(post);
  }, []);

  const onDeleteSuccess = useCallback((postId: number) => {
    setPosts(v => {
      const newValue = [...v];
      const index = newValue.findIndex(p => p.id === postId);
      if (index >= 0) {
        newValue.splice(index, 1);
      }
      return newValue;
    });
  }, []);

  useEffect(() => {
    getPosts(pageNumber);
  }, [getPosts, pageNumber]);

  return (
    <>
      <Helmet>
        <title>Manage Posts</title>
      </Helmet>
      <Header as="h1">Posts</Header>
      <Table className="--table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} textAlign="center">ID</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="center">Avatar</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            {/*<Table.HeaderCell>Intro</Table.HeaderCell>*/}
            <Table.HeaderCell width={4} textAlign="center">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            isLoading &&
            <Table.Row>
              <Table.Cell colSpan={4}>
                <Loader active inline="centered"/>
              </Table.Cell>
            </Table.Row>
          }
          {
            !isLoading && posts.map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell singleLine textAlign="center">{post.id}</Table.Cell>
                <Table.Cell singleLine textAlign="center">
                  {
                    !!post.cover && post.cover.includes('.') ? (
                      <Image src={getImageUrl(post.cover)}/>
                    ) : (
                      <Image src="/assets/no-image.png"/>
                    )
                  }
                </Table.Cell>
                <Table.Cell>
                  <Link to={getPostUrl(post)} target="_blank">{post.title}</Link>
                </Table.Cell>
                {/*<Table.Cell singleLine>{post.shortBody}</Table.Cell>*/}
                <Table.Cell textAlign="center">
                  <Link to={`/manage/posts/${post.id}`}><Button>Edit</Button></Link>
                  <Button onClick={handleDelete(post)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
      <div className="d-flex justify-content-space-between mb-20">
        <Link to={`/manage/posts/create`}><Button primary>Create new post</Button></Link>
        <Pagination activePage={pageNumber} totalPages={totalPage} onPageChange={onPageChange}/>
      </div>
      <DeletePostModal ref={deletePostModal} onDeleteSuccess={onDeleteSuccess}/>
    </>
  );
};

export default TablePost;
