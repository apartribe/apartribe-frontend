import React, { FC, useEffect, useState, useRef } from 'react'
import BoardCard from './BoardCard'
import { styled } from 'styled-components'
import { BoardType, postsService } from 'services/community/postsService'
import PostsLoading from 'components/common/loading-effect/PostsLoading'
import { MoonLoader } from 'react-spinners'
import AnnouncementCard from '../announce-page/AnnouncementCard'
import GatherPeopleCard from '../gather-people-page/GatherPeopleCard'
import { ArticleCardType } from 'types/community-type/ArticleType'
import { AnnounceCardType } from 'types/community-type/announceType'
import { TogetherCardType } from 'types/community-type/togetherType'

interface Props {
  boardType: BoardType
  selectedCategory: string
  selectedSort: string
}

const PostListSection: FC<Props> = ({ boardType, selectedCategory, selectedSort }) => {
  //=========================================================================
  const [postList, setPostList] = useState<
    ArticleCardType[] | AnnounceCardType[] | TogetherCardType[]
  >([])
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
      {postList.map((post) => {
        switch (boardType) {
          case 'article':
            return (
              <BoardCard
                boardType={boardType}
                post={post as ArticleCardType}
                key={post.id}
              />
            )
          case 'announce':
            return (
              <AnnouncementCard
                boardType={boardType}
                post={post as AnnounceCardType}
                key={post.id}
              />
            )
          case 'together':
            return (
              <GatherPeopleCard
                boardType={boardType}
                post={post as TogetherCardType}
                key={post.id}
              />
            )
        }
      })}
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
  display: flex;
  flex-wrap: wrap;
`

const StyledParagraph = styled.p`
  width: 100%;
  margin: 50px 0;
  text-align: center;
`
