import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import { user } from 'services/user'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { MyComment, ResultWithData } from 'types/setting'
import { timeAgo } from 'utils/timeAgo'
import { SIZE_OPTION } from 'constants/setting/pagination'
import Pagination from 'components/common/Pagination'

const MyCommentPage = () => {
  const [myCommentList, setMyCommentList] = useState<MyComment[]>([])
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [indexList, setIndexList] = useState<number[][]>([])

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

  const viewComment = (e: MouseEvent<HTMLLIElement>) => {
    //TODO: 게시물 페이지로 navigate
  }

  return (
    <>
      {myCommentList && indexList.length !== 0 && (
        <Container>
          <Inner className="fullScreen" $padding="30px">
            <h2>내가 쓴 댓글</h2>
            <ShadowBox>
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
                      /* TODO: 클릭시 해당 게시판으로 이동하려고 boardId 얘 가져옴 */
                      <StyledLi key={id} id={String(id)} onClick={viewComment}>
                        <StyledSpan className="1">
                          {indexList && indexList[page - 1][index]}
                        </StyledSpan>
                        <StyledSpan className="2">
                          {convertedBoardType(boardType)}
                        </StyledSpan>
                        <StyledSpanContainer className="6">
                          <span>
                            {boardType === 'ANNOUNCE' ? level : category}&gt;{boardTitle}
                          </span>
                          <StyledBoldSpan>{content}</StyledBoldSpan>
                        </StyledSpanContainer>
                        <StyledSpan className="1">{timeAgo(createdAt)}</StyledSpan>
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
            </ShadowBox>
          </Inner>
        </Container>
      )}
    </>
  )
}

export default MyCommentPage

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
