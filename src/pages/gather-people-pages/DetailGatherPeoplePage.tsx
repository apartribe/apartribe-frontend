import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'
import DetailInfoSection from 'components/community/DetailInfoSection'
import { GATHER_PEOPLE_DETAIL_MOCK } from 'mock/gatherPeopleDetailData'

const DetailGatherPeoplePage = () => {
  const {
    issuedAt,
    data,
    data: { content, commentCounts, comments },
  } = GATHER_PEOPLE_DETAIL_MOCK

  return (
    <ShadowBox $padding="30px">
      <DetailHeaderSection issuedAt={issuedAt} data={data} />
      <DetailInfoSection data={data} />
      <DetailHtmlSection>{parse(content)}</DetailHtmlSection>
      <DetailCommentSection commentCounts={commentCounts} comments={comments} />
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
