import { SymbolGoogle, SymbolKakao, SymbolNaver } from 'assets/auth'
import { styled } from 'styled-components'

export const KakaoLogin = () => {
  return (
    <StyledKaKao>
      <SymbolKakao />
      카카오로 시작하기
    </StyledKaKao>
  )
}

export const NaverLogin = () => {
  return (
    <StyledNaver>
      <SymbolNaver />
      로그인 점검 중
    </StyledNaver>
  )
}

export const GoogleLogin = () => {
  return (
    <StyledGoogle>
      <SymbolGoogle />
      로그인
    </StyledGoogle>
  )
}

const StyledKaKao = styled.div`
  background: #fee500;
  color: #000000 85%;
  border: none;
  border-radius: 12px;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 17px;
  font-weight: 700;
`

const StyledNaver = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 17px;
  font-weight: 700;
`

const StyledGoogle = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 17px;
  font-weight: 700;
`
