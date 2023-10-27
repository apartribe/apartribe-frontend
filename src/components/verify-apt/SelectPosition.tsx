import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'
import { Verification } from 'types/VerifyAptType'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
import { MANAGER_POSITIONS, RESIDENT_POSITIONS } from 'constants/landing/verifyApt'

interface Props {
  formValue: Verification
  setFormValue: Dispatch<SetStateAction<Verification>>
}

const SelectPosition: FC<Props> = ({ formValue, setFormValue }) => {
  const changeSelectedSort = (position: string) => {
    setFormValue((prevState) => ({ ...prevState, position }))
    setVisible(false)
  }

  const [visible, setVisible] = useState(false)

  const toggleDropDown = () => {
    setVisible((prev) => !prev)
  }

  return (
    <>
      <StyledH2>STEP3. 세부 유형 선택</StyledH2>
      <StyledParagraph className="helper">
        {`사용자의 세부 유형을 선택해주세요.
        일치하는 유형이 없을 시 가장 유사한 유형을 선택해주세요.`}
      </StyledParagraph>
      <StyledSection>
        {formValue.userType === 'resident' && (
          <StyledWrapper>
            <StyledDiv className="view" onClick={toggleDropDown}>
              {formValue.position || '눌러서 선택'}
              {visible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </StyledDiv>
            {visible ? (
              <StyledDiv className="select">
                {RESIDENT_POSITIONS.map((position: string, index) => (
                  <StyledButton key={index} onClick={() => changeSelectedSort(position)}>
                    {position}
                  </StyledButton>
                ))}
              </StyledDiv>
            ) : (
              ''
            )}
          </StyledWrapper>
        )}

        {formValue.userType === 'manager' && (
          <StyledWrapper>
            <StyledDiv className="view" onClick={toggleDropDown}>
              {formValue.position || '눌러서 선택'}
              {visible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </StyledDiv>
            {visible ? (
              <StyledDiv className="select">
                {MANAGER_POSITIONS.map((position: string, index) => (
                  <StyledButton key={index} onClick={() => changeSelectedSort(position)}>
                    {position}
                  </StyledButton>
                ))}
              </StyledDiv>
            ) : (
              ''
            )}
          </StyledWrapper>
        )}
      </StyledSection>
    </>
  )
}

export default SelectPosition

const StyledH2 = styled.h2`
  margin: 0;
  line-height: 40px;
`

const StyledSection = styled.section`
  display: flex;
  /* justify-content: center; */
  margin: 20px 0;
`

const StyledParagraph = styled.p`
  margin: 0;

  &.helper {
    font-size: 12px;
    font-weight: 700;
    color: #2b7f75;
    white-space: pre-line;
  }
`

const StyledWrapper = styled.div`
  position: relative;
`

const StyledDiv = styled.div`
  width: 100px;
  color: #303030;
  display: flex;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  box-sizing: border-box;
  background: #ffffff;
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;

  &.view {
    justify-content: center;
    align-items: center;
    height: 40px;
    line-height: 40px;
  }

  &.select {
    position: absolute;
    top: 45px;
    left: 0;
    flex-direction: column;
    height: auto;
    z-index: 1;
  }
`

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }
`
