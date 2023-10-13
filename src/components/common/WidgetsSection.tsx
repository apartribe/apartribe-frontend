import React from 'react'
import AnnouncementWidget from 'components/community/widget-bar/AnnouncementWidget'
import BestPostsWidget from 'components/community/widget-bar/BestPostsWidget'
import AdvertisementWidget from 'components/community/widget-bar/AdvertisementWidget'
import CommentRankWidget from 'components/community/widget-bar/CommentRankWidget'
import GatherPeopleWidget from 'components/community/widget-bar/GatherPeopleWidget'
import SearchPostWidget from 'components/community/widget-bar/SearchPostWidget'

const WidgetsSection = () => {
  return (
    <>
      <AnnouncementWidget />
      <SearchPostWidget />
      <BestPostsWidget />
      <AdvertisementWidget />
      <GatherPeopleWidget />
      <CommentRankWidget />
    </>
  )
}

export default WidgetsSection
