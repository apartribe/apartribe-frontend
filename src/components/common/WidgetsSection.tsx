import React from 'react'
import SearchBar from 'components/ui/SearchBar'
import AnnouncementWidget from 'components/community/widget-bar/AnnouncementWidget'
import BestPostsWidget from 'components/community/widget-bar/BestPostsWidget'
import AdvertisementWidget from 'components/community/widget-bar/AdvertisementWidget'
import CommentRankWidget from 'components/community/widget-bar/CommentRankWidget'
import GatherPeopleWidget from 'components/community/widget-bar/GatherPeopleWidget'

const WidgetsSection = () => {
  return (
    <>
      <AnnouncementWidget />
      <SearchBar placeholder="커뮤니티 내 게시물 검색" />
      <BestPostsWidget />
      <AdvertisementWidget />
      <GatherPeopleWidget />
      <CommentRankWidget />
    </>
  )
}

export default WidgetsSection
