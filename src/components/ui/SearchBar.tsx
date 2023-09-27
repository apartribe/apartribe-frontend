import React, { FC, InputHTMLAttributes, forwardRef, Ref } from 'react'
import { Input } from 'styles/reusable-style/elementStyle'
import { reusableStyleProps } from 'types/style-type/reusableStyleType'
import { styled } from 'styled-components'
import { BiSearchAlt } from 'react-icons/bi'

interface Props extends InputHTMLAttributes<HTMLInputElement>, reusableStyleProps {
  ref?: Ref<HTMLInputElement>
}

const SearchBar: FC<Props> = forwardRef((props, ref) => {
  return (
    <StyledDiv>
      <Input
        {...props}
        $background="rgba(255,255,255,0.5)"
        $boxShadow="inset 4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
        ref={ref as Ref<HTMLInputElement>} // ref를 특정 타입으로 캐스팅
      />
      <StyledIcon />
    </StyledDiv>
  )
})

SearchBar.displayName = 'SearchBar' // 컴포넌트의 이름 설정

export default SearchBar

const StyledDiv = styled.div`
  position: relative;
`

const StyledIcon = styled(BiSearchAlt)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  font-size: 30px;
  color: #555555;
`
