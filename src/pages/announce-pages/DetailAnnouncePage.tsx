import React, { useEffect, useState } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/common/DetailHeaderSection'
import DetailCommentSection from 'components/community/common/DetailCommentSection'
import { useParams } from 'react-router-dom'
import { AnnounceDetailType } from 'types/community-type/announceType'
import { announceService } from 'services/community/announceService'

const DetailAnnouncePage = () => {
  const BOARD_TYPE = 'announce'

  const param = useParams()
  const { aptId, postId } = param

  const [postData, setPostData] = useState<AnnounceDetailType>({
    // 찝찝
    id: 0,
    category: '',
    level: '',
    title: '',
    content: '',
    createdBy: '',
    createdAt: '',
    saw: 0,
    liked: 0,
    commentCounts: 0,
    thumbnail: '',
    floatFrom: '',
    floatTo: '',
    memberLiked: false,
    profileImage: '',
    memberCreated: false,
  })

  useEffect(() => {
    const getPost = async () => {
      const response = await announceService.getPost({
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
      <DetailHtmlSection>{parse(postData.content)}</DetailHtmlSection>
      <DetailCommentSection />
    </ShadowBox>
  )
}

export default DetailAnnouncePage

const DetailHtmlSection = styled.div`
  padding: 40px 0;
  word-break: break-all;
  img {
    max-width: 100%;
    height: auto;
  }
`
