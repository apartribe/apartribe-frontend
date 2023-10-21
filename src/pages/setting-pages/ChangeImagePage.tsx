import { useState, useRef, ChangeEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import AuthLayout from 'components/auth/AuthLayout'
import { Message } from 'types/auth'
import { Button } from 'styles/reusable-style/elementStyle'
import { PAGE_SETTING } from 'constants/setting/path'
import MessageModal from 'components/common/MessageModal'
import { user } from 'services/user'
import { IoPersonCircle } from 'react-icons/io5'

const ChangeImagePage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })
  const fileInput = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const selectImage = () => {
    fileInput.current?.click()
  }

  const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    if (e.target.files[0]) {
      setFile(e.target.files[0])
    } else {
      setImagePreview('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result as string)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const cancelChangeImage = () => {
    setImagePreview('')
    navigate(PAGE_SETTING)
  }

  const openModal = (status: 'waiting' | 'success' | 'fail', message: string) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message })
  }

  const uploadImage = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    //TODO: 프로필 이미지 변경 백엔드 완료되면 연동, 모달 띄워서 응답메세지 출력
  }

  return (
    <>
      <AuthLayout>
        <StyledH>프로필 이미지 변경</StyledH>
        <StyledForm onSubmit={uploadImage}>
          {imagePreview.length === 0 ? (
            <StyledIcon onClick={selectImage} />
          ) : (
            <StyledImage src={imagePreview} onClick={selectImage} />
          )}
          <StyledInput
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            name="image"
            onChange={changeImage}
            ref={fileInput}
          />
          <StyledDiv>
            <StyledCancelButton type="button" onClick={cancelChangeImage}>
              취소
            </StyledCancelButton>
            <Button type="submit">등록</Button>
          </StyledDiv>
        </StyledForm>
      </AuthLayout>
      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </>
  )
}

export default ChangeImagePage

const StyledH = styled.h2`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > * {
    margin: auto;
  }
`

const StyledIcon = styled(IoPersonCircle)`
  width: 200px;
  height: 200px;
  color: #dadada;
  cursor: pointer;
`

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  padding: 18px;
  border-radius: 50%;
  cursor: pointer;
`

const StyledInput = styled.input`
  display: none;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  & > button {
    width: 100px;
    height: 50px;
  }
`

const StyledCancelButton = styled(Button)`
  background: #fff;
  color: #303030;
  border: 1px solid #dadada;
`
