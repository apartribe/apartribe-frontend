import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Button } from 'styles/reusable-style/elementStyle'
import AuthLayout from 'components/auth/AuthLayout'
import { KakaoLogin, NaverLogin, GoogleLogin } from 'components/auth/OauthLoginButton'
import {
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  PAGE_LOCAL_SIGNUP,
  PAGE_LOGIN,
} from 'constants/auth/path'

const SignupSelectPage = () => {
  const navigate = useNavigate()

  const GoToLocalSignupPage = () => {
    navigate(PAGE_LOCAL_SIGNUP)
  }

  return (
    <AuthLayout>
      <StyledH>회원가입</StyledH>
      <StyledDiv>
        <StyledLink to={KAKAO_AUTH_URL} className="span 3">
          <KakaoLogin />
        </StyledLink>
        <StyledLink to={NAVER_AUTH_URL}>
          <NaverLogin />
        </StyledLink>
        <StyledLink to={GOOGLE_AUTH_URL}>
          <GoogleLogin />
        </StyledLink>
        <Button
          onClick={GoToLocalSignupPage}
          $letterSpacing="normal"
          $fontWeight="normal"
        >
          이메일로 시작하기
        </Button>
      </StyledDiv>

      <p>
        이미 계정이 있다면
        <Link to={PAGE_LOGIN}>
          <StyledSpan>&nbsp;로그인</StyledSpan>
        </Link>
      </p>
    </AuthLayout>
  )
}

export default SignupSelectPage

const StyledH = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`

const StyledDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
const StyledSpan = styled.span`
  font-weight: 900;
  font-size: medium;
`
