import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ko, { addMonths } from 'date-fns'
import { styled } from 'styled-components'
import ko from 'date-fns/locale/ko' // 한국어로
import { Announce } from 'types/community-type/annoucementType'

interface Props<T> {
  inputValue: T
  setInputValue: Dispatch<SetStateAction<T>>
}

// 제네릭 컴포넌트
const RangeDatePicker = <T extends Announce>({ inputValue, setInputValue }: Props<T>) => {
  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates

    setInputValue((prevState) => ({ ...prevState, startDate: start, endDate: end }))
  }

  registerLocale('ko', ko) // 한국어로

  return (
    <StyledDatePicker
      selected={inputValue.startDate}
      onChange={onChange}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 5)}
      startDate={inputValue.startDate}
      endDate={inputValue.endDate}
      selectsRange
      showDisabledMonthNavigation
      dateFormat="yyyy/MM/dd"
      //====
      isClearable
      placeholderText="클릭하여 기간을 선택하세요."
      closeOnScroll={true}
      locale="ko"
    />
  )
}

export default RangeDatePicker

const StyledDatePicker = styled(DatePicker)`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #f2f2f2;
  padding: 20px;
  letter-spacing: 2px;
  color: #303030;
`
