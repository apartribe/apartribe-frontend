import { styled } from 'styled-components'
import { reusableStyleProps } from 'types/style-type/reusableStyleType'

export const P = styled.p<reusableStyleProps>`
  word-break: break-all;
  margin: 0;
  line-height: ${(props) => props.$lineHeight || '25px'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '400'};
  letter-spacing: ${(props) => props.$letterSpacing || '0px'};
  color: ${(props) => props.$color || '#303030'};
  white-space: ${(props) => props.$whiteSpace || 'none'};
`

export const Button = styled.button<reusableStyleProps>`
  border: none;
  box-sizing: border-box;
  cursor: ${(props) => props.$cursor || 'pointer'};
  background: ${(props) => props.$background || '#2B7F75'};
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '55px'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '0px'};
  border: ${(props) => props.$border || 'none'};
  border-radius: ${(props) => props.$borderRadius || '10px'};
  color: ${(props) => props.$color || '#FFFFFF'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '700'};
  letter-spacing: ${(props) => props.$letterSpacing || '2px'};

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    background: #dadada;
    cursor: not-allowed;
  }
`

export const Input = styled.input<reusableStyleProps>`
  outline: none;
  box-sizing: border-box;
  background: ${(props) => props.$background || '#f2f2f2'};
  box-shadow: ${(props) => props.$boxShadow || 'none'};
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '50px'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '0px  15px'};
  border: ${(props) => props.$border || 'none'};
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
  box-sizing: border-box;
  overflow: ${(props) => props.$overflow || 'hidden'};
  background: ${(props) => props.$background || '#FFFFFF'};
  box-shadow: ${(props) => props.$boxShadow || '5px 5px 4px -1px rgba(0, 0, 0, 0.25)'};
  position: ${(props) => props.$position || 'relative'};
  top: ${(props) => props.$top || 'none'};
  bottom: ${(props) => props.$bottom || 'none'};
  left: ${(props) => props.$left || 'none'};
  right: ${(props) => props.$right || 'none'};
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || 'auto'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '10px'};
  display: ${(props) => props.$display || 'block'};
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  justify-content: ${(props) => props.$justifyContent || 'none'};
  align-items: ${(props) => props.$alignItems || 'none'};
  gap: ${(props) => props.$gap || '0px'};
  border: ${(props) => props.$border || 'none'};
  border-radius: ${(props) => props.$borderRadius || '10px'};
  color: ${(props) => props.$color || '#303030'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '400'};
  cursor: ${(props) => props.$cursor || 'auto'};

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
  position: fixed;
  top: 0;
  left: 0;
  background: ${(props) => props.$background || 'rgba(0, 0, 0, 0.5)'};
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
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  justify-content: ${(props) => props.$justifyContent || 'space-between'};
  align-items: ${(props) => props.$alignItems || 'center'};
  gap: ${(props) => props.$gap || '0px'};
`

export const Img = styled.img<reusableStyleProps>`
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '100%'};
  border-radius: ${(props) => props.$borderRadius || '0px'};
  margin: ${(props) => props.$margin || '0px'};
`

export const ArrowButton = styled.div<reusableStyleProps>`
  width: 40px;
  min-width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border-radius: 50%;
  /* white-space: nowrap; */
  cursor: pointer;
  background: ${(props) => props.$background || '#c1e2dd'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '0px'};
  border: ${(props) => props.$border || 'none'};
  font-size: ${(props) => props.$fontSize || '15px'};
  font-weight: ${(props) => props.$fontWeight || '400'};
  text-align: center;
  line-height: ${(props) => props.$lineHeight || '40px'};

  &:hover {
    transform: scale(0.95);
  }

  &.disabled {
    background: #f2f2f2;
    cursor: auto;
    transform: scale(1);

    &:hover {
      transform: none;
    }
  }
`

export const Badge = styled.div<reusableStyleProps>`
  text-align: center;
  line-height: 20px;
  position: ${(props) => props.$position || 'relative'};
  top: ${(props) => props.$top || 'none'};
  bottom: ${(props) => props.$bottom || 'none'};
  left: ${(props) => props.$left || 'none'};
  right: ${(props) => props.$right || 'none'};
  background: ${(props) => props.$background || '#1A2A3A'};
  margin: ${(props) => props.$margin || '0px'};
  padding: ${(props) => props.$padding || '0 10px'};
  color: ${(props) => props.$color || '#FFFFFF'};
  width: ${(props) => props.$width || 'auto'};
  height: ${(props) => props.$height || '20px'};
  border-radius: ${(props) => props.$borderRadius || '30px'};
  font-size: ${(props) => props.$fontSize || '10px'};
  font-weight: ${(props) => props.$fontWeight || '400'};
`
