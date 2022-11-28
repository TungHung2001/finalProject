import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  image,
  lineHeight,
  link,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  video,
} from "suneditor/src/plugins";
import {useField} from 'formik';

interface Props {
  name: string;
}

const MySunEditor = (props: Props) => {
  const [, meta, helpers] = useField(props.name);

  const {initialValue} = meta;
  const {setValue} = helpers;

  return (
    <>
      <SunEditor
        autoFocus={false}
        lang="en"
        defaultValue={initialValue}
        setOptions={{
          showPathLabel: false,
          minHeight: "50vh",
          maxHeight: "50vh",
          placeholder: "Enter your text here!!!",
          plugins: [
            align,
            font,
            fontColor,
            fontSize,
            formatBlock,
            hiliteColor,
            horizontalRule,
            lineHeight,
            list,
            paragraphStyle,
            table,
            template,
            textStyle,
            image,
            link,
            video,
          ],
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor"],
            ["removeFormat"],
            "/", // Line break
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video"],
          ],
          formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
          font: [
            "Arial",
            "Calibri",
            "Comic Sans",
            "Courier",
            "Garamond",
            "Georgia",
            "Impact",
            "Lucida Console",
            "Palatino Linotype",
            "Segoe UI",
            "Tahoma",
            "Times New Roman",
            "Trebuchet MS",
          ],
        }}
        onChange={setValue}
      />
    </>
  );
};

export default MySunEditor;
