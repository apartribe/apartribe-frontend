import React, { FC } from 'react'
import { styled } from 'styled-components'
import { ModalBackground } from 'styles/reusable-style/elementStyle'

interface ButtonsType {
  title: string
  action: () => void
}

interface ModalProps {
  modalProps: {
    text: string
    buttons: ButtonsType[]
  }
}

const FlexibleModal: FC<ModalProps> = ({ modalProps: { text, buttons } }) => {
  return (
    <ModalBackground>
      <StyledWrapper>
        <StyledDiv className="textSection">{text}</StyledDiv>
        <StyledDiv className="buttonSection">
          {buttons.map(({ title, action }, index) => (
            <StyledButton key={index} onClick={action}>
              {title}
            </StyledButton>
          ))}
        </StyledDiv>
      </StyledWrapper>
    </ModalBackground>
  )
}

export default FlexibleModal

const StyledWrapper = styled.div`
  background-color: #ffffff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  border-radius: 25px;
  overflow: hidden;
`

const StyledDiv = styled.div`
  display: flex;

  &.textSection {
    justify-content: center;
    align-items: center;
    padding: 50px;
    white-space: pre-line; // 템플릿 리터럴 줄 바꿈시, 줄바꿈 인식해줌.
  }

  &.buttonSection {
    height: 50px;
  }
`

const StyledButton = styled.button`
  width: 100%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    filter: brightness(0.9);
  }
`
