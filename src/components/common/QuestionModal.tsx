import { Dispatch, SetStateAction, useRef, MouseEvent } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Button, Modal, ModalBackground } from 'styles/reusable-style/elementStyle'
import { Message } from 'types/authType'

type QuestionModalProps = {
  modal: boolean
  setModal: Dispatch<SetStateAction<boolean>>
  modalMessage: Message
}

const QuestionModal = ({ modal, setModal, modalMessage }: QuestionModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const { status, message, todo } = modalMessage

  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setModal(!modal)
      navigate(-1)
    }
  }

  const confirm = () => {
    todo && todo()
    navigate('/')
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
            <StyledButton onClick={confirm}>확인</StyledButton>
          </StyledModal>
        </ModalBackground>
      )}
    </>
  )
}

export default QuestionModal

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

const StyledButton = styled(Button)`
  width: 100px;
  height: 40px;
`
