import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { styled } from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { signupValidation } from 'constants/auth/signupValidation'
import { useTimer } from 'hooks/useTimer'
import { Button, Input, ShadowBox } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import contact from 'assets/terms_and_conditions/contact.md'
import { ContactInputValue } from 'types/setting'
import { advertise } from 'services/advertise'
import { Message } from 'types/auth'
import CkEditor from 'components/community/common/CkEditor'

const ContactPage = () => {
  const [inputValue, setInputValue] = useState<ContactInputValue>({
    dataCollectAgree: false,
    name: '',
    nonAuth: false,
    email: '',
    code: '',
    title: '',
    content: '',
  })
  const [termsAndConditionsContent, setTermsAndConditionsContent] = useState<string>('')

  const [confirmEmailResponseMessage, setConfirmEmailResponseMessage] = useState<Message>(
    {
      status: 'waiting',
      message: '',
    },
  )

  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const { dataCollectAgree, name, nonAuth, email, code, title, content } = inputValue

  const [responseSuccessValues, setResponseSuccessValues] = useState({
    email: false,
    code: false,
  })
  const [isRegisterPossible, setIsRegisterPossible] = useState<boolean>(false)

  const { startTimer, secondsLeft, resetTimer, formattedTimeLeft } = useTimer(
    '3분 이내에 인증번호를 입력해주세요. 남은시간:',
  )
  const TIMER_SECONDS = 180

  useEffect(() => {
    fetch(contact)
      .then((res) => res.text())
      .then((text) => setTermsAndConditionsContent(text))
  }, [])

  useEffect(() => {
    const responseSuccessList = Object.values(responseSuccessValues)
    const isAllResponseValueSuccess = responseSuccessList.reduce(
      (prev, current) => prev && current,
    )

    setIsRegisterPossible(isAllResponseValueSuccess)
  }, [responseSuccessValues])

  const openModal = (status: 'waiting' | 'success' | 'fail', message: string) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message })
  }

  const check = (e: ChangeEvent<HTMLInputElement>) => {
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

  const checkNonAuth = () => {
    setInputValue((prev) => ({ ...prev, nonAuth: true }))
  }

  const requestEmailAuth = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { result, message } = await advertise.sendEmail(name, email)
    openModal(result, message)

    if (result === 'success') {
      startTimer(TIMER_SECONDS)
      setConfirmEmailResponseMessage({ status: 'waiting', message: formattedTimeLeft })
      setResponseSuccessValues((prev) => ({ ...prev, email: true }))
    }
  }

  const confirmEmailAuth = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { result, message } = await advertise.confirmEmail(name, email, code)
    resetTimer()
    setConfirmEmailResponseMessage({ status: result, message: message })

    if (result === 'success') {
      setResponseSuccessValues((prev) => ({ ...prev, code: true }))
    }
  }

  const submitContactForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { result, message } = await advertise.addAdvertise(inputValue)
  }

  return (
    <>
      {termsAndConditionsContent.length !== 0 && (
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
                        id="dataCollectAgree"
                        name="dataCollectAgree"
                        checked={dataCollectAgree}
                        onChange={check}
                      />
                      <StyledSpan>필수</StyledSpan>
                      <Label htmlFor="dataCollectAgree">
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
                    <StyledDiv className="row" onClick={checkNonAuth}>
                      <StyledCheckbox
                        type="checkbox"
                        id="nonAuth"
                        name="nonAuth"
                        checked={nonAuth}
                        onChange={check}
                      />
                      <StyledLabel htmlFor="nonAuth">
                        비회원일경우 선택해주세요. 이메일 인증이 필요합니다.
                      </StyledLabel>
                    </StyledDiv>
                  </StyledDiv>
                  <StyledNonAuthDiv className={nonAuth ? 'show' : 'hidden'}>
                    <StyledDiv>
                      <Label>
                        이메일<StyledSpan>필수</StyledSpan>
                      </Label>
                      <StyledDiv className="row">
                        <Input name="email" value={email} onChange={changeInputValue} />
                        <StyledButton onClick={requestEmailAuth}>인증요청</StyledButton>
                      </StyledDiv>
                    </StyledDiv>
                    <StyledDiv>
                      <Label>
                        인증코드<StyledSpan>필수</StyledSpan>
                      </Label>
                      <StyledDiv className="row">
                        <Input name="code" value={code} onChange={changeInputValue} />
                        <StyledButton onClick={confirmEmailAuth}>인증</StyledButton>
                      </StyledDiv>
                      {secondsLeft > 0 && (
                        <StyledP className={confirmEmailResponseMessage.status}>
                          {secondsLeft > 0
                            ? formattedTimeLeft
                            : confirmEmailResponseMessage.message}
                        </StyledP>
                      )}
                    </StyledDiv>
                  </StyledNonAuthDiv>
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
                  <Button
                    type="submit"
                    disabled={!isRegisterPossible}
                    $margin="20px 0 0 0"
                  >
                    제출하기
                  </Button>
                </div>
              </StyledForm>
            </ShadowBox>
          </Inner>
        </Container>
      )}
    </>
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

const StyledNonAuthDiv = styled.div`
  display: ${(props) => {
    if (props.className === 'show') return 'block'
    else if (props.className === 'hidden') return 'none'
  }};
`
