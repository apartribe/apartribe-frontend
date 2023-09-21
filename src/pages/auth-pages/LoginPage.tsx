import { useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { BsCheckCircle } from 'react-icons/bs'
import AuthLayout from 'components/auth/AuthLayout'
import { Button, Input } from 'styles/reusable-style/elementStyle'
import { KakaoLogin, NaverLogin, GoogleLogin } from 'components/auth/OauthLoginButton'
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  PAGE_FIND_ID,
  PAGE_FIND_PW,
  PAGE_SIGNUP_SELECT,
} from 'constants/auth/path'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <AuthLayout>
      <StyledH>로그인</StyledH>
      <StyledForm>
        <Label>
          이메일
          <Input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </Label>
        <Label>
          비밀번호
          <Input value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        </Label>
        <Button type="submit">로그인</Button>
        <StyledP>
          <BsCheckCircle />
          &nbsp;로그인 상태 유지
        </StyledP>
      </StyledForm>

      <div>
        <Link to={PAGE_FIND_ID}>아이디 찾기</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to={PAGE_FIND_PW}>비밀번호 찾기</Link>
      </div>

      <p className="span 2">간편 로그인/회원가입</p>

      <StyledDiv>
        <StyledLink to={KAKAO_AUTH_URL} className="span 2">
          <KakaoLogin />
        </StyledLink>
        <StyledLink to={NAVER_AUTH_URL}>
          <NaverLogin />
        </StyledLink>
        <StyledLink to={GOOGLE_AUTH_URL}>
          <GoogleLogin />
        </StyledLink>
      </StyledDiv>

      <p>
        아직 회원이 아니라면
        <Link to={PAGE_SIGNUP_SELECT}>
          <StyledSpan>&nbsp;회원가입</StyledSpan>
        </Link>
      </p>
    </AuthLayout>
  )
}

export default LoginPage

const Label = styled.label``

const StyledH = styled.h1`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
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
`

const StyledP = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
`

const StyledSpan = styled.span`
  font-weight: 900;
  font-size: medium;
`
