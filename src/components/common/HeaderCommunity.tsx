import React, { FC } from 'react'
import { LogoHeaderGradation } from 'assets/logos'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'
import { IoPersonCircle } from 'react-icons/io5'
import { COMMUNITY_NAV_LIST, LANDING_NAV_LIST } from 'constants/navList'
import { useAppSelector } from 'hooks/useRedux'
import { Img } from 'styles/reusable-style/elementStyle'

const APT_NAME_MOCK = '자이 힐스테이트 하남'

interface Props {
  backToTopRef: (node?: Element | null | undefined) => void
}

const HeaderCommunity: FC<Props> = ({ backToTopRef }) => {
  const { profileImageUrl } = useAppSelector((state) => state.user?.userInfo)

  return (
    <Container $background="#FFFFFF" ref={backToTopRef}>
      <Inner
        $height="50px"
        $background="#FFFFFF"
        $display="flex"
        $justifyContent="space-between"
        $alignItems="center"
      >
        <StyledDiv>
          <StyledNavLink to="/">
            <LogoHeaderGradation width="170px" height="30px" />
          </StyledNavLink>
          {APT_NAME_MOCK}
        </StyledDiv>
        <StyledDiv className="interval">
          {COMMUNITY_NAV_LIST.map((item, index) => (
            <StyledNavLink key={index} to={item.path} end={index === 0 ? true : false}>
              {item.title}
            </StyledNavLink>
          ))}
        </StyledDiv>
        <StyledDiv className="interval">
          {LANDING_NAV_LIST.slice(2).map((item, index) => (
            <StyledNavLink key={index} to={item.path}>
              {item.title}
            </StyledNavLink>
          ))}
          <StyledNavLink to="/setting">
            {profileImageUrl.length !== 0 ? (
              <StyledImg src={profileImageUrl} />
            ) : (
              <StyledIcon />
            )}
          </StyledNavLink>
        </StyledDiv>
      </Inner>
    </Container>
  )
}

export default HeaderCommunity

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;

  &.interval {
    gap: 30px;
  }
`

const StyledNavLink = styled(NavLink)`
  font-size: 12px;
  color: #303030;

  &:hover {
    transform: scale(1.05);
  }

  &.active {
    font-weight: 900;
    color: #2b7f75;
  }
`

const StyledImg = styled(Img)`
  width: 40px;
  height: 40px;
  border: 1px solid #dadada;
  border-radius: 50%;
`

const StyledIcon = styled(IoPersonCircle)`
  width: 40px;
  height: 40px;
  color: #b3b3b3;
  margin: -10px;
  cursor: pointer;
`
