import React, { ChangeEvent, useState } from 'react'
import CkEditor from 'components/community/CkEditor'
import { Button, Input, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import DropdownCategory from 'components/ui/DropdownCategory'
import { GATHER_PEOPLE_CATEGOTY_LIST_MOCK } from 'mock/categoryData'
import { styled } from 'styled-components'
import { GatherPeople } from 'types/community-type/postDataType'
import RangeDatePicker from 'components/community/RangeDatePicker'

const AddGatherPeoplePage = () => {
  const [inputValue, setInputValue] = useState<GatherPeople>({
    category: '일반',
    protected: false,
    title: '',
    explain: '',
    startDate: new Date(),
    endDate: null,
    time: '',
    place: '',
    target: '',
    dues: '',
    content: '',
  })

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const toggleCheckValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, protected: e.target.checked }))
  }

  console.log(inputValue) // 최종 결과 확인용

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="20px" $padding="30px">
      <StyledDiv>
        <P $fontWeight="700" $fontSize="20px" $lineHeight="40px">
          같이 하실 분 작성
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
          dropdownList={GATHER_PEOPLE_CATEGOTY_LIST_MOCK}
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
          한 줄 설명
        </P>
        <Input
          type="text"
          name="explain"
          value={inputValue.title}
          onChange={changeInputValue}
          placeholder="한 줄 설명을 입력하세요."
          $height="50px"
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
        />
      </div>
      <StyledLabel className="column">
        <P $fontWeight="700" $lineHeight="40px">
          필수정보
        </P>
        <StyledLabel className="row">
          <P $whiteSpace="nowrap">모집 기간 : </P>
          <RangeDatePicker inputValue={inputValue} setInputValue={setInputValue} />
        </StyledLabel>
        <StyledLabel className="row">
          <P $whiteSpace="nowrap">활동 시간 : </P>
          <Input
            type="text"
            name="time"
            value={inputValue.time}
            onChange={changeInputValue}
            placeholder="ex) 매주 토요일 17시"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          />
        </StyledLabel>
        <StyledLabel className="row">
          <P $whiteSpace="nowrap">활동 장소 : </P>
          <Input
            type="text"
            name="place"
            value={inputValue.place}
            onChange={changeInputValue}
            placeholder="ex) 종합운동장 A 풋살장"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          />
        </StyledLabel>
        <StyledLabel className="row">
          <P $whiteSpace="nowrap">모집 대상 : </P>
          <Input
            type="text"
            name="target"
            value={inputValue.target}
            onChange={changeInputValue}
            placeholder="ex) 20 ~ 40대 청년 (남녀 무관)"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          />
        </StyledLabel>
        <StyledLabel className="row">
          <P $whiteSpace="nowrap">회비 여부 : </P>
          <Input
            type="text"
            name="dues"
            value={inputValue.dues}
            onChange={changeInputValue}
            placeholder="ex) 월 1만원 (식수 및 음료 구매비)"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          />
        </StyledLabel>
      </StyledLabel>

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

export default AddGatherPeoplePage

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  &.column {
    flex-direction: column;
  }
`

const StyledLabel = styled.div`
  display: flex;
  &.row {
    gap: 10px;
    align-items: center;
  }

  &.column {
    gap: 10px;
    flex-direction: column;
  }
`
