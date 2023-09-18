import React, { FC } from 'react'
import { styled } from 'styled-components'
import { ArrowButton } from 'styles/reusable-style/elementStyle'
import { IoIosArrowUp } from 'react-icons/io'
import { PiPencilSimpleLineDuotone } from 'react-icons/pi'
import { FIXED_BUTTON_LISTS } from 'constants/fixedButtonList'
import { Link } from 'react-router-dom'

interface Props {
  backToTopRef: React.MutableRefObject<HTMLElement | null>
}

export const FixedButtonList: FC<Props> = ({ backToTopRef }) => {
  const clickBackToTop = () => {
    if (backToTopRef.current) {
      backToTopRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }

  return (
    <StyledWrapper>
      <StyledSubWrapper>
        {FIXED_BUTTON_LISTS.map((list, index) => (
          <StyledLink key={index} to={list.path}>
            <PiPencilSimpleLineDuotone />
            {list.option}
          </StyledLink>
        ))}
        <StyledDiv>
          <PiPencilSimpleLineDuotone />글 쓰기
        </StyledDiv>
      </StyledSubWrapper>
      <ArrowButton onClick={clickBackToTop}>
        <IoIosArrowUp />
      </ArrowButton>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
`

const StyledSubWrapper = styled.div`
  // 작명 불만족
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;

  & button {
  }

  &:hover {
    & div {
      transform: perspective(200px) rotateY(180deg);
    }

    & a {
      transform: perspective(200px) rotateY(0deg);
    }
  }
`

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #2b7f75;
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15px;
  color: #ffffff;
  transition: 0.2s;
  backface-visibility: hidden;
`

const StyledLink = styled(Link)`
  background: #eaf6f4;
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #2b7f75;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 15px;
  color: #2b7f75;
  transform: perspective(200px) rotateY(180deg);
  transition: 0.2s;
  backface-visibility: hidden;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`
