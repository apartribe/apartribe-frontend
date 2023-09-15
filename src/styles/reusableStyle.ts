import { styled } from 'styled-components'
import { reusableStyleProps } from 'types/style-type/reusableStyleType'

export const Button = styled.button<reusableStyleProps>`
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  background: ${(props) => props.$background || '#2B7F75'};
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '55px'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '0px'};
  border-radius: ${(props) => props.$borderRadius || '10px'};
  color: ${(props) => props.$color || '#FFFFFF'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '700'};
  letter-spacing: ${(props) => props.$letterSpacing || '2px'};

  &:hover {
    filter: brightness(1.1);
  }

  &.disabled {
    background: #dadada;
    cursor: not-allowed;
  }
`
