import React from 'react'
import styled from 'styled-components'
import SearchBar from 'components/ui/SearchBar'
import AnnouncementWidget from 'components/community/side-bar/AnnouncementWidget'
import BestPostsWidget from 'components/community/side-bar/BestPostsWidget'
import AdvertisementWidget from 'components/community/side-bar/AdvertisementWidget'
import CommentRankWidget from 'components/community/side-bar/CommentRankWidget'
import GatherPeopleWidget from 'components/community/side-bar/GatherPeopleWidget'

const WidgetsSection = () => {
  return (
    <StyledDiv>
      <AnnouncementWidget />
      <SearchBar placeholder="커뮤니티 내 게시물 검색" />
      <BestPostsWidget />
      <AdvertisementWidget />
      <GatherPeopleWidget />
      <CommentRankWidget />
    </StyledDiv>
  )
}

export default WidgetsSection

const StyledDiv = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
