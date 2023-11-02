// 서버측 API 미완성으로 인한 주석처리

import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { styled } from 'styled-components'
import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import DetailHeaderSection from 'components/community/common/DetailHeaderSection'
import DetailCommentSection from 'components/community/common/DetailCommentSection'
import DetailInfoSection from 'components/community/together-page/DetailInfoSection'
import { useParams } from 'react-router-dom'
import { TogetherDetailType } from 'types/community-type/togetherType'
import { togetherService } from 'services/community/togetherService'

const DetailTogetherPage = () => {
  const BOARD_TYPE = 'together'

  const { aptId, postId } = useParams()

  const [postData, setPostData] = useState<TogetherDetailType>({
    // 찝찝
    id: 0,
    category: '',
    title: '',
    content: '',
    createdAt: '',
    createdBy: '',
    liked: 0,
    saw: 0,
    commentCounts: 0,
    thumbnail: '',
    recruitFrom: '',
    recruitTo: '',
    meetTime: '',
    location: '',
    target: '',
    contributeStatus: false,
    recruitStatus: '',
    memberLiked: false,
    profileImage: '',
    memberCreated: false,
  })

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
        postData={postData}
        setPostData={setPostData}
      />
      <DetailInfoSection data={postData} />
      <DetailHtmlSection>{parse(postData.content)}</DetailHtmlSection>
      <DetailCommentSection />
    </ShadowBox>
  )
}

export default DetailTogetherPage

const DetailHtmlSection = styled.div`
  word-break: break-all;
  img {
    max-width: 100%;
    height: auto;
  }
`
