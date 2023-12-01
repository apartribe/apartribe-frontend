import { ChangeEvent, MouseEvent, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Button, Input } from 'styles/reusable-style/elementStyle'
import { PAGE_LOGIN } from 'constants/auth/path'
import { FindPwInputValue } from 'types/authType'

type FindPwFormProps = {
  findPw: (e: MouseEvent<HTMLButtonElement>) => void
  inputValue: FindPwInputValue
  setInputValue: Dispatch<SetStateAction<FindPwInputValue>>
}

const FindPwForm = ({ findPw, inputValue, setInputValue }: FindPwFormProps) => {
  const navigate = useNavigate()

  const { email, name } = inputValue

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const cancelFindPw = () => {
    setInputValue({ email: '', name: '' })
    navigate(PAGE_LOGIN)
  }

  return (
    <>
      <h2>비밀번호 찾기</h2>
      <StyledForm>
        <StyledLabel>
          이메일
          <Input
            name="email"
            value={email}
            onChange={changeInputValue}
            placeholder="id@email.com"
          />
        </StyledLabel>
        <StyledLabel>
          이름
          <Input
            name="name"
            value={name}
            onChange={changeInputValue}
            placeholder="이름을 입력하세요"
          />
        </StyledLabel>
        <StyledCancelButton onClick={cancelFindPw}>취소</StyledCancelButton>
        <Button type="submit" onClick={findPw}>
          찾기
        </Button>
      </StyledForm>
    </>
  )
}

export default FindPwForm

const StyledForm = styled.form`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  width: 100%;
  gap: 20px;
  & > * {
    width: 100%;
  }
`

const StyledLabel = styled.label`
  grid-column: span 2;
`

const StyledCancelButton = styled(Button)`
  background: #fff;
  color: #000;
  border: 1px solid #999;
`
