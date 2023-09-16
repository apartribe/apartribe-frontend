import React, { FC } from 'react'
import { styled } from 'styled-components'
import { IconType } from 'react-icons'
import { P } from 'styles/reusable-style/elementStyle'
import { Link } from 'react-router-dom'

export interface WidgetTitle {
  title: string
  hasSeeMore: boolean
  seeMorePath?: string
  Icon?: IconType
}

const WidgetTitleArea: FC<WidgetTitle> = ({ Icon, title, hasSeeMore, seeMorePath }) => {
  return (
    <StyledDiv>
      {Icon && <Icon />}
      <P $fontWeight="900">{title}</P>
      {hasSeeMore && seeMorePath ? <StyledLink to={seeMorePath}>더보기</StyledLink> : ''}
    </StyledDiv>
  )
}

export default WidgetTitleArea

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StyledLink = styled(Link)`
  font-size: 10px;
  color: #555555;
  margin-left: auto;
  padding: 0 5px 5px 0;

  &:hover {
    transform: scale(1.1);
  }
`
