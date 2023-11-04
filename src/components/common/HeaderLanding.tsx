import React, { useState } from 'react'
import { LogoHeaderGradation, LogoHeaderGradationKorean } from 'assets/logos'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'
import { LANDING_NAV_LIST } from 'constants/navList'
import HeaderAptSearchBar from './apt-sugget-search-bar/HeaderAptSearchBar'
import Slider from 'react-slick'
import { PAGE_LOGIN } from 'constants/auth/path'
import { PAGE_SETTING } from 'constants/setting/path'
import { Img } from 'styles/reusable-style/elementStyle'
import { useAppSelector } from 'hooks/useRedux'
import defaultAvatar from 'assets/users/defaultAvatar.png'

const HeaderLanding = () => {
  const [searchMode, setSearchMode] = useState<boolean>(false)

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
  }

  const userInfo = useAppSelector((state) => state.user.userInfo)
  console.log(userInfo)
  const newArray: string[] = Object.values(userInfo)
  const isNewArrayEmpty = newArray
    .map((item) => item.length === 0)
    .reduce((prev, current) => prev && current)

  return (
    <Container $background="#FFFFFF">
      <Inner
        $height="50px"
        $background="#FFFFFF"
        $display="flex"
        $justifyContent="space-between"
        $alignItems="center"
      >
        <StyledLogoBox>
          <Slider {...settings}>
            <NavLink to="/">
              <LogoHeaderGradation width="170px" height="30px" />
            </NavLink>
            <NavLink to="/">
              <LogoHeaderGradationKorean width="170px" height="30px" />
            </NavLink>
          </Slider>
        </StyledLogoBox>
        <StyledDiv className="interval">
          {LANDING_NAV_LIST.slice(0, 2).map((item, index) => (
            <StyledNavLink
              className={searchMode ? 'disappear' : 'appear'}
              key={index}
              to={item.path}
            >
              {item.title}
            </StyledNavLink>
          ))}
          <HeaderAptSearchBar searchMode={searchMode} setSearchMode={setSearchMode} />
          {LANDING_NAV_LIST.slice(3).map((item, index) => (
            <StyledNavLink key={index} to={item.path}>
              {item.title}
            </StyledNavLink>
          ))}
          {isNewArrayEmpty ? (
            <StyledNavLink to={PAGE_LOGIN} className="login">
              로그인
            </StyledNavLink>
          ) : (
            <StyledNavLink to={PAGE_SETTING}>
              <Img
                src={userInfo.profileImageUrl || defaultAvatar}
                $width="40px"
                $height="40px"
                $borderRadius="50%"
                $lineHeight="12px"
                $margin="5px 0"
              />
            </StyledNavLink>
          )}
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
    gap: 20px;
  }
`

const StyledNavLink = styled(NavLink)`
  font-size: 12px;
  color: #303030;

  &.disappear {
    font-size: 0;
    /* transition: .2s ease-in-out; */
  }

  &.appear {
    font-size: 12px;
    transition: 0.2s ease-in-out;
  }

  &:hover {
    transform: scale(1.05);
    transition: 0s;
  }

  &.active {
    font-weight: 900;
    color: #2b7f75;
  }

  &.login {
    margin-bottom: -2px;
  }
`

const StyledLogoBox = styled.div`
  width: 175px;
`
