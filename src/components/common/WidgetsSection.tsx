import React from 'react'
import SearchBar from 'components/ui/SearchBar'
import AnnouncementWidget from 'components/community/side-bar/AnnouncementWidget'
import BestPostsWidget from 'components/community/side-bar/BestPostsWidget'
import AdvertisementWidget from 'components/community/side-bar/AdvertisementWidget'
import CommentRankWidget from 'components/community/side-bar/CommentRankWidget'
import GatherPeopleWidget from 'components/community/side-bar/GatherPeopleWidget'

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
