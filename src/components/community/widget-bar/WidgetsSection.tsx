import React from 'react'
import AnnounceWidget from 'components/community/widget-bar/AnnounceWidget'
import BestPostsWidget from 'components/community/widget-bar/BestPostsWidget'
import AdvertisementWidget from 'components/community/widget-bar/AdvertisementWidget'
import CommentRankWidget from 'components/community/widget-bar/CommentRankWidget'
import TogetherWidget from 'components/community/widget-bar/TogetherWidget'
import SearchPostWidget from 'components/community/widget-bar/SearchPostWidget'

const WidgetsSection = () => {
  return (
    <>
      <AnnounceWidget />
      <SearchPostWidget />
      <BestPostsWidget />
      <AdvertisementWidget />
      <TogetherWidget />
      <CommentRankWidget />
    </>
  )
}

export default WidgetsSection
