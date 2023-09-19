import React, { FC } from 'react'
import BoardCard from '../board-page/BoardCard'
import { ANNONCEMENT_MOCK } from 'mock/announcementData'
import AnnouncementCard from './AnnouncementCard'

interface Props {
  selectedCategory: string
  selectedSort: string
}

const AnnouncementListSection: FC<Props> = () => {
  return (
    <>
      {ANNONCEMENT_MOCK.map((post, index) => (
        <AnnouncementCard post={post} key={index} />
      ))}
    </>
  )
}

export default AnnouncementListSection
