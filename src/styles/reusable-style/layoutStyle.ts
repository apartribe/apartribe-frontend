import { styled } from 'styled-components'
import { reusableStyleProps } from 'types/style-type/reusableStyleType'

export const Container = styled.main<reusableStyleProps>`
  background: ${(props) => props.$background || '#f2f2f2'};
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || 'auto'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '0px'};
`

export const Inner = styled.div<reusableStyleProps>`
  box-sizing: border-box;
  background: ${(props) => props.$background || '#f2f2f2'};
  width: ${(props) => props.$width || '1280px'};
  height: ${(props) => props.$height || 'auto'};
  margin: ${(props) => props.$margin || '0 auto'};
  padding: ${(props) => props.$padding || '0px'};
  display: ${(props) => props.$display || 'block'};
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  justify-content: ${(props) => props.$justifyContent || 'none'};
  align-items: ${(props) => props.$alignItems || 'none'};
  gap: ${(props) => props.$gap || '0px'};

  &.fullScreen {
    min-height: calc(100vh - 50px);
  }
`
