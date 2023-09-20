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
  value,
  isValid = false,
  invalidMessage = '',
  children,
  ...rest
}: SignupInputProps) => {
  const isEmpty = value === ''

  return (
    <StyledInputArea>
      <StyledLabel>
        {labelText}
        {info && <StyledSpanLabelInfo>{info}</StyledSpanLabelInfo>}
      </StyledLabel>
      <StyledDiv>
        <StyledInput className={!isEmpty && !isValid ? 'isInvalid' : ''} {...rest} />
        {children}
      </StyledDiv>
      {!isEmpty && !isValid && <StyledP>{invalidMessage}</StyledP>}
    </StyledInputArea>
  )
}

export default SignupInput

const StyledInputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const StyledLabel = styled.label`
  font-weight: 700;
`

const StyledSpanLabelInfo = styled.span`
  font-size: small;
  color: #b3b3b3;
  margin-left: 10px;
`

const StyledInput = styled(Input)``

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 5px;
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

const StyledP = styled.p`
  font-size: small;
  margin: 0;
  color: #e18745;
`
