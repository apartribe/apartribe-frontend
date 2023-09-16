import { LogoHeaderWhite } from 'assets/logos'
import React from 'react'
import { styled } from 'styled-components'
import { P } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'

const Footer = () => {
  return (
    <Container $background="linear-gradient(350deg, rgba(26,42,58,1) 0%, rgba(56,71,81,1) 65%, rgba(75,89,99,1) 74%, rgba(61,75,85,1) 82%, rgba(26,42,58,1) 100%);">
      <Inner
        $height="250px"
        $background="none"
        $display="flex"
        $justifyContent="space-between"
        $alignItems="center"
      >
        <StyledDiv className="wider">
          <LogoHeaderWhite width="250px" height="47px" />
          <P $color="#FFFFFF">
            It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum
            is that it has a more-or-less normal distribution of letters, as opposed to
            using Content here, content here, making it look like readable English.
          </P>
        </StyledDiv>
        <StyledDiv>
          <P $fontWeight="900" $color="#FFFFFF">
            Pages
          </P>
          <P $color="#FFFFFF">
            home
            <br />
            community
            <br />
            about us
            <br />
            search
          </P>
        </StyledDiv>
        <StyledDiv>
          <P $fontWeight="900" $color="#FFFFFF">
            Pages
          </P>
          <P $color="#FFFFFF">
            contact
            <br />
            notification
            <br />
            have a good day
            <br />
            trust the process
          </P>
        </StyledDiv>
        <StyledDiv>
          <P $fontWeight="900" $color="#FFFFFF">
            Contact
          </P>
          <P $color="#FFFFFF">
            {' '}
            02) 1111 - 1111
            <br />
            abc123@apartribe.com
            <br />
            Seoul, seochogu, 111-111
          </P>
        </StyledDiv>
      </Inner>
    </Container>
  )
}

export default Footer

const StyledDiv = styled.div`
  width: 150px;

  &.wider {
    width: 500px;
  }
`
