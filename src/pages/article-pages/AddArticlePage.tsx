import React, { ChangeEvent, useState, useEffect } from 'react'
import CkEditor from 'components/community/common/CkEditor'
import { Button, Input, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import DropdownCategory from 'components/ui/DropdownCategory'
import { styled } from 'styled-components'
import { categoryService } from 'services/community/categoryService'
import { articleService } from 'services/community/articleService'
import { useNavigate, useParams } from 'react-router-dom'
import { AddArticleType } from 'types/community-type/ArticleType'
import { Category } from 'types/community-type/categoryType'

const AddArticlePage = () => {
  const BOARD_TYPE = 'article'

  const { aptId } = useParams()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState<AddArticleType>({
    category: '',
    // protected: false,
    title: '',
    content: '',
    thumbnail: '',
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
    if (!inputValue.category) return alert('카테고리를 선택해주세요')
    if (!inputValue.title) return alert('제목을 입력해주세요')
    if (!inputValue.content) return alert('내용을 입력해주세요')
    const userConfirmed = confirm('정말 등록 하시겠습니까?')
    if (userConfirmed) {
      const { statusCode, message } = await articleService.addPost({
        boardType: BOARD_TYPE,
        data: inputValue,
      }) // 아이디 돌려받아서 해당 게시물로 이동 로직 추가 요망
      if (statusCode === 201) {
        alert(message)
        navigate(`/community/123`)
        return
      } else {
        alert(message)
        return
      }
    }
    return
  }

  const cancelPost = () => {
    const userConfirmed = confirm(
      '작성중인 내용은 복구할 수 없습니다. 정말 취소 하시겠습니까? ',
    )
    if (userConfirmed) {
      navigate(`/community/123`)
      return
    }
    return
  }

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="20px" $padding="30px">
      <StyledDiv>
        <P $fontWeight="700" $fontSize="20px" $lineHeight="40px">
          일반 게시물 작성
        </P>
        <StyledDiv>
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
        </StyledDiv>
      </StyledDiv>
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
      <div>
        <P $fontWeight="700" $lineHeight="30px">
          상세 정보
        </P>
        <CkEditor inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      <StyledDiv>
        <Button
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
          $color="#303030"
          onClick={cancelPost}
        >
          취소
        </Button>
        <Button onClick={savePost}>저장</Button>
      </StyledDiv>
    </ShadowBox>
  )
}

export default AddArticlePage

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`
