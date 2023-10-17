import WidgetTitleArea from 'components/community/widget-bar/WidgetTitleArea'
import React, { useEffect, useState } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaPeopleGroup } from 'react-icons/fa6'
import { GATHER_PEOPLE_MOCK } from 'mock/gatherPeopleData'
import { styled } from 'styled-components'
import { timeAgo } from 'utils/timeAgo'
import { useNavigate } from 'react-router-dom'
import { postsService } from 'services/community/postsService'
import { TogetherCardType } from 'types/community-type/togetherType'

const TogetherWidget = () => {
  const navigate = useNavigate()

  const [postList, setPostList] = useState<TogetherCardType[]>([])

  useEffect(() => {
    const getPost = async () => {
      const response = await postsService.getPosts({
        boardType: 'together',
        category: '전체',
        sort: '최신순',
        page: 1,
      })
      if (!response) return

      setPostList(
        response.data.results.filter(
          (item: TogetherCardType) => item.recruitStatus === '모집중',
        ),
      )
    }

    getPost()
  }, [])

  const moveToDetail = () => {
    navigate('/community/123/gather-people/45/detail') // 추후 경로 수정
  }

  return (
    <ShadowBox onClick={moveToDetail} $cursor="pointer">
      <WidgetTitleArea
        Icon={FaPeopleGroup}
        title="같이 하실 분 ~"
        hasSeeMore={true}
        seeMorePath="/community/123/gather-people"
      />
      {postList.map(({ id, thumbnail, title, createdBy, createdAt, description }) => (
        <StyledWrapper key={id}>
          {/* 추후 아이디로 수정 */}
          <StyledImgWrapper>
            <StyledImg src={thumbnail} alt="" />
          </StyledImgWrapper>
          <StyledDiv className="column">
            <div>
              <StyledParagraph className="md">{title}</StyledParagraph>
              <StyledParagraph className="sm">{createdBy}</StyledParagraph>
              <StyledParagraph className="sm">{timeAgo(createdAt)}</StyledParagraph>
            </div>
            <StyledParagraph className="sm">{description}</StyledParagraph>
          </StyledDiv>
        </StyledWrapper>
      ))}
    </ShadowBox>
  )
}

export default TogetherWidget

const StyledWrapper = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  border-top: 1px solid #f2f2f2;
  padding: 10px;

  &:hover {
    img {
      transform: scale(1.1);
      transition: 0.1s ease-in-out;
    }
  }
`

const StyledImgWrapper = styled.div`
  min-width: 150px;
  max-height: 140px;
  border-radius: 5px;
  overflow: hidden;
`

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
`

const StyledDiv = styled.div`
  display: flex;
  &.column {
    flex-direction: column;
    gap: 10px;
    padding: 15px;
  }

  &.end {
    justify-content: end;
    margin: 5px;
  }

  &.gap {
    gap: 5px;
  }
`

const StyledParagraph = styled.p`
  margin: 0;

  &.sm {
    font-size: 12px;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &.md {
    font-size: 15px;
    font-weight: 700;
  }

  &.lg {
    font-size: 20px;
  }

  &.xl {
    font-size: 30px;
    font-weight: 900;
  }

  &.bold {
    font-weight: 700;
  }

  &.mainColor {
    color: #2b7f75;
  }
`
