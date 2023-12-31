import { ReactNode } from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container>
      <Inner
        className="fullScreen"
        $width="600px"
        $display="flex"
        $flexDirection="column"
        $justifyContent="center"
        $padding="30px 0"
      >
        <ShadowBox
          $display="flex"
          $flexDirection="column"
          $alignItems="center"
          $padding="30px 20px"
        >
          {children}
        </ShadowBox>
      </Inner>
    </Container>
  )
}

export default AuthLayout
