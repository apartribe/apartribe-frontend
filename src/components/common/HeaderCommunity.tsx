import React, { FC, useEffect, useState } from 'react'
import { LogoHeaderGradation, LogoHeaderGradationKorean } from 'assets/logos'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { Link, NavLink, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { IoPersonCircle } from 'react-icons/io5'
import { COMMUNITY_NAV_LIST, LANDING_NAV_LIST } from 'constants/navList'
import HeaderAptSearchBar from './apt-sugget-search-bar/HeaderAptSearchBar'
import { aptService } from 'services/apt/aptService'
import Slider from 'react-slick'
import { useAppSelector } from 'hooks/useRedux'

interface Props {
  backToTopRef: (node?: Element | null | undefined) => void
}

const HeaderCommunity: FC<Props> = ({ backToTopRef }) => {
  const { aptId } = useParams()

  const userInfo = useAppSelector((state) => state.user?.userInfo)
  const [searchMode, setSearchMode] = useState<boolean>(false)
  const [aptName, setAptName] = useState<string>('')

  useEffect(() => {
    const getAptName = async () => {
      const response = await aptService.getAptName({ aptId: aptId as string })
      setAptName(response.apartName)
    }

    getAptName()
  }, [aptId])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
    arrows: false,
  }

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
          <StyledParagraph className={searchMode ? 'disappear' : 'appear'}>
            {aptName}
          </StyledParagraph>
        </StyledDiv>
        <StyledDiv className="interval">
          {COMMUNITY_NAV_LIST.map((item, index) => (
            <StyledNavLink
              className={searchMode ? 'disappear' : 'appear'}
              key={index}
              to={item.path(aptId as string)}
              end={index === 0 ? true : false}
            >
              {item.title}
            </StyledNavLink>
          ))}
        </StyledDiv>
        <StyledDiv className="interval">
          {LANDING_NAV_LIST.slice(1, 2).map((item, index) => (
            <StyledLink
              className={searchMode ? 'disappear' : 'appear'}
              key={index}
              to={item.path(userInfo?.apartCode)}
            >
              {item.title}
            </StyledLink>
          ))}
          <HeaderAptSearchBar searchMode={searchMode} setSearchMode={setSearchMode} />
          {LANDING_NAV_LIST.slice(2).map((item, index) => (
            <StyledNavLink key={index} to={item.path('')}>
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

export default HeaderCommunity

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
`

const StyledLink = styled(Link)`
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
`

const StyledLogoBox = styled.div`
  width: 170px;
`

const StyledParagraph = styled.p`
  margin-top: 15px;

  &.disappear {
    font-size: 0;
    transition: 0.2s ease-in-out;
  }

  &.appear {
    font-size: 12px;
    transition: 0.2s ease-in-out;
  }
`
