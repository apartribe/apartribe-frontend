import WidgetTitleArea from 'components/community/widget-bar/WidgetTitleArea'
import React, { useState, useEffect } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaRankingStar } from 'react-icons/fa6'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { widgetService } from 'services/community/widgetSevice'
import { BestPost } from 'types/community-type/widgetType'

const BestPostsWidget = () => {
  const navigate = useNavigate()
  const { aptId } = useParams()

  const [bestPosts, setBestPosts] = useState<BestPost[]>([])

  const moveToDetail = (id: number, boardType: string) => {
    navigate(`/community/${aptId}/${boardType}/${id}/detail`) // 추후 경로 수정
  }

  useEffect(() => {
    const getBestPosts = async () => {
      const response = await widgetService.getBestPosts({ aptId: aptId as string })
      setBestPosts(response.data)
    }

    getBestPosts()
  }, [aptId])

  return (
    <ShadowBox>
      <WidgetTitleArea Icon={FaRankingStar} title="베스트 게시물" hasSeeMore={false} />
      {bestPosts?.length === 0 ? (
        <StyledParagraph className="noData">표시할 게시물이 없습니다.</StyledParagraph>
      ) : (
        <>
          {bestPosts.map(({ id, boardType, title }) => (
            <StyledParagraph key={id} onClick={() => moveToDetail(id, boardType)}>
              {title}
            </StyledParagraph>
          ))}
        </>
      )}
    </ShadowBox>
  )
}

export default BestPostsWidget

const StyledParagraph = styled.div`
  margin: 0 5px;
  border-top: 1px solid #f2f2f2;
  line-height: 35px;
  font-size: 13px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  &.noData {
    border-top: none;
    line-height: 20px;
    font-size: 12px;
    padding-left: 25px;
  }
`
