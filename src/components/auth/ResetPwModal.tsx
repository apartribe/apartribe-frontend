import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { PAGE_LOGIN } from 'constants/auth/path'
import { Button, Modal, ModalBackground } from 'styles/reusable-style/elementStyle'

type ResetPwModalProps = {
  modal: boolean
}

const ResetPwModal = ({ modal }: ResetPwModalProps) => {
  const navigate = useNavigate()

  const closeModal = () => {
    navigate(PAGE_LOGIN)
  }

  return (
    <>
      {modal && (
        <ModalBackground>
          <StyledModal>
            <p>재설정이 완료되었습니다.</p>
            <Button onClick={closeModal} $background="#FFF" $color="#000">
              확인
            </Button>
          </StyledModal>
        </ModalBackground>
      )}
    </>
  )
}

export default ResetPwModal

const StyledModal = styled(Modal)`
  height: fit-content;
  text-align: center;
`
