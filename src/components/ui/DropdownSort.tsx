import React, { Dispatch, FC, useState } from 'react'
import { styled } from 'styled-components'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
import { SORT_DROPDOWN_LIST } from 'constants/sortList'
import { Sort } from 'types/community-type/sortType'

interface Props {
  selectedValue: Sort
  setSelectedValue: Dispatch<React.SetStateAction<Sort>>
}

const DropdownSort: FC<Props> = ({ selectedValue, setSelectedValue }) => {
  const changeSelectedSort = (option: Sort) => {
    setSelectedValue(option)
    setVisible(false)
  }

  const [visible, setVisible] = useState(false)

  const toggleDropDown = () => {
    setVisible((prev) => !prev)
  }

  return (
    <StyledWrapper>
      <StyledDiv className="view" onClick={toggleDropDown}>
        {selectedValue.title}
        {visible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </StyledDiv>
      {visible ? (
        <StyledDiv className="select">
          {SORT_DROPDOWN_LIST.map((option, index) => (
            <StyledButton key={index} onClick={() => changeSelectedSort(option)}>
              {option.title}
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
