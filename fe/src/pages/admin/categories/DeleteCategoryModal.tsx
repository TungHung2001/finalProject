import React, {Ref, useCallback, useImperativeHandle, useState} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {toast} from 'react-toastify';
import agent from '../../../app/api/agent';
import {Category} from '../../../app/models/category';

interface IProps {
  onDeleteSuccess: (id: number) => void;
}

export interface IDeleteCategoryModal {
  handleOpen: (category: Category) => void;
}

function DeleteCategoryModal(props: IProps, ref: Ref<any>) {
  const {onDeleteSuccess} = props;
  const [category, setCategory] = useState<Category>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = useCallback((category: Category) => {
    setCategory(category);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!category?.categoryId) {
      return;
    }
    setIsSubmitting(true);
    try {
      await agent.Categories.delete(category.categoryId);
      toast.info('Deleted!');
      setIsOpen(false);
      onDeleteSuccess(category.categoryId);
    } catch (error) {
      console.error(error);
      toast.error('Error!');
      setIsOpen(false);
    }
    setIsSubmitting(false);
  }, [category, onDeleteSuccess]);

  useImperativeHandle(ref, () => ({
    handleOpen,
  }), [handleOpen]);

  return (
    <Modal
      size="mini"
      open={isOpen}
      onClose={handleClose}
    >
      <Modal.Header>Delete Category</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this category: <strong>{category?.shortName}</strong>?</p>
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

export default React.forwardRef(DeleteCategoryModal);
