import { MouseEvent, ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'
import { AiOutlineRight } from 'react-icons/ai'
import { Input } from 'styles/reusable-style/elementStyle'
import TermsAndConditionModal from './TermsAndConditionModal'
import { TERMS_AND_CONDITIONS_LIST } from 'constants/auth/termsAndConditions'

const TermsAndConditionArea = () => {
  const [checkList, setCheckList] = useState<number[]>([])
  const [showDetail, setShowDetail] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setCheckList(TERMS_AND_CONDITIONS_LIST.map(({ id }) => id))
    } else {
      setCheckList([])
    }
  }

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setCheckList([...checkList, Number(e.currentTarget.value)])
    } else {
      setCheckList(checkList.filter((item) => item !== Number(e.currentTarget.value)))
    }
  }

  const openModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowDetail(e.currentTarget.value)
    setModal((prev) => !prev)
  }

  return (
    <div>
      <StyledLabel>
        <StyledCheckbox
          type="checkbox"
          checked={checkList.length === TERMS_AND_CONDITIONS_LIST.length ? true : false}
          onChange={checkAll}
        />
        전체 동의
      </StyledLabel>

      {TERMS_AND_CONDITIONS_LIST.map(({ id, isMandatory, title, fileName }) => (
        <StyledLabel key={id}>
          <StyledCheckbox
            type="checkbox"
            value={id}
            checked={checkList.includes(id) ? true : false}
            onChange={check}
          />
          <StyledSpan>{isMandatory}</StyledSpan>
          {title}
          <StyledButton value={fileName} onClick={openModal}>
            <StyledIcon />
          </StyledButton>
        </StyledLabel>
      ))}

      {modal && (
        <TermsAndConditionModal fileName={showDetail} modal={modal} setModal={setModal} />
      )}
    </div>
  )
}

export default TermsAndConditionArea

const StyledLabel = styled.label`
  display: flex;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  align-items: center;
`

const StyledCheckbox = styled(Input)`
  width: 20px;
  height: 20px;
  accent-color: #2b7f75;
`

const StyledButton = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;
  margin-right: 0;
  margin-left: auto;
`
const StyledIcon = styled(AiOutlineRight)`
  size: 20;
`

const StyledSpan = styled.span`
  color: #999;
`
