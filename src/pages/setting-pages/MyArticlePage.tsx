import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import { userService } from 'services/auth/userService'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { MyArticle, ResultWithData } from 'types/settingType'
import { timeAgo } from 'utils/timeAgo'
import { SIZE_OPTION } from 'constants/setting/pagination'
import Pagination from 'components/common/Pagination'
import { useNavigate } from 'react-router-dom'
import { PAGE_ARTICLE_DETAIL } from 'constants/setting/path'

const makeIndexList = (totalCount: number, size: number) => {
  const indexArray = Array(totalCount)
    .fill(undefined)
    .map((_, index) => index + 1)
    .reverse()

  const newArray: number[][] = []
  for (let i = 0; i < indexArray.length; i += size) {
    newArray.push(indexArray.slice(i, i + size))
  }

  return newArray
}

const MyArticlePage = () => {
  const [myArticleList, setMyArticleList] = useState<MyArticle[]>([])
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [indexList, setIndexList] = useState<number[][]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const viewMyArticle = async () => {
      const myArticleResult = await userService.myArticle(size, page)
      //10개씩보기 마지막페이지(예>14페이지) -> 30개씩보기 클릭하면 당연히 페이지수는 줄어들게 되는데 아직 14페이지로 남아있어서 에러
      //size변하면 page도 알아서 바껴야하는데, 이때 30개씩보기로 바꼈을때 10개씩보기의 첫번째아이템이 몇페이지에 있는지는 어떻게 알수있지
      //이거어떻게 하냐고 도대체??????????????????

      const { data } = myArticleResult as ResultWithData
      const { totalPages, totalCount, results } = data

      setTotalPages(totalPages)
      setIndexList(makeIndexList(totalCount, size))
      setTotalCount(totalCount)
      setMyArticleList(results)
    }

    viewMyArticle()
  }, [page, size])

  const convertedBoardType = (boardType: string) => {
    if (boardType === 'ARTICLE') return '커뮤니티'
    else if (boardType === 'ANNOUNCE') return '공지사항'
    else if (boardType === 'TOGETHER') return '함께해요'
  }

  const selectSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value))
  }

  const viewArticle = (apartCode: string, boardId: number) => {
    navigate(PAGE_ARTICLE_DETAIL(apartCode, boardId))
  }

  return (
    <Container>
      <Inner className="fullScreen" $padding="30px">
        <h2>내가 쓴 게시물</h2>
        <ShadowBox>
          {indexList.length === 0 && (
            <StyledDivNoArticle>아직 작성한 게시물이 없습니다.</StyledDivNoArticle>
          )}
          {myArticleList && indexList.length !== 0 && (
            <>
              <StyledDiv>
                <StyledFlexDiv>
                  <span>총 {totalCount}개</span>
                  <StyledSelect name="size" onChange={selectSize} value={Number(size)}>
                    {SIZE_OPTION.map(({ value, name }) => (
                      <option key={value} value={value}>
                        {name}
                      </option>
                    ))}
                  </StyledSelect>
                </StyledFlexDiv>
                <StyledUl>
                  {myArticleList?.map(
                    (
                      {
                        id,
                        apartCode,
                        boardType,
                        category,
                        level,
                        title,
                        commentCounts,
                        createdAt,
                      },
                      index,
                    ) => (
                      <StyledLi key={id} onClick={() => viewArticle(apartCode, id)}>
                        <StyledSpan className="1">
                          {indexList && indexList[page - 1][index]}
                        </StyledSpan>
                        <StyledSpan className="2">
                          {convertedBoardType(boardType)}
                        </StyledSpan>
                        <StyledSpanContainer className="6">
                          <StyledSpan>
                            {boardType === 'ANNOUNCE' ? level : category}
                          </StyledSpan>
                          <StyledBoldDiv>
                            <StyledSpan>{title}</StyledSpan>
                            <StyledText>[{commentCounts}]</StyledText>
                          </StyledBoldDiv>
                        </StyledSpanContainer>
                        <StyledSpan className="1 time">{timeAgo(createdAt)}</StyledSpan>
                      </StyledLi>
                    ),
                  )}
                </StyledUl>
              </StyledDiv>
              <Pagination
                totalPages={totalPages}
                size={size}
                page={page}
                setPage={setPage}
              />
            </>
          )}
        </ShadowBox>
      </Inner>
    </Container>
  )
}

export default MyArticlePage

const StyledDivNoArticle = styled.div`
  padding: 50px 0;
  justify-content: center;
  display: flex;
`

const StyledDiv = styled.div`
  padding: 20px;
`

const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 30px 20px;
`

const StyledSelect = styled.select`
  display: flex;
  margin-left: auto;
  height: 30px;
  border-radius: 10px;
  padding: 0 5px;
  border: 1px solid #dadada;
`

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 40px;
`

const StyledLi = styled.li`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  border-bottom: 1px solid #dadada;
  padding: 10px 20px;
  cursor: pointer;
`

const StyledSpan = styled.span`
  grid-column: ${(props) => `span ${props.className}`};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &.time {
    text-overflow: unset;
    overflow: unset;
  }
`

const StyledSpanContainer = styled.div`
  grid-column: ${(props) => `span ${props.className}`};
  display: flex;
  flex-direction: column;
`

const StyledBoldDiv = styled.div`
  display: flex;
  font-weight: 700;
  align-items: center;
  gap: 3px;

  & > span {
    align-self: center;
  }
`

const StyledText = styled.span`
  color: #2b7f75;
  font-size: 13px;
  width: fit-content;
`
