import CkEditor from 'components/community/CkEditor'
import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { styled } from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { signupValidation } from 'constants/auth/signupValidation'
import { useTimer } from 'hooks/useTimer'
import { Button, Input, ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import contact from 'assets/terms_and_conditions/contact.md'

type ContactInputValue = {
  termsAndConditions: boolean
  name: string
  email: string
  code: string
  nonMember: boolean
  title: string
  content: string
}

const ContactPage = () => {
  const [inputValue, setInputValue] = useState<ContactInputValue>({
    termsAndConditions: false,
    name: '',
    email: '',
    code: '',
    nonMember: false,
    title: '',
    content: '',
  })
  const [termsAndConditionsContent, setTermsAndConditionsContent] = useState<string>('')

  const { termsAndConditions, name, email, code, nonMember, title, content } = inputValue
  const isEmailAuthCodeValid = signupValidation.code.validator(code)

  const { startTimer, secondsLeft, formattedTimeLeft } = useTimer()
  const TIMER_SECONDS = 180

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'nonMember') {
      //TODO: 서버요청
      startTimer(TIMER_SECONDS)
    }
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }))
  }

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const checkEmailAuth = (e: MouseEvent<HTMLButtonElement>) => {
    //TODO: 서버요청
  }

  const submitContactForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: 서버요청
  }

  fetch(contact)
    .then((res) => res.text())
    .then((text) => setTermsAndConditionsContent(text))

  return (
    <Container>
      <Inner
        className="fullScreen"
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
      >
        <StyledH>광고/제휴 문의</StyledH>
        <ShadowBox $display="flex">
          <StyledForm onSubmit={submitContactForm}>
            <div>
              <StyledDiv>
                <StyledDiv className="row">
                  <StyledCheckbox
                    type="checkbox"
                    id="termsAndConditions"
                    name="termsAndConditions"
                    checked={termsAndConditions}
                    onChange={check}
                  />
                  <StyledSpan>필수</StyledSpan>
                  <Label htmlFor="termsAndConditions">
                    광고 및 제휴문의를 위한 정보 수집 및 이용동의
                  </Label>
                </StyledDiv>
                <StyledReactMarkdown>{termsAndConditionsContent}</StyledReactMarkdown>
              </StyledDiv>
              <StyledDiv>
                <Label>
                  이름<StyledSpan>필수</StyledSpan>
                </Label>
                <Input name="name" value={name} onChange={changeInputValue} />
              </StyledDiv>
              <StyledDiv>
                <Label>
                  이메일<StyledSpan>필수</StyledSpan>
                </Label>
                <Input name="email" value={email} onChange={changeInputValue} />
                <StyledDiv className="row">
                  <StyledCheckbox
                    type="checkbox"
                    id="nonMember"
                    name="nonMember"
                    checked={nonMember}
                    onChange={check}
                  />
                  <StyledLabel htmlFor="nonMember">
                    비회원일경우 선택해주세요. 이메일 인증이 필요합니다.
                  </StyledLabel>
                </StyledDiv>
              </StyledDiv>
              <StyledDiv>
                <Label>인증코드</Label>
                <StyledDiv className="row">
                  <Input name="code" value={code} onChange={changeInputValue} />
                  <StyledButton onClick={checkEmailAuth} disabled={!isEmailAuthCodeValid}>
                    인증
                  </StyledButton>
                </StyledDiv>
                {secondsLeft > 0 && (
                  <StyledP className="waiting">
                    이메일이 발송되었습니다. 3분 이내에 인증번호를 입력해주세요. 남은시간{' '}
                    {formattedTimeLeft}
                  </StyledP>
                )}
                {/* <StyledP className='success'>인증이 완료되었습니다.</StyledP>
                <StyledP className='fail'>이메일이 일치하지 않습니다. 다시 확인해주세요. 남은시간: 2:30</StyledP> */}
              </StyledDiv>
            </div>
            <div>
              <StyledDiv>
                <Label>
                  제목<StyledSpan>필수</StyledSpan>
                </Label>
                <Input name="title" value={title} onChange={changeInputValue} />
              </StyledDiv>
              <StyledDiv>
                <Label>
                  문의내용<StyledSpan>필수</StyledSpan>
                </Label>
                <CkEditor setInputValue={setInputValue} />
              </StyledDiv>
              <Button type="submit" disabled $margin="20px 0 0 0">
                제출하기
              </Button>
            </div>
          </StyledForm>
        </ShadowBox>
      </Inner>
    </Container>
  )
}

export default ContactPage

const StyledH = styled.h1`
  margin-right: auto;
`

const StyledForm = styled.form`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 20px;
  gap: 40px;
  & > div {
    width: 100%;
    height: 100%;
  }
`

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.className === 'row' ? 'row' : 'column')};
  align-items: ${(props) => props.className === 'row' && 'center'};
`

const Label = styled.label`
  font-size: 15px;
`

const StyledCheckbox = styled(Input)`
  width: 20px;
  height: 20px;
`

const StyledSpan = styled.span`
  font-size: 13px;
  color: #e18745;
  margin-left: 10px;
`

const StyledReactMarkdown = styled(ReactMarkdown)`
  font-size: 13px;
  border: 2px solid #f2f2f2;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
`

const StyledLabel = styled.label`
  font-size: 13px;
`

const StyledP = styled.p`
  font-size: 13px;
  color: ${(props) => {
    if (props.className === 'success') return 'green'
    else if (props.className === 'waiting') return '#303030'
    else if (props.className === 'fail') return '#EA1616'
  }};
  margin: 0;
`

const StyledButton = styled(Button)`
  letter-spacing: normal;
  width: 100px;
  margin-left: 10px;
  height: 50px;
`
