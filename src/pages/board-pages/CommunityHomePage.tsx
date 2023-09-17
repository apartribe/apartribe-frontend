import React from 'react'
import WidgetsSection from 'components/common/WidgetsSection'
import { Outlet } from 'react-router-dom'
import Footer from 'components/common/Footer'
import HeaderCommunity from 'components/common/HeaderCommunity'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { styled } from 'styled-components'

// 글쓰기 버튼을 여기에 추가하면 되겠음.
const CommunityHomePage = () => {
  return (
    <>
      <HeaderCommunity />
      <Container>
        <Inner className="fullScreen" $display="flex" $gap="10px" $padding="10px 0">
          <StyledLayout className="outlet">
            <Outlet />
          </StyledLayout>
          <StyledLayout className="widgetsSection">
            <WidgetsSection />
          </StyledLayout>
        </Inner>
        <Footer />
      </Container>
    </>
  )
}

export default CommunityHomePage

const StyledLayout = styled.div`
  &.outlet {
    width: 900px;
  }
  &.widgetsSection {
    min-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`
