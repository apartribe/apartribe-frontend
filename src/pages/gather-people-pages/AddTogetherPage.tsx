import React, { ChangeEvent, useState, useEffect } from 'react'
import CkEditor from 'components/community/common/CkEditor'
import { Button, Input, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import DropdownCategory from 'components/ui/DropdownCategory'
import { styled } from 'styled-components'
import { AddTogetherType } from 'types/community-type/togetherType'
import RangeDatePicker from 'components/community/together-page/TogetherRangeDatePicker'
import { categoryService } from 'services/community/categoryService'
import { useNavigate, useParams } from 'react-router-dom'
import { Category } from 'types/community-type/categoryType'
import { togetherService } from 'services/community/togetherService'
import uploadS3 from 'utils/uploadS3'

const AddTogetherPage = () => {
  const BOARD_TYPE = 'together'

  const { aptId } = useParams()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState<AddTogetherType>({
    category: '',
    title: '',
    content: '',
    thumbnail: '',
    description: '',
    recruitFrom: new Date(),
    recruitTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 뒤
    meetTime: '',
    target: '',
    location: '',
    contributeStatus: false,
  })

  const [categoryList, setCategoryList] = useState<string[]>([])

  useEffect(() => {
    const getCategory = async () => {
      const response = await categoryService.getCategory({
        aptId: aptId as string,
        boardType: BOARD_TYPE,
      })
      const mappedResponse = response.data.map((item: Category) => item.categoryName)
      setCategoryList(['전체', ...mappedResponse])
    }

    getCategory()
  }, [])

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  // const toggleCheckValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue((prevState) => ({ ...prevState, protected: e.target.checked }))
  // }

  const savePost = async () => {
    const { statusCode, message } = await togetherService.addPost({
      aptId: aptId as string,
      boardType: BOARD_TYPE,
      data: inputValue,
    })
    if (statusCode === 201) {
      const userConfirmed = confirm('정말 등록 하시겠습니까?')
      if (userConfirmed) {
        alert(message)
        navigate(`/community/${aptId}/together`)
        return
      }
      return
    }
  }

  const cancelPost = () => {
    const userConfirmed = confirm(
      '작성중인 내용은 복구할 수 없습니다. 정말 취소 하시겠습니까? ',
    )
    if (userConfirmed) {
      navigate(-1)
      return
    }
    return
  }

  const uploadToS3 = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await uploadS3(e.target.files?.[0])
    setInputValue((prevState) => ({ ...prevState, thumbnail: response.Location }))
  }

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="20px" $padding="30px">
      <StyledWrapper>
        <P $fontWeight="700" $fontSize="20px" $lineHeight="40px">
          같이 하실 분 작성
        </P>
        <StyledWrapper>
          <P $fontWeight="700" $fontSize="12px" $lineHeight="35px">
            우리 아파트 주민에게만 공개
          </P>
          {/* <input
            type="checkbox"
            id="toggle"
            checked={inputValue.protected}
            onChange={toggleCheckValue}
            hidden
          /> */}
          <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton"></span>
          </label>
        </StyledWrapper>
      </StyledWrapper>
      <div>
        <P $fontWeight="700" $lineHeight="40px">
          카테고리
        </P>
        <DropdownCategory
          selectedValue={inputValue}
          setSelectedValue={setInputValue}
          dropdownList={categoryList}
        />
      </div>
      <div>
        <P $fontWeight="700" $lineHeight="30px">
          제목
        </P>
        <Input
          type="text"
          name="title"
          value={inputValue.title}
          onChange={changeInputValue}
          placeholder="제목을 입력하세요."
          $height="50px"
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
        />
      </div>
      <P $fontWeight="700" $lineHeight="30px">
        썸네일
      </P>
      <StyledDiv className="row">
        <Input // 파일의 이름을 보여주는 input태그
          id="profileImage"
          value={inputValue.thumbnail}
          readOnly
          disabled
          $height="50px"
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
        />
        <input // 실제로 업로드를 해주는 input 택그
          type="file"
          id="thumbnail"
          name="profileImage"
          onChange={uploadToS3}
          hidden
        />
        <StyledLabel htmlFor="thumbnail">파일 선택</StyledLabel>
      </StyledDiv>
      <div>
        <P $fontWeight="700" $lineHeight="30px">
          한 줄 설명
        </P>
        <Input
          type="text"
          name="description"
          value={inputValue.description}
          onChange={changeInputValue}
          placeholder="한 줄 설명을 입력하세요."
          $height="50px"
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
        />
      </div>
      <StyledDiv className="column">
        <P $fontWeight="700" $lineHeight="40px">
          필수정보
        </P>
        <StyledDiv className="row">
          <P $whiteSpace="nowrap">모집 기간 : </P>
          <RangeDatePicker inputValue={inputValue} setInputValue={setInputValue} />
        </StyledDiv>
        <StyledDiv className="row">
          <P $whiteSpace="nowrap">활동 시간 : </P>
          <Input
            type="text"
            name="meetTime"
            value={inputValue.meetTime}
            onChange={changeInputValue}
            placeholder="ex) 매주 토요일 17시"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          />
        </StyledDiv>
        <StyledDiv className="row">
          <P $whiteSpace="nowrap">활동 장소 : </P>
          <Input
            type="text"
            name="location"
            value={inputValue.location}
            onChange={changeInputValue}
            placeholder="ex) 종합운동장 A 풋살장"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          />
        </StyledDiv>
        <StyledDiv className="row">
          <P $whiteSpace="nowrap">모집 대상 : </P>
          <Input
            type="text"
            name="target"
            value={inputValue.target}
            onChange={changeInputValue}
            placeholder="ex) 20 ~ 40대 청년 (남녀 무관)"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          />
        </StyledDiv>
        <StyledDiv className="row">
          <P $whiteSpace="nowrap">회비 여부 : </P>
          {/* 백엔드 착오로 인한 임시 주석 */}
          {/* <Input
            type="text"
            name="contributeStatus"
            value={inputValue.contributeStatus}
            onChange={changeInputValue}
            placeholder="ex) 월 1만원 (식수 및 음료 구매비)"
            $height="50px"
            $background="#FFFFFF"
            $border="1px solid #F2F2F2"
          /> */}
          <input
            type="checkbox"
            checked={inputValue.contributeStatus}
            name="contributeStatus"
            onChange={(e) =>
              setInputValue((prev: AddTogetherType) => ({
                ...prev,
                contributeStatus: e.target.checked,
              }))
            }
          />
        </StyledDiv>
      </StyledDiv>

      <div>
        <P $fontWeight="700" $lineHeight="30px">
          상세 정보
        </P>
        <CkEditor
          inputValue={inputValue}
          setInputValue={setInputValue}
          doNotSaveThumbnail
        />
      </div>
      <StyledWrapper>
        <Button
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
          $color="#303030"
          onClick={cancelPost}
        >
          취소
        </Button>
        <Button onClick={savePost}>저장</Button>
      </StyledWrapper>
    </ShadowBox>
  )
}

export default AddTogetherPage

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  &.column {
    flex-direction: column;
  }
`

const StyledDiv = styled.div`
  display: flex;
  &.row {
    gap: 10px;
    align-items: center;
  }

  &.column {
    gap: 10px;
    flex-direction: column;
  }
`

const StyledLabel = styled.label`
  box-sizing: border-box;
  background: #ffffff;
  height: 50px;
  width: 150px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;

  &.mini {
    border: none;
    height: 15px;
    width: 25px;
    padding: 0px;
    font-size: 12px;
    color: #303030;
    margin-bottom: 25px;
  }

  &:hover {
    transform: scale(1.05);
  }
`
