// 서버측 API 미완성으로 인한 주석처리

import { ShadowBox } from 'styles/reusable-style/elementStyle'
// import { styled } from 'styled-components'
// import React, { useEffect } from 'react'
// import parse from 'html-react-parser'
// import DetailHeaderSection from 'components/community/DetailHeaderSection'
// import DetailCommentSection from 'components/community/DetailCommentSection'
// import DetailInfoSection from 'components/community/DetailInfoSection'
// import { GATHER_PEOPLE_DETAIL_MOCK } from 'mock/gatherPeopleDetailData'

const DetailGatherPeoplePage = () => {
  // const {
  //   issuedAt,
  //   data,
  //   data: { content, commentCounts, comments },
  // } = GATHER_PEOPLE_DETAIL_MOCK

  // useEffect(() => {

  // }, [dispatch])
  // [postId]

  return (
    <ShadowBox $padding="30px">
      {/* <DetailHeaderSection boardType={BOARD_TYPE} postId={postId as string} data={data} /> */}
      {/* <DetailInfoSection data={data} /> */}
      {/* <DetailHtmlSection>{parse(data.data.content)}</DetailHtmlSection> */}
      {/* <DetailCommentSection commentCounts={commentCounts} comments={comments} /> */}
    </ShadowBox>
  )
}

export default DetailGatherPeoplePage

// const DetailHtmlSection = styled.div`
//   img {
//     max-width: 100%;
//     height: auto;
//   }
// `
