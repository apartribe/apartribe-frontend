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

export const Input = styled.input<reusableStyleProps>`
  border: none;
  outline: none;
  box-sizing: border-box;
  background: ${(props) => props.$background || '#f2f2f2'};
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '55px'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '0px  15px'};
  border-radius: ${(props) => props.$borderRadius || '10px'};
  color: ${(props) => props.$color || '#303030'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '400'};
  letter-spacing: ${(props) => props.$letterSpacing || '0px'};

  ::placeholder {
    color: #b3b3b3;
  }
`

export const ShadowBox = styled.div<reusableStyleProps>`
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  background: ${(props) => props.$background || '#FFFFFF'};
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || 'auto'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '10px'};
  display: ${(props) => props.$display || 'block'};
  flex-direction: ${(props) => props.$flexDirection || 'column'};
  justify-content: ${(props) => props.$justifyContent || 'none'};
  align-items: ${(props) => props.$alignItems || 'none'};
  gap: ${(props) => props.$gap || '0px'};
  border-radius: ${(props) => props.$borderRadius || '10px'};
  color: ${(props) => props.$color || '#303030'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '400'};

  &.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.noneShadow {
    box-shadow: none;
  }
`

export const ModalBackground = styled.div<reusableStyleProps>`
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => props.$width || '100vw'};
  height: ${(props) => props.$height || '100vh'};
`

export const Modal = styled.div<reusableStyleProps>`
  z-index: 2;
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.$background || '#FFFFFF'};
  border-radius: ${(props) => props.$borderRadius || '20px'};
  width: ${(props) => props.$width || '350px'};
  height: ${(props) => props.$height || '120px'};
  color: ${(props) => props.$color || '#303030'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '30px 0 10px 0'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '700'};
  display: ${(props) => props.$display || 'flex'};
  flex-direction: ${(props) => props.$flexDirection || 'column'};
  justify-content: ${(props) => props.$justifyContent || 'space-between'};
  align-items: ${(props) => props.$alignItems || 'center'};
  gap: ${(props) => props.$gap || '0px'};
`

export const Img = styled.img<reusableStyleProps>`
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '100%'};
  border-radius: ${(props) => props.$borderRadius || '0px'};
`
