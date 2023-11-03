import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import { user } from 'services/user'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { MyComment, ResultWithData } from 'types/setting'
import { timeAgo } from 'utils/timeAgo'
import { SIZE_OPTION } from 'constants/setting/pagination'
import Pagination from 'components/common/Pagination'
import { useAppSelector } from 'hooks/useRedux'
import { useNavigate } from 'react-router-dom'
import { PAGE_ARTICLE_DETAIL } from 'constants/setting/path'

const MyCommentPage = () => {
  const [myCommentList, setMyCommentList] = useState<MyComment[]>([])
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [indexList, setIndexList] = useState<number[][]>([])

  const navigate = useNavigate()
  const { apartCode } = useAppSelector((state) => state.user.userInfo)

  useEffect(() => {
    const viewMyComment = async () => {
      const myCommentResult = await user.MyComment(size, page)
      const { data } = myCommentResult as ResultWithData
      setTotalPages(data.totalPages)
      setMyCommentList(data.results)
      setTotalCount(data.totalCount)
    }

    viewMyComment()
  }, [page, size])

  useEffect(() => {
    if (!totalCount) return

    const indexArray = Array(totalCount)
      .fill(undefined)
      .map((_, index) => index + 1)
      .reverse()

    const newArray: number[][] = []
    for (let i = 0; i < indexArray.length; i += size) {
      newArray.push(indexArray.slice(i, i + size))
    }

    setIndexList(newArray)
  }, [totalCount, size])

  const convertedBoardType = (boardType: string) => {
    if (boardType === 'ARTICLE') return '커뮤니티'
    else if (boardType === 'ANNOUNCE') return '공지사항'
    else if (boardType === 'TOGETHER') return '함께해요'
  }

  const selectSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value))
  }

  const viewArticle = (e: MouseEvent<HTMLLIElement>) => {
    const boardId = e.currentTarget.value
    navigate(PAGE_ARTICLE_DETAIL(apartCode, boardId))
  }

  return (
    <Container>
      <Inner className="fullScreen" $padding="30px">
        <h2>내가 쓴 댓글</h2>
        <ShadowBox>
          {indexList.length === 0 && (
            <StyledDivNoArticle>아직 작성한 댓글이 없습니다.</StyledDivNoArticle>
          )}
          {myCommentList && indexList.length !== 0 && (
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
                  {myCommentList?.map(
                    (
                      {
                        id,
                        boardId,
                        boardType,
                        category,
                        level,
                        boardTitle,
                        content,
                        createdAt,
                      },
                      index,
                    ) => (
                      <StyledLi key={id} value={boardId} onClick={viewArticle}>
                        <StyledSpan className="1">
                          {indexList && indexList[page - 1][index]}
                        </StyledSpan>
                        <StyledSpan className="2">
                          {convertedBoardType(boardType)}
                        </StyledSpan>
                        <StyledSpanContainer className="6">
                          <StyledSpan>
                            {boardType === 'ANNOUNCE' ? level : category}&gt;{boardTitle}
                          </StyledSpan>
                          <StyledBoldSpan>{content}</StyledBoldSpan>
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

export default MyCommentPage

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

const StyledBoldSpan = styled.span`
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
