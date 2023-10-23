import { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from 'react'
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai'
import { styled } from 'styled-components'

type PaginationProps = {
  totalPages: number
  size: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const makePageListBySize = (totalPages: number, size: number) => {
  const totalPageArray = Array(totalPages)
    .fill(undefined)
    .map((_, index) => index + 1)

  return Array(Math.ceil(totalPages / size))
    .fill(undefined)
    .map(() => totalPageArray.splice(0, size))
}

const Pagination = ({ totalPages, size, page, setPage }: PaginationProps) => {
  const [totalPageList, setTotalPageList] = useState<number[][]>([])
  const [currentPageList, setCurentPageList] = useState<number[]>([])

  useEffect(() => {
    const pageListBySize = makePageListBySize(totalPages, size)
    setTotalPageList(pageListBySize)
    setCurentPageList(pageListBySize[0])
  }, [totalPages, size])

  useEffect(() => {
    if (page % size === 1) {
      setCurentPageList(totalPageList[Math.floor(page / size)])
    } else if (page % size === 0) {
      setCurentPageList(totalPageList[Math.floor(page / size) - 1])
    }
  }, [totalPageList, page, size])

  const showFirst = () => {
    setPage(1)
  }
  const showPrevious = (page: number) => {
    setPage(page - 1)
  }
  const goToPage = (pageNumber: number) => {
    setPage(pageNumber)
  }
  const showNext = (page: number) => {
    setPage(page + 1)
  }
  const showLast = (totalPages: number) => {
    setPage(totalPages)
  }

  return (
    <StyledDiv>
      <StyledIconButton onClick={showFirst} disabled={page === 1}>
        <AiOutlineDoubleLeft />
      </StyledIconButton>
      <StyledIconButton onClick={() => showPrevious(page)} disabled={page === 1}>
        <AiOutlineLeft />
      </StyledIconButton>
      {currentPageList?.map((item) => (
        <StyledButton
          key={item}
          onClick={() => goToPage(item)}
          className={String(page === item)}
        >
          {item}
        </StyledButton>
      ))}
      <StyledIconButton onClick={() => showNext(page)} disabled={page === totalPages}>
        <AiOutlineRight />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => showLast(totalPages)}
        disabled={page === totalPages}
      >
        <AiOutlineDoubleRight />
      </StyledIconButton>
    </StyledDiv>
  )
}

export default Pagination

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`

const StyledButton = styled.button`
  width: 33px;
  height: 33px;
  background: ${(props) => (props.className === 'true' ? '#2B7F75' : '#dadada')};
  border: 1px solid #dadada;
  border-radius: 50%;
  cursor: pointer;
`

const StyledIconButton = styled.button`
  width: 33px;
  height: 33px;
  border: 1px solid #dadada;
  border-radius: 50%;
  cursor: pointer;
`
