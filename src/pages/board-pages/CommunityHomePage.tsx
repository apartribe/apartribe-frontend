import React from 'react'
import WidgetsSection from 'components/common/WidgetsSection'
import { Outlet } from 'react-router-dom'
import Footer from 'components/common/Footer'
import HeaderCommunity from 'components/common/HeaderCommunity'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'

// 글쓰기 버튼을 여기에 추가하면 되겠음.
const CommunityHomePage = () => {
  return (
    <>
      <HeaderCommunity />
      <Container>
        <Inner
          className="fullScreen"
          $display="flex"
          $flexDirection="row"
          $gap="10px"
          $padding="10px 0"
        >
          <Outlet />
          <WidgetsSection />
        </Inner>
        <Footer />
      </Container>
    </>
  )
}

export default CommunityHomePage
