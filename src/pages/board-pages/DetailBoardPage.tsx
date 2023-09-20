import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { BOARD_DETAIL_MOCK } from 'mock/boardDetailData'
import { styled } from 'styled-components'
import { timeAgo } from 'utils/timeAgo'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'

const DetailBoardPage = () => {
  const {
    issuedAt,
    data,
    data: { content, comments },
  } = BOARD_DETAIL_MOCK

  return (
    <ShadowBox $padding="30px">
      <DetailHeaderSection issuedAt={issuedAt} data={data} />
      <DetailHtmlSection>{parse(content)}</DetailHtmlSection>
      <DetailCommentSection comments={comments} />
    </ShadowBox>
  )
}

export default DetailBoardPage

const DetailHtmlSection = styled.div`
  padding: 40px 0;
  img {
    max-width: 100%;
    height: auto;
  }
`
