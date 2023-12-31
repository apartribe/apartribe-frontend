import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { useAppSelector } from 'hooks/useRedux'
import { authService } from 'services/auth/authService'
import { P, Img, ShadowBox, Badge } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import {
  PAGE_CHANGE_IMAGE,
  PAGE_CHANGE_NICKNAME,
  PAGE_CHANGE_PW,
  PAGE_DELETE_MEMBER,
  PAGE_MY_ARTICLE,
  PAGE_MY_COMMENT,
  PAGE_VERIFY_APT,
} from 'constants/setting/path'
import { MyInfo } from 'types/settingType'
import { Message } from 'types/authType'
import QuestionModal from 'components/common/QuestionModal'
import { setLogout } from 'redux/store/userSlice'
import { useDispatch } from 'react-redux'
import defaultAvatar from 'assets/users/defaultAvatar.png'

const SettingPage = () => {
  const [myInfo, setMyInfo] = useState<MyInfo>({
    email: '',
    name: '',
    nickname: '',
    profileImageUrl: '',
    apartCode: '',
    apartName: '',
    userType: '',
    position: '',
    authStatus: '',
  })
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
    todo: '' as unknown as () => void,
  })

  const userInfo = useAppSelector((state) => state.user?.userInfo)

  const { email, name, nickname, profileImageUrl, apartName, authStatus } = myInfo

  const dispatch = useDispatch()

  useEffect(() => {
    const viewMyInfo = async () => {
      setMyInfo(userInfo)
    }
    viewMyInfo()
  }, [userInfo])

  const openModal = (
    status: 'waiting' | 'success' | 'fail',
    message: string,
    todo: () => void,
  ) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, todo })
  }

  const logout = () => {
    const toDo = () => {
      authService.logout()
      dispatch(setLogout())
    }
    openModal('waiting', '로그아웃 하시겠습니까? 확인을 누르면 로그아웃 됩니다.', toDo)
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
                <StyledMyInfoDiv>
                  <Img
                    src={profileImageUrl || defaultAvatar}
                    $width="100px"
                    $height="100px"
                    $borderRadius="50%"
                    $lineHeight="12px"
                    $margin="5px 0"
                  />
                  <StyledDiv className="column">
                    <StyledP>{email}</StyledP>
                    <P>
                      {name} / {nickname}
                    </P>
                    <StyledDiv className="row">
                      <P>{apartName === 'EMPTY' ? '인증된 아파트 없음' : apartName}</P>
                      <StyledBadge className={authStatus}>{authStatus}</StyledBadge>
                    </StyledDiv>
                  </StyledDiv>
                </StyledMyInfoDiv>
              </StyledShadowBox>
              <StyledShadowBox>
                <h3>계정</h3>
                <StyledLinkContainer>
                  <StyledLink to={PAGE_VERIFY_APT}>아파트 인증</StyledLink>
                  <StyledLink to={PAGE_CHANGE_PW}>비밀번호 변경</StyledLink>
                  <StyledLink to={PAGE_CHANGE_NICKNAME}>닉네임 변경</StyledLink>
                  <StyledLink to={PAGE_CHANGE_IMAGE}>프로필 이미지 변경</StyledLink>
                </StyledLinkContainer>
              </StyledShadowBox>
              <StyledShadowBox>
                <h3>커뮤니티</h3>
                <StyledLinkContainer>
                  <StyledLink to={PAGE_MY_ARTICLE}>내가 쓴 게시물</StyledLink>
                  <StyledLink to={PAGE_MY_COMMENT}>내가 쓴 댓글</StyledLink>
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
                <StyledLink to={PAGE_DELETE_MEMBER}>회원 탈퇴</StyledLink>
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
  display: flex;
  flex-direction: ${(props) => (props.className === 'row' ? 'row' : 'column')};
  align-items: ${(props) => props.className === 'row' && 'center'};
  justify-content: ${(props) => props.className === 'row' && 'space-between'};
  align-items: ${(props) => props.className === 'row' && 'center'};
  gap: ${(props) => (props.className === 'gap' || props.className === 'row') && '15px'};
  & * {
  }
`

const StyledMyInfoDiv = styled.div`
  display: flex;
  column-gap: 15px;
  align-items: center;
`

const StyledButtonBlack = styled.button`
  background: #303030;
  color: #fff;
  border-radius: 15px;
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13.5px;
`

const StyledBadge = styled(Badge)`
  width: fit-content;
  padding: 0 15px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0 -10px;
  font-size: 13px;
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
