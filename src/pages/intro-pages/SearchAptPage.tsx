import React from 'react'
import AptSearchBar from 'components/common/apt-sugget-search-bar/AptSearchBar'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { styled } from 'styled-components'

const SearchAptPage = () => {
  return (
    <Container $background="url(https://photo.sentv.co.kr/photo/2021/11/19/20211119043409.jpg) no-repeat center/cover">
      <Inner $height="calc( 100vh - 50px)">
        <StyledWrapper>
          <AptSearchBar />
        </StyledWrapper>
      </Inner>
    </Container>
  )
}

export default SearchAptPage

const StyledWrapper = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`
