import { useState } from 'react'
import { useAppSelector } from 'hooks/useRedux'
import { userService } from 'services/auth/userService'
import { styled } from 'styled-components'
import { Button, Input, ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { FaCheck } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { loginUser } from 'redux/store/userSlice'
import { Message } from 'types/settingType'
import MessageModal from 'components/common/MessageModal'

const DeleteMemberPage = () => {
  const [isAgree, setIsAgree] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const { email } = useAppSelector((state) => state.user.userInfo)
  const dispatch = useDispatch()

  const check = () => {
    setIsAgree((prev) => !prev)
  }

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const deleteMember = async () => {
    const deleteMemberResult = await userService.deleteMember(email)
    const { result, message } = deleteMemberResult

    if (result === 'success') {
      dispatch(loginUser(null))
    }
    openModal({ status: result, message, goTo: '/' })
  }

  return (
    <>
      <Container>
        <Inner className="fullScreen" $width="800px" $padding="30px">
          <h2>회원탈퇴</h2>
          <ShadowBox $padding="20px">
            <p>회원 탈퇴 전에 아래의 안내 사항을 꼭 확인해주세요.</p>
            <StyledInfoBox>
              <StyledP className="important">
                <StyledCheckIcon />
                사용하고 계신 계정(<StyledSpan className="bold">{email}</StyledSpan>)은
                탈퇴할 경우 재사용 및 복구가 불가능합니다.
              </StyledP>
              <p>
                <StyledCheckIcon />
                탈퇴 후 회원정보는 삭제되며 복구되지 않습니다.
              </p>
              <p>
                <StyledCheckIcon />
                탈퇴 후에도 작성한 게시물은 그대로 남아있습니다.
              </p>
            </StyledInfoBox>
            <StyledDiv className="align-center">
              <StyledCheckbox type="checkbox" checked={isAgree} onChange={check} />
              <p>안내 사항을 모두 확인하였으며, 이에 동의합니다.</p>
            </StyledDiv>
            <StyledDiv className="justify-center">
              <StyledButton onClick={deleteMember} disabled={!isAgree}>
                확인
              </StyledButton>
            </StyledDiv>
          </ShadowBox>
        </Inner>
      </Container>
      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </>
  )
}

export default DeleteMemberPage

const StyledInfoBox = styled.div`
  border: 2px solid #f2f2f2;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
`

const StyledCheckIcon = styled(FaCheck)`
  color: #2b7f75;
  margin-right: 3px;
`

const StyledP = styled.p`
  &.important {
    color: #ea1616;
  }
`
const StyledSpan = styled.span`
  &.bold {
    color: #2b7f75;
    font-weight: 700;
  }
`

const StyledDiv = styled.div`
  display: flex;
  gap: 5px;

  &.align-center {
    align-items: center;
  }

  &.justify-center {
    justify-content: center;
  }
`

const StyledCheckbox = styled(Input)`
  width: 15px;
  height: 15px;
  accent-color: #2b7f75;
`

const StyledButton = styled(Button)`
  width: 100px;
  height: 40px;
`
