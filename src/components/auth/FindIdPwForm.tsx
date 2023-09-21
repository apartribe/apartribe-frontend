import { ChangeEvent, MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Button, Input } from 'styles/reusable-style/elementStyle'
import { PAGE_FIND_ID, PAGE_FIND_PW, PAGE_LOGIN } from 'constants/auth/path'
import { FindIdPwInputValue } from 'types/auth'

type FindIdPwFormProps = {
  findWhat: string
  find: (e: MouseEvent<HTMLButtonElement>) => void
}

const FindIdPwForm = ({ findWhat, find }: FindIdPwFormProps) => {
  const [inputValue, setInputValue] = useState<FindIdPwInputValue>({
    email: '',
    name: '',
  })

  const navigate = useNavigate()

  const goToFindIdPage = () => {
    navigate(PAGE_FIND_ID)
  }
  const goToFindPwPage = () => {
    navigate(PAGE_FIND_PW)
  }

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const cancelFind = () => {
    setInputValue({ email: '', name: '' })
    navigate(PAGE_LOGIN)
  }

  return (
    <>
      <StyledDiv>
        <StyledButton id="id" onClick={goToFindIdPage} disabled={findWhat === 'id'}>
          아이디 찾기
        </StyledButton>
        <StyledButton
          id="password"
          onClick={goToFindPwPage}
          disabled={findWhat === 'password'}
        >
          비밀번호 찾기
        </StyledButton>
      </StyledDiv>

      <StyledForm>
        <StyledLabel>
          이메일
          <Input
            name="email"
            value={inputValue.email}
            onChange={changeInputValue}
            placeholder="id@email.com"
          />
        </StyledLabel>
        <StyledLabel>
          이름
          <Input
            name="name"
            value={inputValue.name}
            onChange={changeInputValue}
            placeholder="이름을 입력하세요"
          />
        </StyledLabel>
        <StyledCancelButton onClick={cancelFind}>취소</StyledCancelButton>
        <Button type="submit" onClick={find}>
          {(findWhat === 'id' && '아이디') || (findWhat === 'password' && '비밀번호')}{' '}
          찾기
        </Button>
      </StyledForm>
    </>
  )
}

export default FindIdPwForm

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  background: #f2f2f2;
  padding: 5px;
  margin-bottom: 20px;
`

const StyledButton = styled(Button)`
  font-weight: normal;
  letter-spacing: normal;
  color: #000;
  background: #f2f2f2;
  &:disabled {
    background: #fff;
    cursor: auto;
  }
`

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
