import React from 'react'
import { LogoHeaderGradation } from 'assets/logos'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'
import { IoPersonCircle } from 'react-icons/io5'
import { COMMUNITY_NAV_LIST, LANDING_NAV_LIST } from 'constants/navList'

const APT_NAME_MOCK = '자이 힐스테이트 하남'

const HeaderLanding = () => {
  return (
    <Container $background="#FFFFFF">
      <Inner
        $height="50px"
        $background="#FFFFFF"
        $display="flex"
        $justifyContent="space-between"
        $alignItems="center"
      >
        <StyledNavLink to="/">
          <LogoHeaderGradation width="170px" height="30px" />
        </StyledNavLink>
        <StyledDiv className="interval">
          {LANDING_NAV_LIST.map((item, index) => (
            <StyledNavLink key={index} to={item.path}>
              {item.title}
            </StyledNavLink>
          ))}
          <StyledNavLink to="/setting">
            <IoPersonCircle fontSize="40px" color="#B3B3B3" cursor="pointer" />
          </StyledNavLink>
        </StyledDiv>
      </Inner>
    </Container>
  )
}

export default HeaderLanding

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
