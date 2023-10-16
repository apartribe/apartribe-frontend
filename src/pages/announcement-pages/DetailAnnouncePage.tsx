import React, { useEffect, useState } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'
import { useParams } from 'react-router-dom'
import { articleService } from 'services/community/articleService'
import { AnnounceDetailType } from 'types/community-type/announceType'
import { announceService } from 'services/community/announceService'

const DetailAnnouncePage = () => {
  const BOARD_TYPE = 'announce'

  const param = useParams()
  const { aptId, postId } = param

  const [postData, setPostData] = useState<AnnounceDetailType | null>(null)

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
        postId={postId as string}
        postData={postData}
      />
      <DetailHtmlSection>{parse(postData.content)}</DetailHtmlSection>
      <DetailCommentSection />
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
