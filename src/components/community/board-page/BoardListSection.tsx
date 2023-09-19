import React, { FC } from 'react'
import { BOARD_MOCK } from 'mock/boardData'
import BoardCard from './BoardCard'

interface Props {
  selectedCategory: string
  selectedSort: string
}

const BoardListSection: FC<Props> = () => {
  return (
    <>
      {BOARD_MOCK.map((post, index) => (
        <BoardCard post={post} key={index} />
      ))}
    </>
  )
}

export default BoardListSection
