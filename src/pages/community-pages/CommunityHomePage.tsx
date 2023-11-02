import React from 'react'
import WidgetsSection from 'components/community/widget-bar/WidgetsSection'
import { Outlet } from 'react-router-dom'
import Footer from 'components/common/Footer'
import HeaderCommunity from 'components/common/HeaderCommunity'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { styled } from 'styled-components'
import { FixedButtonList } from 'components/community/common/FixedButtonList'
import { useInView } from 'react-intersection-observer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CommunityHomePage = () => {
  const { ref: backToTopRef, inView: isInViewport } = useInView()

  return (
    <>
      <HeaderCommunity backToTopRef={backToTopRef} />
      <Container>
        <Inner className="fullScreen" $display="flex" $gap="10px" $padding="10px 0">
          <StyledLayout className="outlet">
            <Outlet />
          </StyledLayout>
          <StyledLayout className="widgetsSection">
            <WidgetsSection />
          </StyledLayout>
        </Inner>
        <FixedButtonList isInViewport={isInViewport} />
        <Footer />
      </Container>
      <ToastContainer
        toastStyle={{
          boxShadow: 'none',
          backgroundColor: '#303030',
          color: '#ffffff',
          fontSize: '12px',
        }}
      />
    </>
  )
}

export default CommunityHomePage

const StyledLayout = styled.div`
  &.outlet {
    width: 900px;
  }
  &.widgetsSection {
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 5px;
  }
`
