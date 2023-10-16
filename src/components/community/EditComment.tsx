import React, {
  FC,
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { commentService } from 'services/community/commentService'
import { styled } from 'styled-components'
import { Input } from 'styles/reusable-style/elementStyle'
import { Comment } from 'types/community-type/commentType'

interface Props {
  postId: string
  commentId: number
  content: string
  setComments: Dispatch<SetStateAction<Comment[]>>
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const EditComment: FC<Props> = ({
  postId,
  commentId,
  content,
  setComments,
  setEditMode,
}) => {
  const [inputValue, setInputValue] = useState(content)

  const changeInputValuse = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitEditedComments = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await commentService.updateComment({
      postId,
      commentId,
      content: inputValue,
    })
    const editedComment = response.data.content

    setComments((prevState) => {
      const result = prevState.map((item) => {
        if (item.id === commentId) {
          return { ...item, content: editedComment }
        } else {
          return item
        }
      })
      return result
    })
    setEditMode(false)
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

export default EditComment

const StyledForm = styled.form`
  display: flex;
  gap: 10px;
  margin: 20px 0 10px 0;
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
