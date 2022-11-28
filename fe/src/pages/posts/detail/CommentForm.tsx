import { Form, Formik, FormikHelpers } from "formik"
import React from "react"
import { Button } from "semantic-ui-react"
import * as Yup from "yup"
import { INote } from "../../../app/models/note"
import MyTextArea from "../../../app/common/form/MyTextInputArea"

const validationSchema = Yup.object({
  content: Yup.string().required("The content is required"),
})

interface IProps {
  comment: INote
  formRef?: any

  onSubmit(values: INote, action: FormikHelpers<INote>): void
}

const CommentForm = (props: IProps) => {
  const { comment, onSubmit, formRef } = props

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={comment}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form
            className="ui form"
            onSubmit={handleSubmit}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.altKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          >
            <MyTextArea name="content" rows={3} useAltEnter={true} />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Enter"
            />
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CommentForm
