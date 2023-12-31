import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { BsCircle, BsCheckCircle } from 'react-icons/bs'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import AuthLayout from 'components/auth/AuthLayout'
import { Button, Input } from 'styles/reusable-style/elementStyle'
import { NaverLogin } from 'components/auth/OauthLoginButton'
import {
  // GOOGLE_AUTH_URL,
  // KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  PAGE_FIND_PW,
  PAGE_SIGNUP_SELECT,
} from 'constants/auth/path'
import { Message, ResultWithData, SigninInputValue } from 'types/authType'
import { authService } from 'services/auth/authService'
import MessageModal from 'components/common/MessageModal'
import { setLogin } from 'redux/store/userSlice'
import { useDispatch } from 'react-redux'
import { userService } from 'services/auth/userService'

const LoginPage = () => {
  const [inputValue, setInputValue] = useState<SigninInputValue>({
    email: '',
    password: '',
  })

  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password')
  const [isChecked, setIsChecked] = useState<boolean>(true)
  const [isSigninPossible, setIsSigninPossible] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const inputValueList = Object.values(inputValue)
    const inputValueValid = inputValueList.map((item) => item.length !== 0)
    const isAllInputValueValid = inputValueValid.reduce(
      (prev, current) => prev && current,
    )

    setIsSigninPossible(isAllInputValueValid)
  }, [inputValue])

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const changePasswordType = () => {
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const rememberMe = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault()

    setIsChecked((prev) => !prev)
  }

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const submitSigninForm = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { result, message } = await authService.signin(email, password)
    const path: string = result === 'success' ? '/' : ''
    openModal({ status: result, message, goTo: path })

    if (result === 'success') {
      const showMemberResult = await userService.showMember()
      const { result, data } = showMemberResult as ResultWithData

      if (result === 'success') {
        dispatch(setLogin(data))
      }
    }
  }

  const { email, password } = inputValue

  return (
    <AuthLayout>
      <StyledH>로그인</StyledH>
      <StyledForm onSubmit={submitSigninForm}>
        <StyledLabel>
          이메일
          <Input name="email" value={email} onChange={changeInputValue} />
        </StyledLabel>
        <StyledLabel>
          비밀번호
          <StyledPasswordDiv>
            <StyledInput
              type={passwordType}
              name="password"
              value={password}
              onChange={changeInputValue}
            />
            <StyledPasswordSpan id="passwordType" onClick={changePasswordType}>
              {passwordType === 'password' ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </StyledPasswordSpan>
          </StyledPasswordDiv>
        </StyledLabel>
        <StyledButton type="submit" disabled={!isSigninPossible}>
          로그인
        </StyledButton>
        <StyledSpan className="rememberMe" onClick={rememberMe}>
          {isChecked ? <BsCheckCircle size={20} /> : <BsCircle size={20} />}
          로그인 상태 유지
        </StyledSpan>
      </StyledForm>

      <div>
        <StyledNoneStyleLink to={PAGE_FIND_PW}>비밀번호 찾기</StyledNoneStyleLink>
      </div>

      <div className="span 2" style={{ margin: '15px 0' }}>
        <StyledHr />
        간편 로그인/회원가입
        <StyledHr />
      </div>

      <StyledDiv>
        {/* <StyledLink to={KAKAO_AUTH_URL} className="span 2">
          <KakaoLogin />
        </StyledLink> */}
        <StyledLink to={NAVER_AUTH_URL} className="span 2">
          <NaverLogin />
        </StyledLink>
        {/* <StyledLink to={GOOGLE_AUTH_URL}>
          <GoogleLogin />
        </StyledLink> */}
      </StyledDiv>

      <p>
        아직 회원이 아니라면
        <StyledNoneStyleLink to={PAGE_SIGNUP_SELECT}>
          <StyledSpan>&nbsp;회원가입</StyledSpan>
        </StyledNoneStyleLink>
      </p>

      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </AuthLayout>
  )
}

export default LoginPage

const StyledH = styled.h2`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
`

const StyledButton = styled(Button)`
  margin-top: 10px;
`

const StyledLabel = styled.label`
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-size: 15px;
`

const StyledPasswordDiv = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  & > Input {
    grid-column: 1 / span 10;
    grid-row: 1;
  }
`

const StyledInput = styled(Input)`
  padding-right: 40px;
`

const StyledPasswordSpan = styled.span`
  display: flex;
  align-items: center;
  color: #303030;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  grid-column: 10 / span 1;
  grid-row: 1;
`

const StyledDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 10px;
`

const StyledLink = styled(Link)`
  width: 100%;
  height: 50px;
  grid-column: ${(props) => props.className || 'span 1'};
  justify-self: center;
  align-self: center;
  color: black;
`

const StyledSpan = styled.span`
  font-weight: 900;
  font-size: medium;

  &.rememberMe {
    margin: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    font-weight: 700;
    font-size: 15px;
    color: #303030;
    width: fit-content;
  }
`

const StyledNoneStyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const StyledHr = styled.hr`
  display: inline-block;
  width: 200px;
  vertical-align: middle;
  margin: 0 5px;
`
