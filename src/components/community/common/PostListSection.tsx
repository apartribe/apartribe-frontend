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
import { Link, useParams } from 'react-router-dom'
import { Sort } from 'types/community-type/sortType'
import { useAppSelector } from 'hooks/useRedux'

interface Props {
  boardType: BoardType
  selectedCategory: string
  selectedSort: Sort
}

const PostListSection: FC<Props> = ({ boardType, selectedCategory, selectedSort }) => {
  //=========================================================================
  const { aptId } = useParams()
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const isNotVerifiedAptUser = userInfo.apartCode === '' || userInfo.apartCode === 'EMPTY'

  const [postList, setPostList] = useState<
    ArticleCardType[] | AnnounceCardType[] | TogetherCardType[]
  >([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [nothingToload, setNothingToload] = useState(false)
  const LoadingTargetRef = useRef(null)
  const pageCountRef = useRef(0)

  useEffect(() => {
    // 카테고리 변경시 초기화 핵심 로직.
    pageCountRef.current = 0
    setPostList([])
    setNothingToload(false)
    setLoading(false)
  }, [selectedCategory, selectedSort, aptId])

  useEffect(() => {
    // 비로그인, 아파트 미인증자 대상으로 실행됨
    if (!isNotVerifiedAptUser) return
    const getNewPage = async () => {
      const response = await postsService.getPosts({
        aptId: aptId as string,
        boardType,
        category: selectedCategory,
        sort: selectedSort.value,
        order: selectedSort.order,
        page: 1,
      })
      setTotalCount(response.data.totalCount)
      setPostList(response.data.results)
    }

    getNewPage()
  }, [boardType, selectedSort, selectedCategory, aptId])

  useEffect(() => {
    // 아파트 인증자 대상으로 실행됨
    if (isNotVerifiedAptUser) return
    const getNewPage = async () => {
      setLoading(true)
      pageCountRef.current = pageCountRef.current + 1
      const response = await postsService.getPosts({
        aptId: aptId as string,
        boardType,
        category: selectedCategory,
        sort: selectedSort.value,
        order: selectedSort.order,
        page: pageCountRef.current,
      })
      if (!response) return
      if (response.data.results.length === 0) return setNothingToload(true)
      setLoading(false)
      setTotalCount(response.data.totalCount)
      setPostList((prev) => [...prev, ...response.data.results])
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
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
  }, [loading, boardType, selectedSort, selectedCategory, aptId])

  return (
    <StyledDiv>
      {postList.slice(0, isNotVerifiedAptUser ? 3 : undefined).map((post) => {
        switch (boardType) {
          case 'article':
            return <ArticleCard key={post.id} post={post as ArticleCardType} />
          case 'announce':
            return <AnnounceCard key={post.id} post={post as AnnounceCardType} />
          case 'together':
            return <TogetherCard key={post.id} post={post as TogetherCardType} />
        }
      })}
      {isNotVerifiedAptUser && (
        <>
          {totalCount > 3 ? (
            <StyledParagraph className="seeMore">
              <StyledLink to="/setting/apartment-verification">
                아파트 인증하고 {totalCount - 3}개 게시물 더보기
              </StyledLink>
            </StyledParagraph>
          ) : (
            <StyledParagraph>더이상 불러 올 게시물이 없습니다.</StyledParagraph>
          )}
        </>
      )}
      {!isNotVerifiedAptUser && nothingToload ? (
        <StyledParagraph>더이상 불러 올 게시물이 없습니다.</StyledParagraph>
      ) : (
        <StyledTarget ref={LoadingTargetRef}>
          {!isNotVerifiedAptUser && loading && (
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
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-wrap: wrap;
`

const StyledParagraph = styled.p`
  width: 870px;
  height: 50px;
  padding-top: 15px;
  text-align: center;

  &.seeMore {
    &:hover {
      transform: scale(1.05);
    }
  }
`
const StyledTarget = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: #2b7f75;
  font-weight: 700;
`
