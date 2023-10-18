import { Dispatch, SetStateAction, useRef, MouseEvent } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { styled } from 'styled-components'
import { Modal, ModalBackground } from 'styles/reusable-style/elementStyle'
import { Message } from 'types/auth'

type SignupModalProps = {
  modal: boolean
  setModal: Dispatch<SetStateAction<boolean>>
  modalMessage: Message
}

const SignupModal = ({ modal, setModal, modalMessage }: SignupModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const { status, message } = modalMessage
  console.log('modalMessage', status, message)

  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setModal(!modal)
    }
  }

  return (
    <>
      {modal && (
        <ModalBackground ref={modalRef} onClick={closeModal}>
          <StyledModal>
            <StyledIcon className={status} />
            <StyledSpan>{message}</StyledSpan>
          </StyledModal>
        </ModalBackground>
      )}
    </>
  )
}

export default SignupModal

const StyledModal = styled(Modal)`
  height: 200px;
  width: 400px;
  padding: 0;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(AiOutlineCheckCircle)`
  font-size: 50px;
  color: ${(props) => {
    if (props.className === 'success') return 'green'
    else if (props.className === 'fail') return '#EA1616'
  }};
`

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #000;
`
