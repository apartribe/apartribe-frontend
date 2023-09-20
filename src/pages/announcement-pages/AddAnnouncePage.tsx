import React, { ChangeEvent, useState } from 'react'
import CkEditor from 'components/community/CkEditor'
import { Button, Input, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import DropdownCategory from 'components/ui/DropdownCategory'
import { ANNOUNCE_CATEGOTY_LIST_MOCK } from 'mock/categoryData'
import { styled } from 'styled-components'
import { URGENCY_GUIDE_LIST } from 'constants/urgencyGuideList'
import { Announce } from 'types/community-type/postDataType'
import RangeDatePicker from 'components/community/RangeDatePicker'

const AddAnnouncePage = () => {
  const [inputValue, setInputValue] = useState<Announce>({
    //<Announce>
    category: '일반',
    protected: false,
    title: '',
    content: '',
    startDate: new Date(),
    endDate: null,
  })

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const toggleCheckValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, protected: e.target.checked }))
  }

  const selectRadioValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, category: e.target.name }))
  }

  console.log(inputValue)

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="20px" $padding="30px">
      <StyledDiv>
        <P $fontWeight="700" $fontSize="20px" $lineHeight="40px">
          공지사항 작성
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
          긴급도
        </P>

        <StyledDiv className="column">
          {ANNOUNCE_CATEGOTY_LIST_MOCK.slice(1).map((category, index) => (
            <StyledLabel htmlFor={category} key={index}>
              <input
                type="radio"
                name={category}
                value={category}
                checked={category === inputValue.category}
                onChange={selectRadioValue}
              />
              <P $fontWeight="900">{category}</P>
              <P $fontSize="12px" $lineHeight="10px">
                {URGENCY_GUIDE_LIST[index]}
              </P>
            </StyledLabel>
          ))}
        </StyledDiv>
      </div>
      <div>
        <P $fontWeight="700" $lineHeight="40px">
          커뮤니티 홈 위젯 노출 기간
        </P>
        <RangeDatePicker inputValue={inputValue} setInputValue={setInputValue} />
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

export default AddAnnouncePage

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  &.column {
    flex-direction: column;
  }
`

const StyledLabel = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
`
