import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Header, Loader, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import agent from '../../../app/api/agent';
import {User} from '../../../app/models/user';
import DeleteUserModal, {IDeleteUserModal} from './DeleteUserModal';

const TableUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const deleteUserModal = useRef<IDeleteUserModal>();

  useEffect(() => {
    agent.Account.list().then((data) => {
      const list: User[] = [];
      data.forEach(item => {
        list.push(new User(item));
      });
      setUsers(list);
    }).catch(error => {
      console.error(error);
      setUsers([]);
    });
  }, []);

  const handleDelete = useCallback((user: User) => () => {
    if (!deleteUserModal.current) {
      return;
    }
    deleteUserModal.current.handleOpen(user);
  }, []);

  const onDeleteSuccess = useCallback((userId: string) => {
    setUsers(v => {
      const newValue = [...v];
      const index = newValue.findIndex(c => c.userId === userId);
      if (index >= 0) {
        newValue.splice(index, 1);
      }
      return newValue;
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <Header as="h1">Users</Header>
      <Table className="--table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} textAlign="center">STT</Table.HeaderCell>
            {/*<Table.HeaderCell>Username</Table.HeaderCell>*/}
            <Table.HeaderCell>Full name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            {/*<Table.HeaderCell>Intro</Table.HeaderCell>*/}
            <Table.HeaderCell width={4} textAlign="center">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            !users.length &&
            <Table.Row>
              <Table.Cell colSpan={5}>
                <Loader active inline="centered"/>
              </Table.Cell>
            </Table.Row>
          }
          {
            users.map((user, index) => (
              <Table.Row key={user.userId}>
                <Table.Cell singleLine textAlign="center">{index + 1}</Table.Cell>
                {/*<Table.Cell>{user.username}</Table.Cell>*/}
                <Table.Cell>{user.displayName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Link to={user.getEditUrl()}><Button>Edit</Button></Link>
                  <Button onClick={handleDelete(user)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
      <DeleteUserModal ref={deleteUserModal} onDeleteSuccess={onDeleteSuccess}/>
      <div className="d-flex justify-content-space-between mb-20">
        <Link to={`/manage/users/add`}><Button primary>Add user</Button></Link>
      </div>
    </>
  );
};

export default TableUsers;
