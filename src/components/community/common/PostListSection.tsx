import React, { FC, useEffect, useState, useRef } from 'react'
import ArticleCard from '../article-page/ArticleCard'
import { styled } from 'styled-components'
import { BoardType, postsService } from 'services/community/postsService'
import { MoonLoader } from 'react-spinners'
import AnnounceCard from '../announce-page/AnnounceCard'
import TogetherCard from '../together-page/togetherCard'
import { ArticleCardType } from 'types/community-type/ArticleType'
import { AnnounceCardType } from 'types/community-type/announceType'
import { TogetherCardType } from 'types/community-type/togetherType'
import { useParams } from 'react-router-dom'

interface Props {
  boardType: BoardType
  selectedCategory: string
  selectedSort: string
}

const PostListSection: FC<Props> = ({ boardType, selectedCategory, selectedSort }) => {
  //=========================================================================
  const { aptId } = useParams()

  const [postList, setPostList] = useState<
    ArticleCardType[] | AnnounceCardType[] | TogetherCardType[]
  >([])
  const [loading, setLoading] = useState(false)
  const [nothingToload, setNothingToload] = useState(false)
  const LoadingTargetRef = useRef(null)
  const pageCountRef = useRef(0)

  // 무한 스크롤 ======추후 커스텀 훅으로 모듈화 고려

  useEffect(() => {
    // 카테고리 변경시 초기화 핵심 로직.
    pageCountRef.current = 0
    setPostList([])
    setNothingToload(false)
    setLoading(false)
  }, [selectedCategory, selectedSort])

  useEffect(() => {
    const getNewPage = async () => {
      setLoading(true)
      pageCountRef.current = pageCountRef.current + 1
      const response = await postsService.getPosts({
        aptId: aptId as string,
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
  }, [loading, boardType, selectedSort, selectedCategory])
  //======

  // if (firstLoading) return <PostsLoading />

  return (
    <StyledDiv>
      {postList.map((post) => {
        switch (boardType) {
          case 'article':
            return (
              <ArticleCard
                boardType={boardType}
                post={post as ArticleCardType}
                key={post.id}
              />
            )
          case 'announce':
            return (
              <AnnounceCard
                boardType={boardType}
                post={post as AnnounceCardType}
                key={post.id}
              />
            )
          case 'together':
            return (
              <TogetherCard
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
        <StyledTarget ref={LoadingTargetRef}>
          {loading && (
            <MoonLoader
              color="#36d7b7"
              size="40px"
              cssOverride={{ margin: '10px auto' }}
            />
          )}
        </StyledTarget>
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
  width: 870px;
  margin: 50px 0;
  text-align: center;
`
const StyledTarget = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
`
