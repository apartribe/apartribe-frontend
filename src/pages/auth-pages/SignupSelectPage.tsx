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
        <StyledLink href={KAKAO_AUTH_URL} className="span 3">
          <KakaoLogin />
        </StyledLink>
        {/* <StyledLink to={NAVER_AUTH_URL}>
          <NaverLogin />
        </StyledLink>
        <StyledLink to={GOOGLE_AUTH_URL}>
          <GoogleLogin />
        </StyledLink> */}
        <Button
          onClick={GoToLocalSignupPage}
          $letterSpacing="normal"
          $fontWeight="normal"
          $width="100%"
        >
          이메일로 시작하기
        </Button>
      </StyledDiv>

      <p>
        이미 계정이 있다면
        <StyledNoneStyleLink to={PAGE_LOGIN}>
          <StyledSpan>&nbsp;로그인</StyledSpan>
        </StyledNoneStyleLink>
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`

const StyledLink = styled.a`
  width: 100%;
  height: 50px;
  grid-column: ${(props) => props.className || 'span 1'};
  justify-self: center;
  align-self: center;
  text-decoration: none;
  color: black;
`

const StyledNoneStyleLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const StyledSpan = styled.span`
  font-weight: 900;
  font-size: medium;
`
