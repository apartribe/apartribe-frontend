import { CARD_CONTENTS } from 'constants/landing/verifyApt'
import React, { FC, Dispatch, SetStateAction } from 'react'
import { styled } from 'styled-components'
import { Badge } from 'styles/reusable-style/elementStyle'
import { Verification } from 'types/VerifyAptType'

interface Props {
  formValue: Verification
  setFormValue: Dispatch<SetStateAction<Verification>>
}

const SelectUserType: FC<Props> = ({ formValue, setFormValue }) => {
  const selectCard = (id: string) => {
    // 카드를 선택 할 때마다 position을 초기화해주지 않으면, 데이터 일관성에 오류가 생길 수 있음.
    setFormValue((prevState) => ({ ...prevState, userType: id, position: '' }))
  }

  return (
    <>
      <StyledH2>STEP2. 사용자 유형 선택</StyledH2>
      <StyledParagraph className="helper">
        {' '}
        두 가지의 사용자의 유형중 하나를 선택해주세요.
      </StyledParagraph>
      <StyledSection className="gap">
        {CARD_CONTENTS.map((item, index) => {
          const { id, badge, image, title, example, description } = item
          return (
            <StyledCard
              key={index}
              className={formValue.userType === id ? 'selected' : ''}
              onClick={() => selectCard(id)}
            >
              <Badge $position="absolute" $top="15px" $right="15px">
                {badge}
              </Badge>
              <StyledImage src={image} alt="거주민" />
              <StyledParagraph className="title">{title}</StyledParagraph>
              <StyledParagraph className="example">{example}</StyledParagraph>
              <StyledUl>
                {description.map((item, index) => (
                  <StyledLi className="description" key={index}>
                    - {item}
                  </StyledLi>
                ))}
              </StyledUl>
            </StyledCard>
          )
        })}
      </StyledSection>
    </>
  )
}

export default SelectUserType

const StyledH2 = styled.h2`
  margin: 0;
  line-height: 40px;
`

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  &.gap {
    gap: 20px;
  }
`

const StyledCard = styled.article`
  position: relative;
  background-color: #ffffff;
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    transform: translate(0, -5px);
    transition: 0.1s ease-in-out;
  }

  &.selected {
    border: 7px solid #2b7f75;
    transition: 0s ease-in-out;
  }
`

const StyledImage = styled.img`
  width: 300px;
`

const StyledParagraph = styled.p`
  margin: 0;

  &.title {
    font-size: 20px;
    font-weight: 900;
    color: #1a2a3a;
  }

  &.example {
    font-size: 12px;
    color: #2b7f75;
    white-space: pre-line;
    text-align: center;
    line-height: 25px;
    font-weight: 700;
  }

  &.helper {
    font-size: 12px;
    font-weight: 700;
    color: #2b7f75;
    white-space: pre-line;
  }
`

const StyledUl = styled.ul`
  width: 350px;
  border-radius: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  font-size: 13px;
  line-height: 30px;
`

const StyledLi = styled.li`
  font-weight: 700;
`
