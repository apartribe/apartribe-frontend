import React, { FC, useEffect } from 'react'
import { BOARD_MOCK } from 'mock/boardData'
import BoardCard from './BoardCard'
import axios from 'axios'

interface Props {
  selectedCategory: string
  selectedSort: string
}

const BoardListSection: FC<Props> = () => {
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://ec2-15-165-196-198.ap-northeast-2.compute.amazonaws.com:8080/api/article?size=3&page=1',
      headers: {
        Authorization: localStorage.getItem('ACCESS_TOKEN_KEY'),
      },
    }).then((response) => {
      console.log(response.data)
    })
  }, [])

  // AUTHORIZATION

  return (
    <>
      {BOARD_MOCK.map((post, index) => (
        <BoardCard post={post} key={index} />
      ))}
    </>
  )
}

export default BoardListSection
