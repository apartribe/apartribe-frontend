import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { PAGE_LOGIN } from 'constants/auth/path'
import { Button, Modal, ModalBackground } from 'styles/reusable-style/elementStyle'

type FindIdPwModalProps = {
  modal: boolean
  setModal: (modal: boolean) => void
}

const FindIdPwModal = ({ modal, setModal }: FindIdPwModalProps) => {
  const navigate = useNavigate()

  const closeModal = () => {
    //navigate(PAGE_LOGIN)
    setModal(!modal)
  }

  return (
    <>
      {modal && (
        <ModalBackground>
          <StyledModal>
            <p>
              이메일로 비밀번호 변경 정보가 전송되었습니다.
              <br />
              메일함을 확인해주세요.
            </p>
            <p>일치하는 정보가 없습니다.</p>
            <Button onClick={closeModal} $background="#FFF" $color="#000">
              확인
            </Button>
          </StyledModal>
        </ModalBackground>
      )}
    </>
  )
}

export default FindIdPwModal

const StyledModal = styled(Modal)`
  height: fit-content;
  text-align: center;
`
