import React, { Dispatch, FC, MouseEvent, useState } from 'react'
import { styled } from 'styled-components'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'

interface Props {
  selectedValue: string
  setSelectedValue: Dispatch<React.SetStateAction<string>>
  dropdownList: string[]
}

const DropdownSort: FC<Props> = ({ selectedValue, setSelectedValue, dropdownList }) => {
  const changeSelectedSort = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedValue(e.currentTarget.innerText)
    setVisible(false)
  }

  const [visible, setVisible] = useState(false)

  const toggleDropDown = () => {
    setVisible((prev) => !prev)
  }

  console.log(visible)

  return (
    <StyledWrapper>
      <StyledDiv className="view" onClick={toggleDropDown}>
        {selectedValue}
        {visible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </StyledDiv>
      {visible ? (
        <StyledDiv className="select">
          {dropdownList.map((list, index) => (
            <StyledButton key={index} onClick={changeSelectedSort}>
              {list}
            </StyledButton>
          ))}
        </StyledDiv>
      ) : (
        ''
      )}
    </StyledWrapper>
  )
}

export default DropdownSort

const StyledWrapper = styled.div`
  position: relative;
`

const StyledDiv = styled.div`
  width: 70px;
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
