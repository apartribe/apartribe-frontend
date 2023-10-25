import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import { user } from 'services/user'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { MyArticle, ResultWithData } from 'types/setting'
import { timeAgo } from './../../utils/timeAgo'
import Pagination from 'components/common/Pagination'

const MyArticlePage = () => {
  const [myArticleList, setMyArticleList] = useState<MyArticle[]>([])
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [indexList, setIndexList] = useState<number[][]>([])

  const SIZE_OPTION = [
    { value: 10, name: '10개씩 보기' },
    { value: 20, name: '20개씩 보기' },
    { value: 30, name: '30개씩 보기' },
  ]

  useEffect(() => {
    const viewMyArticle = async () => {
      const myArticleResult = await user.myArticle(size, page)
      const { data } = myArticleResult as ResultWithData
      setTotalPages(data.totalPages)
      setMyArticleList(data.results)
      setTotalCount(data.totalCount)
    }

    viewMyArticle()
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
    //TODO: 게시물 페이지로 navigate
  }

  return (
    <>
      {myArticleList && indexList.length !== 0 && (
        <Container>
          <Inner className="fullScreen" $width="640px" $padding="30px">
            <h2>내가 쓴 게시물</h2>
            <ShadowBox>
              <StyledDiv>
                <StyledSelect name="size" onChange={selectSize} value={Number(size)}>
                  {SIZE_OPTION.map(({ value, name }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </StyledSelect>
                <ul>
                  {myArticleList?.map(
                    ({ id, boardType, title, commentCounts, createdAt }, index) => (
                      <StyledLi key={index} id={String(id)} onClick={viewArticle}>
                        <StyledSpan className="1">
                          {indexList && indexList[page - 1][index]}
                        </StyledSpan>
                        <StyledSpan className="2">
                          {convertedBoardType(boardType)}
                        </StyledSpan>
                        <StyledSpan className="6">
                          {title} <StyledText>[{commentCounts}]</StyledText>
                        </StyledSpan>
                        <StyledSpan className="1">{timeAgo(createdAt)}</StyledSpan>
                      </StyledLi>
                    ),
                  )}
                </ul>
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

export default MyArticlePage

const StyledDiv = styled.div`
  padding: 20px;
`

const StyledSelect = styled.select`
  display: flex;
  margin-left: auto;
  height: 30px;
  border-radius: 10px;
  padding: 0 5px;
  border: 1px solid #dadada;
`

const StyledLi = styled.li`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  justify-content: space-between;
  border-bottom: 1px solid #dadada;
  padding: 10px 20px;
  cursor: pointer;
`

const StyledSpan = styled.span`
  grid-column: ${(props) => `span ${props.className}`};
`

const StyledText = styled.span`
  color: #2b7f75;
  font-size: 13px;
`
