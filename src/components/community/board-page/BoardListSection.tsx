import React, { FC, useEffect } from 'react'
import { BOARD_MOCK, BoardMockType } from 'mock/boardData'
import BoardCard from './BoardCard'
import { getPosts } from 'redux/posts/actions'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  selectedCategory: string
  selectedSort: string
}

const BoardListSection: FC<Props> = () => {
  const { data, loading, error } = useSelector((state: any) => state.posts.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(
      getPosts({ boardType: 'article', category: '고양이 집사 모임', page: 1 }),
    )
  }, [dispatch])

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러 발생!</div>

  const boardPosts = data?.data?.results
  if (!boardPosts) return null

  return (
    <>
      {boardPosts.map((post: BoardMockType) => (
        <BoardCard post={post} key={post.id} />
      ))}
    </>
  )
}

export default BoardListSection
