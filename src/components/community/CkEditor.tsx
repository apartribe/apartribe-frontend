import React, { Component, Dispatch, SetStateAction } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import 'styles/ckeditor.css'

interface Props {
  setInputValue: Dispatch<
    SetStateAction<{
      category: string
      protected: boolean
      title: string
      content: string
    }>
  >
}

class CkEditor extends Component<Props> {
  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
        // data="<p>Hello from CKEditor&nbsp;5!</p>" // 초기값. 필요시 주석 해제
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
          this.props.setInputValue((prevState) => ({ ...prevState, content: data }))
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />
    )
  }
}

export default CkEditor
