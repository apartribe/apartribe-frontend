import React from 'react'
import { P, Img, ShadowBox, Badge } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { styled } from 'styled-components'
import { IoPersonCircle } from 'react-icons/io5'

const SettingPage = () => {
  const avatar =
    'https://res.cloudinary.com/dh6tdcdyj/image/upload/v1695016765/KakaoTalk_20230918_145710613_id4fua.png'
  const email = 'test@test.com'
  const name = '이름'
  const nickname = '닉네임'
  const aptName = '아파트명'
  const badge = '미인증'

  const badgeColor = (badge: string) => {
    if (badge === '인증 완료') return '#0B2A08'
    if (badge === '창립멤버') return '#C9AB0C'
    if (badge === '미인증') return '#EA1616'
    if (badge === '관리인') return '#2B7F75'
  }

  return (
    <Container>
      <Inner className="fullScreen" $width="640px">
        <h1>설정</h1>
        <StyledDiv className="gap">
          <ShadowBox $padding="10px 20px">
            <StyledDiv className="row">
              <h3>내정보</h3>
              <StyledButtonBlack>로그아웃</StyledButtonBlack>
            </StyledDiv>
            <StyledDiv className="row">
              <Img
                src={avatar}
                $width="70px"
                $height="70px"
                $borderRadius="50%"
                $lineHeight="12px"
                $margin="5px 0"
              />
              <StyledDiv className="column">
                <P $fontSize="25px" $fontWeight="700" $color="#2B7F75">
                  {email}
                </P>
                <P>
                  {name} / {nickname}
                </P>
                <StyledDiv className="row">
                  <P>{aptName}</P>
                  <Badge
                    $background={badgeColor(badge)}
                    $width="70px"
                    $margin="0 auto 0 -10px"
                  >
                    {badge}
                  </Badge>
                </StyledDiv>
              </StyledDiv>
            </StyledDiv>
          </ShadowBox>
          <ShadowBox $padding="10px 20px">
            <h3>계정</h3>
            <StyledP>아파트 인증</StyledP>
            <StyledP>비밀번호 변경</StyledP>
            <StyledP>닉네임 변경</StyledP>
          </ShadowBox>
          <ShadowBox $padding="10px 20px">
            <h3>커뮤니티</h3>
            <StyledP>내가 쓴 게시물</StyledP>
            <StyledP>내가 쓴 댓글</StyledP>
          </ShadowBox>
          <ShadowBox $padding="10px 20px">
            <h3>이용안내</h3>
            <StyledP>문의 하기</StyledP>
            <StyledP>공지사항</StyledP>
            <StyledP>서비스 이용 약관</StyledP>
          </ShadowBox>
          <ShadowBox $padding="10px 20px">
            <h3>기타</h3>
            <StyledP>회원 탈퇴</StyledP>
          </ShadowBox>
        </StyledDiv>
      </Inner>
    </Container>
  )
}

export default SettingPage

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.className === 'row' ? 'row' : 'column')};
  align-items: ${(props) => props.className === 'row' && 'center'};
  justify-content: ${(props) => props.className === 'row' && 'space-between'};
  align-items: ${(props) => props.className === 'row' && 'center'};
  gap: ${(props) => (props.className === 'gap' || props.className === 'row') && '15px'};
`

const StyledButtonBlack = styled.button`
  background: #000;
  color: #fff;
  border-radius: 20px;
  width: 100px;
`

const StyledP = styled.p`
  cursor: pointer;
`
