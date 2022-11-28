import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Header, Loader, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import DeleteCategoryModal, {IDeleteCategoryModal} from './DeleteCategoryModal';
import {Helmet} from 'react-helmet';
import {Category} from '../../../app/models/category';
import {useStore} from '../../../app/stores/store';

const TableCategory = () => {
  const {categoryStore} = useStore();
  const {getCategories} = categoryStore;
  const [categories, setCategories] = useState<Category[]>([]);
  const deleteCategoryModal = useRef<IDeleteCategoryModal>();

  useEffect(() => {
    getCategories(true).then((data) => {
      setCategories(data);
    }).catch(error => {
      console.error(error);
      setCategories([]);
    });
  }, [getCategories]);

  const handleDelete = useCallback((category: Category) => () => {
    if (!deleteCategoryModal.current) {
      return;
    }
    deleteCategoryModal.current.handleOpen(category);
  }, []);

  const onDeleteSuccess = useCallback((categoryId: number) => {
    setCategories(v => {
      const newValue = [...v];
      const index = newValue.findIndex(c => c.categoryId === categoryId);
      if (index >= 0) {
        newValue.splice(index, 1);
      }
      return newValue;
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Categories</title>
      </Helmet>
      <Header as="h1">Categories</Header>
      <Table className="--table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2} textAlign="center">ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Sort order</Table.HeaderCell>
            <Table.HeaderCell width={4} textAlign="center">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            !categories.length &&
            <Table.Row>
              <Table.Cell colSpan={3}>
                <Loader active inline="centered"/>
              </Table.Cell>
            </Table.Row>
          }
          {
            categories.map((category) => (
              <Table.Row key={category.categoryId}>
                <Table.Cell singleLine textAlign="center">{category.categoryId}</Table.Cell>
                <Table.Cell>
                  <Link to={category.getUrl()} target="_blank">{category.displayName}</Link>
                </Table.Cell>
                <Table.Cell singleLine textAlign="center">{category.sortOrder}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Link to={category.getEditUrl()}><Button>Edit</Button></Link>
                  <Button onClick={handleDelete(category)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
      <div className="d-flex justify-content-space-between mb-20">
        <Link to={`/manage/categories/create`}><Button primary>Create new category</Button></Link>
      </div>
      <DeleteCategoryModal ref={deleteCategoryModal} onDeleteSuccess={onDeleteSuccess}/>
    </>
  );
};

export default TableCategory;
