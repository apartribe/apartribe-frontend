import React, {
  FC,
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { useParams } from 'react-router-dom'
import { commentService } from 'services/community/commentService'
import { styled } from 'styled-components'
import { Input } from 'styles/reusable-style/elementStyle'
import { Comment } from 'types/community-type/commentType'
import { toast } from 'react-toastify'

interface Props {
  parentId: number
  commentId: number
  content: string
  setComments: Dispatch<SetStateAction<Comment[]>>
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const EditReply: FC<Props> = ({
  parentId,
  commentId,
  content,
  setComments,
  setEditMode,
}) => {
  const { aptId, postId } = useParams()

  const [inputValue, setInputValue] = useState(content)

  const changeInputValuse = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitEditedComments = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await commentService.updateComment({
      aptId: aptId as string,
      postId: postId as string,
      commentId,
      content: inputValue,
    })
    const editedReply = response.data.content

    if (editedReply) {
      setComments((prevState) => {
        const result = prevState.map((item) => {
          if (item.commentId === parentId) {
            const test = item.children.map((item) => {
              if (item.commentId === commentId) {
                return { ...item, content: editedReply }
              } else {
                return item
              }
            })
            return { ...item, children: test }
          } else {
            return item
          }
        })
        return result
      })
    }
    toast.success('답글이 수정 되었습니다.')
    setEditMode(false)
    setInputValue('')
  }

  return (
    <StyledForm onSubmit={submitEditedComments}>
      <Input
        type="text"
        placeholder="내용을 입력하세요."
        value={inputValue}
        onChange={changeInputValuse}
      />
      <StyledButton type="button" onClick={() => setEditMode(false)}>
        취소
      </StyledButton>
      <StyledButton type="submit">수정</StyledButton>
    </StyledForm>
  )
}

export default EditReply

const StyledForm = styled.form`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`

const StyledButton = styled.button`
  box-sizing: border-box;
  background: #ffffff;
  height: 50px;
  width: 100px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &.mini {
    border: none;
    height: 15px;
    width: 25px;
    padding: 0px;
    font-size: 12px;
    color: #303030;
    margin-bottom: 25px;
  }

  &:hover {
    transform: scale(1.05);
  }
`
