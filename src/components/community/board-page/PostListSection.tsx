import React, { FC, useEffect, useState, useRef } from 'react'
import BoardCard from './BoardCard'
import { styled } from 'styled-components'
import { BoardType, postsService } from 'services/community/postsService'
import PostsLoading from 'components/common/loading-effect/PostsLoading'
import { MoonLoader } from 'react-spinners'

interface Props {
  boardType: BoardType
  selectedCategory: string
  selectedSort: string
}

export interface Post {
  // 모집공고는 또 다를 텐데..
  content: string
  createdAt: string
  createdBy: string
  id: number
  liked: number
  saw: number
  title: string
  thumbnail: string
}

const PostListSection: FC<Props> = ({ boardType, selectedCategory, selectedSort }) => {
  //=========================================================================
  const [postList, setPostList] = useState<Post[]>([])
  const [firstLoading, setFirstLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [nothingToload, setNothingToload] = useState(false)
  const LoadingTargetRef = useRef(null)
  const pageCountRef = useRef(1)

  useEffect(() => {
    const getPost = async () => {
      const response = await postsService.getPosts({
        boardType,
        category: selectedCategory,
        sort: selectedSort,
        page: 1,
      })
      if (!response) return
      setFirstLoading(false)
      setPostList(response.data.results)
    }

    getPost()
  }, [selectedCategory, selectedSort, boardType])

  const getNewPage = async () => {
    setLoading(true)
    pageCountRef.current = pageCountRef.current + 1
    const response = await postsService.getPosts({
      boardType,
      category: selectedCategory,
      sort: selectedSort,
      page: pageCountRef.current,
    })
    if (!response) return
    if (response.data.results.length === 0) return setNothingToload(true)
    setLoading(false)
    setPostList((prev) => [...prev, ...response.data.results])
  }

  // 무한 스크롤 ======추후 커스텀 훅으로 모듈화 고려
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading) {
          getNewPage()
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)
    if (LoadingTargetRef.current) {
      observer.observe(LoadingTargetRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [loading, getNewPage])
  //======

  if (firstLoading) return <PostsLoading />

  return (
    <StyledDiv>
      {postList.map((post: Post) => (
        <BoardCard boardType={boardType} post={post} key={post.id} />
      ))}
      {nothingToload ? (
        <StyledParagraph>더이상 불러 올 게시물이 없습니다.</StyledParagraph>
      ) : (
        <div ref={LoadingTargetRef}>
          {loading && (
            <MoonLoader
              color="#36d7b7"
              size="40px"
              cssOverride={{ margin: '10px auto' }}
            />
          )}
        </div>
      )}
    </StyledDiv>
  )
}

export default PostListSection

const StyledDiv = styled.div`
  min-height: 80vh;
`

const StyledParagraph = styled.p`
  text-align: center;
`
