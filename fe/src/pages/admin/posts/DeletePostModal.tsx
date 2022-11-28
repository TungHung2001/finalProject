import React, {Ref, useCallback, useImperativeHandle, useState} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {Post} from '../../../app/models/post';
import {toast} from 'react-toastify';
import agent from '../../../app/api/agent';

interface IProps {
  onDeleteSuccess: (id: number) => void;
}

export interface IDeletePostModal {
  handleOpen: (post: Post) => void;
}

function DeletePostModal(props: IProps, ref: Ref<any>) {
  const {onDeleteSuccess} = props;
  const [post, setPost] = useState<Post>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = useCallback((post: Post) => {
    setPost(post);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!post?.id) {
      return;
    }
    setIsSubmitting(true);
    try {
      await agent.Posts.delete(post.id);
      toast.info('Deleted!');
      setIsOpen(false);
      onDeleteSuccess(post.id);
    } catch (error) {
      console.error(error);
      toast.error('Error!');
      setIsOpen(false);
    }
    setIsSubmitting(false);
  }, [post, onDeleteSuccess]);

  useImperativeHandle(ref, () => ({
    handleOpen,
  }), [handleOpen]);

  return (
    <Modal
      size="mini"
      open={isOpen}
      onClose={handleClose}
    >
      <Modal.Header>Delete Post</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this post: <strong>{post?.title}</strong>?</p>
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

export default React.forwardRef(DeletePostModal);
