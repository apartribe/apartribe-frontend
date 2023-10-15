import React, { useState, useEffect } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'
import { useParams } from 'react-router-dom'
import { postService } from 'services/community/postService'

export interface BoardPostData {
  issuedAt: string
  data: {
    id: number
    title: string
    createdBy: string
    saw: number
    liked: number
    commentCounts: number
    content: string
  }
}

const DetailBoardPage = () => {
  const BOARD_TYPE = 'article'

  const { aptId, postId } = useParams()

  const [postData, setPostData] = useState<BoardPostData | null>(null)

  useEffect(() => {
    const getPost = async () => {
      const response = await postService.getPost({
        boardType: BOARD_TYPE,
        aptId: aptId as string,
        postId: postId as string,
      })
      setPostData(response)
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
      <DetailHtmlSection>{parse(postData.data.content)}</DetailHtmlSection>
      <DetailCommentSection />
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
