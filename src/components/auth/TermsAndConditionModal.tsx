import { useEffect, useState, useRef, MouseEvent } from 'react'
import { styled } from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Modal, ModalBackground } from 'styles/reusable-style/elementStyle'
import copyright_info from 'assets/terms_and_conditions/copyright_info.md'
import terms_of_service from 'assets/terms_and_conditions/terms_of_service.md'
import private_information_collection_and_use from 'assets/terms_and_conditions/private_information_collection_and_use.md'
import promotion_and_marketing_use from 'assets/terms_and_conditions/promotion_and_marketing_use.md'

type TermsAndConditionModalProps = {
  fileName: string
  modal: boolean
  setModal: (modal: boolean) => void
}

const TermsAndConditionModal = ({
  fileName,
  modal,
  setModal,
}: TermsAndConditionModalProps) => {
  const [text, setText] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fileList = [
      copyright_info,
      terms_of_service,
      private_information_collection_and_use,
      promotion_and_marketing_use,
    ]

    fetch(fileList.filter((item) => item.includes(fileName))[0])
      .then((res) => res.text())
      .then((text) => setText(text))
  }, [fileName])

  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setModal(!modal)
    }
  }

  return (
    <>
      {modal && (
        <ModalBackground ref={modalRef} onClick={closeModal}>
          <StyledModal $width="600px">
            <ReactMarkdown
              components={{
                img: ({ ...props }) => (
                  <img style={{ maxWidth: '100%' }} {...props} alt="" />
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </StyledModal>
        </ModalBackground>
      )}
    </>
  )
}

export default TermsAndConditionModal

const StyledModal = styled(Modal)`
  height: 700px;
  overflow-y: auto;
  padding: 20px;
  align-items: unset;
  &::-webkit-scrollbar {
    display: none;
  }
`
