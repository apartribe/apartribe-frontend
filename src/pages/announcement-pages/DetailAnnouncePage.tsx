import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'
import { ANNOUNCEMENT_DETAIL_MOCK } from 'mock/announcementDetailData'

const DetailAnnouncePage = () => {
  const {
    issuedAt,
    data,
    data: { content, commentCounts, comments },
  } = ANNOUNCEMENT_DETAIL_MOCK

  return (
    <ShadowBox $padding="30px">
      <DetailHeaderSection issuedAt={issuedAt} data={data} />
      <DetailHtmlSection>{parse(content)}</DetailHtmlSection>
      <DetailCommentSection commentCounts={commentCounts} comments={comments} />
    </ShadowBox>
  )
}

export default DetailAnnouncePage

const DetailHtmlSection = styled.div`
  padding: 40px 0;
  img {
    max-width: 100%;
    height: auto;
  }
`
