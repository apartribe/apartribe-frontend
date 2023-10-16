// 서버측 API 미완성으로 인한 주석처리

import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { styled } from 'styled-components'
import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'
import DetailInfoSection from 'components/community/DetailInfoSection'
import { useParams } from 'react-router-dom'
import { TogetherDetailType } from 'types/community-type/togetherType'
import { togetherService } from 'services/community/togetherService'

const DetailGatherPeoplePage = () => {
  const BOARD_TYPE = 'together'

  const { aptId, postId } = useParams()

  const [postData, setPostData] = useState<TogetherDetailType | null>(null)

  useEffect(() => {
    const getPost = async () => {
      const response = await togetherService.getPost({
        boardType: BOARD_TYPE,
        aptId: aptId as string,
        postId: postId as string,
      })

      setPostData(response.data)
    }

    getPost()
  }, [aptId, postId])

  if (!postData) return <p></p>

  return (
    <ShadowBox $padding="30px">
      <DetailHeaderSection
        boardType={BOARD_TYPE}
        postId={postId as string}
        postData={postData}
      />
      <DetailInfoSection data={postData} />
      <DetailHtmlSection>{parse(postData.content)}</DetailHtmlSection>
      <DetailCommentSection />
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
