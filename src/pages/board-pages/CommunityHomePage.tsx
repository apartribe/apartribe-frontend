import React from 'react'
import SideSection from 'components/common/SideSection'
import { Outlet } from 'react-router-dom'

// 글쓰기 버튼을 여기에 추가하면 되겠음.
const CommunityHomePage = () => {
  return (
    <>
      <Outlet />
      <SideSection />
    </>
  )
}

export default CommunityHomePage
