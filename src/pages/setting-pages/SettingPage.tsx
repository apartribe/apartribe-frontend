import { useState, useEffect, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { IoPersonCircle } from 'react-icons/io5'
import { useAppSelector } from 'hooks/useRedux'
import { auth } from 'services/auth'
import { P, Img, ShadowBox, Badge } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import {
  PAGE_CHANGE_IMAGE,
  PAGE_CHANGE_NICKNAME,
  PAGE_CHANGE_PW,
} from 'constants/setting/path'
import { MyInfo } from 'types/setting'
import { Message } from 'types/auth'
import QuestionModal from 'components/common/QuestionModal'

const SettingPage = () => {
  const [myInfo, setMyInfo] = useState<MyInfo>({
    email: '',
    name: '',
    nickname: '',
    profileImageUrl: '',
    /*  aptName: '', 
    badge: '' */
  })
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
    todo: '' as unknown as () => void,
  })

  const navigate = useNavigate()
  const userEmail = useAppSelector((state) => state.user?.userEmail)

  const { email, name, nickname, profileImageUrl /* , aptName, badge */ } = myInfo
  const aptName = '아파트명'
  const badge = '미인증'

  useEffect(() => {
    const viewMyInfo = async () => {
      //const showMemberResult = await user.showMember(/* userEmail */'jieun2.dev@gmail.com')
      /* const { result, data } = showMemberResult as ResultWithData
      
      if(result === 'success') {
        setMyInfo(data)
      } */
    }
    viewMyInfo()
  }, [])

  const openModal = (
    status: 'waiting' | 'success' | 'fail',
    message: string,
    todo: () => void,
  ) => {
    console.log(todo)
    setModal((prev) => !prev)
    setModalMessage({ status, message, todo })
  }

  const logout = () => {
    openModal(
      'waiting',
      '로그아웃 하시겠습니까? 확인을 누르면 로그아웃 됩니다.',
      auth.logout,
    )
    //auth.logout()
    //navigate('/')
  }

  return (
    <>
      {myInfo && (
        <Container>
          <Inner className="fullScreen" $width="640px" $padding="30px">
            <h2>설정</h2>
            <StyledDiv className="gap">
              <StyledShadowBox>
                <StyledDiv className="row">
                  <h3>내정보</h3>
                  <StyledButtonBlack onClick={logout}>로그아웃</StyledButtonBlack>
                </StyledDiv>
                <StyledDiv className="row">
                  {profileImageUrl.length !== 0 ? (
                    <StyledImg src={profileImageUrl} />
                  ) : (
                    <StyledIcon />
                  )}
                  <StyledDiv className="column">
                    <StyledP>{email}</StyledP>
                    <P>
                      {name} / {nickname}
                    </P>
                    <StyledDiv className="row">
                      <P>{aptName}</P>
                      <StyledBadge className={badge}>{badge}</StyledBadge>
                    </StyledDiv>
                  </StyledDiv>
                </StyledDiv>
              </StyledShadowBox>
              <StyledShadowBox>
                <h3>계정</h3>
                <StyledLinkContainer>
                  <StyledLink to="">아파트 인증</StyledLink>
                  <StyledLink to={PAGE_CHANGE_PW}>비밀번호 변경</StyledLink>
                  <StyledLink to={PAGE_CHANGE_NICKNAME}>닉네임 변경</StyledLink>
                  <StyledLink to={PAGE_CHANGE_IMAGE}>프로필 이미지 변경</StyledLink>
                </StyledLinkContainer>
              </StyledShadowBox>
              <StyledShadowBox>
                <h3>커뮤니티</h3>
                <StyledLinkContainer>
                  <StyledLink to="">내가 쓴 게시물</StyledLink>
                  <StyledLink to="">내가 쓴 댓글</StyledLink>
                </StyledLinkContainer>
              </StyledShadowBox>
              <StyledShadowBox>
                <h3>이용안내</h3>
                <StyledLinkContainer>
                  <StyledLink to="">문의 하기</StyledLink>
                  <StyledLink to="">공지사항</StyledLink>
                  <StyledLink to="">서비스 이용 약관</StyledLink>
                </StyledLinkContainer>
              </StyledShadowBox>
              <StyledShadowBox>
                <h3>기타</h3>
                <StyledLink to="">회원 탈퇴</StyledLink>
              </StyledShadowBox>
            </StyledDiv>
          </Inner>
        </Container>
      )}
      {modal && (
        <QuestionModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </>
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

const StyledImg = styled(Img)`
  width: 90px;
  height: 90px;
  border: 1px solid #dadada;
  border-radius: 50%;
  line-height: 12px;
  margin: 5px 0;
`

const StyledIcon = styled(IoPersonCircle)`
  width: 90px;
  height: 90px;
  color: #dadada;
`

const StyledButtonBlack = styled.button`
  background: #303030;
  color: #fff;
  border-radius: 20px;
  width: 100px;
  padding: 5px;
  cursor: pointer;
`

const StyledBadge = styled(Badge)`
  width: 70px;
  margin: 0 auto 0 -10px;
  background-color: ${(props) => {
    if (props.className === '인증 완료') return '#0B2A08'
    else if (props.className === '창립멤버') return '#C9AB0C'
    else if (props.className === '미인증') return '#EA1616'
    else if (props.className === '관리인') return '#2B7F75'
  }};
`

const StyledP = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #2b7f75;
  margin: 0;
  margin-bottom: 5px;
`

const StyledShadowBox = styled(ShadowBox)`
  padding: 20px;
  & h3 {
    margin: 0;
    margin-bottom: 20px;
  }
`
const StyledLinkContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: fit-content;
`

const StyledLink = styled(Link)`
  color: #000;
`
