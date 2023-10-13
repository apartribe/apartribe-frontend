import React, { FC, useEffect } from 'react'
import { BoardMockType } from 'mock/boardData'
import BoardCard from './BoardCard'
import { getPosts } from 'redux/posts/actions'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { BoardType } from 'services/community/postsService'
import { RootState } from 'redux/store'
import PostsLoading from 'components/common/loading-effect/PostsLoading'

interface Props {
  boardType: BoardType
  selectedCategory: string
  selectedSort: string
}

const PostListSection: FC<Props> = ({ boardType, selectedCategory, selectedSort }) => {
  const { data, loading, error } = useSelector((state: RootState) => state.posts.posts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(
      getPosts({ boardType, category: selectedCategory, sort: selectedSort, page: 1 }),
    )
  }, [dispatch, selectedCategory, selectedSort, boardType])

  if (loading) return <PostsLoading />
  if (error) return <StyledDiv>에러 발생!</StyledDiv>

  const boardPosts = data?.results
  if (!boardPosts) return null

  return (
    <StyledDiv>
      {boardPosts.map((post: BoardMockType) => (
        <BoardCard boardType={boardType} post={post} key={post.id} />
      ))}
    </StyledDiv>
  )
}

export default PostListSection

const StyledDiv = styled.div`
  min-height: 80vh;
`
