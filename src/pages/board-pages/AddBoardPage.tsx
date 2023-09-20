import React, { ChangeEvent, useState } from 'react'
import CkEditor from 'components/community/CkEditor'
import { Button, Input, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import DropdownCategory from 'components/ui/DropdownCategory'
import { BOARD_CATEGOTY_LIST_MOCK } from 'mock/categoryData'
import { styled } from 'styled-components'

const AddBoardPage = () => {
  const [inputValue, setInputValue] = useState({
    category: '',
    protected: false,
    title: '',
    content: '',
  })

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const toggleCheckValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, protected: e.target.checked }))
  }

  console.log(inputValue)

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="20px" $padding="30px">
      <StyledDiv>
        <P $fontWeight="700" $fontSize="20px" $lineHeight="40px">
          일반 게시물 작성
        </P>
        <StyledDiv>
          <P $fontWeight="700" $fontSize="12px" $lineHeight="35px">
            우리 아파트 주민에게만 공개
          </P>
          <input
            type="checkbox"
            id="toggle"
            checked={inputValue.protected}
            onChange={toggleCheckValue}
            hidden
          />
          <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton"></span>
          </label>
        </StyledDiv>
      </StyledDiv>
      <div>
        <P $fontWeight="700" $lineHeight="40px">
          카테고리
        </P>
        <DropdownCategory
          selectedValue={inputValue}
          setSelectedValue={setInputValue}
          dropdownList={BOARD_CATEGOTY_LIST_MOCK}
        />
      </div>
      <div>
        <P $fontWeight="700" $lineHeight="30px">
          제목
        </P>
        <Input
          type="text"
          name="title"
          value={inputValue.title}
          onChange={changeInputValue}
          placeholder="제목을 입력하세요."
          $height="50px"
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
        />
      </div>
      <div>
        <P $fontWeight="700" $lineHeight="30px">
          상세 정보
        </P>
        <CkEditor setInputValue={setInputValue} />
      </div>
      <StyledDiv>
        <Button $background="#FFFFFF" $border="1px solid #F2F2F2" $color="#303030">
          취소
        </Button>
        <Button>저장</Button>
      </StyledDiv>
    </ShadowBox>
  )
}

export default AddBoardPage

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`
