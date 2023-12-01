import { ComponentProps, ReactNode } from 'react'
import { styled } from 'styled-components'
import { Input } from 'styles/reusable-style/elementStyle'

interface SignupInputProps extends ComponentProps<'input'> {
  labelText: string
  info?: string
  id: string
  isValid?: boolean
  invalidMessage?: string
  children?: ReactNode
}

const SignupInput = ({
  labelText,
  info,
  value = '',
  isValid = false,
  invalidMessage = '',
  children,
  ...rest
}: SignupInputProps) => {
  return (
    <StyledInputArea>
      <StyledLabel>
        {labelText}
        {info && <StyledSpanLabelInfo>{info}</StyledSpanLabelInfo>}
      </StyledLabel>
      <StyledDiv>
        <StyledInput {...rest} />
        {children}
      </StyledDiv>
      {value && !isValid && <StyledP>{invalidMessage}</StyledP>}
    </StyledInputArea>
  )
}

export default SignupInput

const StyledInputArea = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: -10px;
`

const StyledSpanLabelInfo = styled.span`
  font-size: small;
  color: #b3b3b3;
  margin-left: 10px;
`

const StyledInput = styled(Input)`
  font-size: 15px;
  padding-right: 40px;
`

const StyledP = styled.p`
  font-size: small;
  margin: 0;
  color: #e18745;
`

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  column-gap: 5px;
  &:has(StyledP) {
    row-gap: 5px;
  }
  &:has(Button) {
    & > Input {
      grid-column: 1 / span 8;
      grid-row: 1;
    }
    & > Button {
      grid-column: 9 / span 2;
      grid-row: 1;
    }
  }
  & > Input {
    grid-column: 1 / span 10;
    grid-row: 1;
  }
`
