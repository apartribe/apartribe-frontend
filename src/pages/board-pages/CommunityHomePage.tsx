import React from 'react'
import SideSection from 'components/common/SideSection'
import { Outlet } from 'react-router-dom'
import Footer from 'components/common/Footer'
import HeaderCommunity from 'components/common/HeaderCommunity'

// 글쓰기 버튼을 여기에 추가하면 되겠음.
const CommunityHomePage = () => {
  return (
    <>
      <HeaderCommunity />
      <Outlet />
      <SideSection />
      <Footer />
    </>
  )
}

export default CommunityHomePage
