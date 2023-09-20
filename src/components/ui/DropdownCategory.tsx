import React, { Dispatch, FC, MouseEvent, useState } from 'react'
import { styled } from 'styled-components'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
import { Board } from 'types/community-type/annoucementType'

interface Props<T> {
  selectedValue: T
  setSelectedValue: Dispatch<React.SetStateAction<T>>
  dropdownList: string[]
}

const DropdownCategory = <T extends Board>({
  selectedValue,
  setSelectedValue,
  dropdownList,
}: Props<T>) => {
  const changeSelectedSort = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      category: e.currentTarget.innerText,
    }))
    setVisible(false)
  }

  const [visible, setVisible] = useState(false)

  const toggleDropDown = () => {
    setVisible((prev) => !prev)
  }

  return (
    <StyledWrapper>
      <StyledDiv className="view" onClick={toggleDropDown}>
        {selectedValue.category === '' ? '게시판 선택' : selectedValue.category}
        {visible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </StyledDiv>
      {visible ? (
        <StyledDiv className="select">
          {dropdownList.slice(1).map((list, index) => (
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

export default DropdownCategory

const StyledWrapper = styled.div`
  position: relative;
`

const StyledDiv = styled.div`
  width: 100%;
  color: #303030;
  display: flex;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  box-sizing: border-box;
  background: #ffffff;
  font-size: 15px;
  cursor: pointer;
  overflow: hidden;

  &.view {
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    height: 50px;
    line-height: 40px;
  }

  &.select {
    position: absolute;
    top: 55px;
    left: 0;
    flex-direction: column;
    height: auto;
    z-index: 2;
  }
`

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #f2f2f2;
  }
`
