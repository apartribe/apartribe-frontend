import React, { useState, useEffect } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/common/DetailHeaderSection'
import DetailCommentSection from 'components/community/common/DetailCommentSection'
import { useParams } from 'react-router-dom'
import { articleService } from 'services/community/articleService'
import { ArticleDetailType } from 'types/community-type/ArticleType'

const DetailArticlePage = () => {
  const BOARD_TYPE = 'article'

  const { aptId, postId } = useParams()

  const [postData, setPostData] = useState<ArticleDetailType>({
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
    memberLiked: false,
    profileImage: '',
    memberCreated: false,
  })

  useEffect(() => {
    const getPost = async () => {
      const response = await articleService.getPost({
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

export default DetailArticlePage

const DetailHtmlSection = styled.div`
  padding: 40px 0;
  word-break: break-all;
  img {
    max-width: 100%;
    height: auto;
  }
`
