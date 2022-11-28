import React, {Ref, useCallback, useImperativeHandle, useState} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import agent from '../../../app/api/agent';
import {User} from '../../../app/models/user';

interface IProps {
  onDeleteSuccess: (id: string) => void;
}

export interface IDeleteUserModal {
  handleOpen: (user: User) => void;
}

function DeleteUserModal(props: IProps, ref: Ref<any>) {
  const {onDeleteSuccess} = props;
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = useCallback((user: User) => {
    setUser(user);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!user?.userId) {
      return;
    }
    setIsSubmitting(true);
    try {
      await agent.Account.deleteUser(user);
      toast.info('Deleted!');
      setIsOpen(false);
      onDeleteSuccess(user.userId);
    } catch (error) {
      console.error(error);
      toast.error('Error!');
      setIsOpen(false);
    }
    setIsSubmitting(false);
  }, [user, onDeleteSuccess]);

  useImperativeHandle(ref, () => ({
    handleOpen,
  }), [handleOpen]);

  return (
    <Modal
      size="mini"
      open={isOpen}
      onClose={handleClose}
    >
      <Modal.Header>Delete User</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this user: <strong>{user?.email}</strong>?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleClose}>
          No
        </Button>
        <Button positive onClick={handleConfirm} loading={isSubmitting}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default React.forwardRef(DeleteUserModal);
