import { useState, useRef, ChangeEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import AuthLayout from 'components/auth/AuthLayout'
import { Message } from 'types/auth'
import { Button, Img } from 'styles/reusable-style/elementStyle'
import { PAGE_SETTING } from 'constants/setting/path'
import MessageModal from 'components/common/MessageModal'
import { userService } from 'services/auth/userService'
import { updateLoginUser } from 'redux/store/userSlice'
import { useDispatch } from 'react-redux'
import defaultAvatar from 'assets/users/defaultAvatar.png'
import { useAppSelector } from 'hooks/useRedux'

const ChangeImagePage = () => {
  const { profileImageUrl } = useAppSelector((state) => state.user.userInfo)

  const [newProfileImageUrl, setNewProfileImageUrl] = useState<string>(profileImageUrl)
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })
  const fileInput = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectImage = () => {
    fileInput.current?.click()
  }

  /* const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      const blob = new Blob([file as File])
      const pdfUrl = URL.createObjectURL(blob)
      console.log(file, blob, pdfUrl)
      setNewProfileImageUrl(pdfUrl)
    }
  } */
  const uploadToS3 = async (e: ChangeEvent<HTMLInputElement>) => {
    /* const resopnse = await uploadS3(e.target.files[0])
    setNewProfileImageUrl(resposne.Location) */
  }

  const cancelChangeImage = () => {
    setNewProfileImageUrl('')
    navigate(PAGE_SETTING)
  }

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const uploadImage = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { result, message } = await userService.updateImage(newProfileImageUrl)
    openModal({ status: result, message, goTo: PAGE_SETTING })

    if (result === 'success') {
      console.log('newProfileImageUrl', newProfileImageUrl)
      dispatch(updateLoginUser({ profileImageUrl: newProfileImageUrl }))
    }
  }

  return (
    <>
      <AuthLayout>
        <StyledH>프로필 이미지 변경</StyledH>
        <StyledForm onSubmit={uploadImage}>
          <Img
            src={newProfileImageUrl || defaultAvatar}
            onClick={selectImage}
            $width="100px"
            $height="100px"
            $borderRadius="50%"
            $lineHeight="12px"
            $margin="5px 0"
          />
          <StyledInput
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            name="image"
            onChange={/* changeImage */ uploadToS3}
            ref={fileInput}
          />
          <span>위 이미지를 클릭해 새로운 프로필을 등록하세요</span>
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
