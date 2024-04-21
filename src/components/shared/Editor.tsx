/* eslint-disable @typescript-eslint/no-explicit-any */
import  { Component } from "react";
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const editorConfiguration = {
  fontSize: {
    options: [9, 11, 13, "default", 17, 19, 21],
  },
  extraAllowedContent: "*(*);*{*}",
  //   simpleUpload: {
  //     uploadUrl: `${environment.apiUrl}/file-manager/images`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   },
  removePlugins: ['ImageUpload','ImageInsert','SpecialCharacters'],
  htmlSupport: {
    allow: [
      {
        name: /^(?!script)/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
};

interface EditorProps{
    data: string;
    onChange?: (data:string)=>void;
    onReady?: (editor:any)=>void;
}

class SDEditor extends Component<EditorProps> {
  render() {
    const {data,onChange}  = this.props;
    return (
      // <h1>t</h1>
      <CKEditor
        editor={window.ClassicEditor}
        config={editorConfiguration as any}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(_, editor) => {
          const data = (editor as any).getData();
          onChange && onChange(data);
        }}
      />
    );
  }
}

export default SDEditor;
