import React, { useEffect } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'
import DetailInfoSection from 'components/community/DetailInfoSection'
import { GATHER_PEOPLE_DETAIL_MOCK } from 'mock/gatherPeopleDetailData'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from 'redux/post/actions'

const DetailGatherPeoplePage = () => {
  // const {
  //   issuedAt,
  //   data,
  //   data: { content, commentCounts, comments },
  // } = GATHER_PEOPLE_DETAIL_MOCK

  const { data, loading, error } = useSelector((state: any) => state.post.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(
      getPost({ boardType: 'article' /* , category: '자유게시판' */, page: 1 }),
    )
  }, [dispatch])

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러 발생!</div>
  if (!data) return null

  return (
    <ShadowBox $padding="30px">
      <DetailHeaderSection data={data} />
      <DetailInfoSection data={data} />
      <DetailHtmlSection>{parse(data.data.content)}</DetailHtmlSection>
      {/* <DetailCommentSection commentCounts={commentCounts} comments={comments} /> */}
    </ShadowBox>
  )
}

export default DetailGatherPeoplePage

const DetailHtmlSection = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`
