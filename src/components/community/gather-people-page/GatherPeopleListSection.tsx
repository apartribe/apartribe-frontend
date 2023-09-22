import React, { FC } from 'react'
import { GATHER_PEOPLE_MOCK } from 'mock/gatherPeopleData'
import GatherPeopleCard from './GatherPeopleCard'

interface Props {
  selectedCategory: string
  selectedSort: string
}

const GatherPeopleListSection: FC<Props> = () => {
  return (
    <>
      {GATHER_PEOPLE_MOCK.map((post, index) => (
        <GatherPeopleCard post={post} key={index} />
      ))}
    </>
  )
}

export default GatherPeopleListSection
