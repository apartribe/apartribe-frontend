import { Dispatch, SetStateAction, useRef, MouseEvent } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Modal, ModalBackground } from 'styles/reusable-style/elementStyle'
import { Message } from 'types/authType'

type MessageModalProps = {
  modal: boolean
  setModal: Dispatch<SetStateAction<boolean>>
  modalMessage: Message
}

const MessageModal = ({ modal, setModal, modalMessage }: MessageModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const { status, message, goTo } = modalMessage

  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setModal(!modal)
      goTo && navigate(goTo)
    }
  }

  const convertedMessage = message.split('\n').map((item, index) => (
    <div key={index}>
      {item}
      <br />
    </div>
  ))

  return (
    <>
      {modal && (
        <ModalBackground ref={modalRef} onClick={closeModal}>
          <StyledModal>
            <StyledIcon className={status} />
            <StyledSpan>{convertedMessage}</StyledSpan>
          </StyledModal>
        </ModalBackground>
      )}
    </>
  )
}

export default MessageModal

const StyledModal = styled(Modal)`
  height: 200px;
  width: 400px;
  padding: 10px;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(AiOutlineCheckCircle)`
  font-size: 50px;
  color: ${(props) => {
    if (props.className === 'success') return 'green'
    else if (props.className === 'waiting') return '#C9AB0C'
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
