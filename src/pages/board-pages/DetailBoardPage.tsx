import React, { useEffect } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import parse from 'html-react-parser'
import { BOARD_DETAIL_MOCK } from 'mock/boardDetailData'
import { styled } from 'styled-components'
import DetailHeaderSection from 'components/community/DetailHeaderSection'
import DetailCommentSection from 'components/community/DetailCommentSection'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from 'redux/post/actions'

const DetailBoardPage = () => {
  const { data, loading, error } = useSelector((state: any) => state.post.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(getPost({ boardType: 'article', postId: 1 }))
  }, [dispatch])

  if (loading) return <div>로딩중...</div>
  if (error) return <div>에러 발생!</div>
  if (!data) return null

  return (
    <ShadowBox $padding="30px">
      <DetailHeaderSection data={data} />
      <DetailHtmlSection>{parse(data.data.content)}</DetailHtmlSection>
      {/* <DetailCommentSection commentCounts={commentCounts} comments={comments} /> */}
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
