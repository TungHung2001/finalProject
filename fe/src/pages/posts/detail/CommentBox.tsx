import React, {useMemo} from 'react';
import CommentForm from './CommentForm';
import {INote, Note} from '../../../app/models/note';

interface IProps {
  formRef: any;
  handleSubmit: (values: INote) => {};
}

function CommentBox(props: IProps) {
  const {formRef, handleSubmit} = props;

  const comment = useMemo(() => {
    return new Note();
  }, []);

  return (
    <div className="comment-box clearfix mb-20">
      <CommentForm
        formRef={formRef}
        comment={comment}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default React.memo(CommentBox);
