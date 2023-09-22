import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { styled } from 'styled-components'
import {
  Button,
  Input,
  Modal,
  ModalBackground,
  P,
} from 'styles/reusable-style/elementStyle'

interface Props {
  setAddModalVisible: Dispatch<SetStateAction<boolean>>
}

const AddCategoryModal: FC<Props> = ({ setAddModalVisible }) => {
  const [inputValue, setInputValue] = useState('')
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const cancelAddCategory = () => {
    setAddModalVisible(false)
  }

  const addCategory = () => {
    alert(`${inputValue} 등록됐다 칩시다!`)
    setAddModalVisible(false)
  }

  return (
    <ModalBackground>
      <Modal
        $display="flex"
        $flexDirection="column"
        $justifyContent="center"
        $width="350px"
        $height="350px"
        $gap="30px"
      >
        <P $fontSize="20px" $fontWeight="700">
          새 카테고리 생성
        </P>

        <StyledDiv>
          <P $fontSize="15px" $lineHeight="30px">
            잠깐!
          </P>
          <P $fontSize="12px" $lineHeight="15px">
            우리 주민들이 함께 활동하는 공간이에요.
            <br />
            모두가 애용할 수 있는 카테고리를 만들어 주실거죠?
          </P>
        </StyledDiv>
        <StyledDiv>
          <Input
            onChange={changeInputValue}
            value={inputValue}
            placeholder="생성하실 카테고리명을 입력해주세요."
            $width="300px"
            $height="40px"
          />
          <P $fontSize="12px" $color="#EA1616">
            &nbsp; ※ 부적절한 카테고리는 경고 없이 삭제될 수 있습니다.
          </P>
        </StyledDiv>
        <StyledDiv className="flex">
          <Button
            onClick={cancelAddCategory}
            $background="#FFFFFF"
            $width="250px"
            $border="1px solid #F2F2F2"
            $color="#303030"
          >
            취소
          </Button>
          <Button onClick={addCategory}>추가</Button>
        </StyledDiv>
      </Modal>
    </ModalBackground>
  )
}

export default AddCategoryModal

const StyledDiv = styled.div`
  width: 300px;
  &.flex {
    display: flex;
    gap: 10px;
  }
`
