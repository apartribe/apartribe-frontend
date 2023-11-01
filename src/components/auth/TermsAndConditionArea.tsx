import { MouseEvent, ChangeEvent, useState, Dispatch, SetStateAction } from 'react'
import { styled } from 'styled-components'
import { AiOutlineRight } from 'react-icons/ai'
import { Input } from 'styles/reusable-style/elementStyle'
import TermsAndConditionModal from './TermsAndConditionModal'
import { TERMS_AND_CONDITIONS_LIST } from 'constants/auth/termsAndConditions'
import { TermsAndConditionsValue } from 'types/auth'

type TermsAndConditionAreaProps<T> = {
  setTermsAndConditionsValue: Dispatch<SetStateAction<T>>
}

const TermsAndConditionArea = <T extends TermsAndConditionsValue>({
  setTermsAndConditionsValue,
}: TermsAndConditionAreaProps<T>) => {
  const [checkList, setCheckList] = useState<string[]>([])
  const [showDetail, setShowDetail] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckList(TERMS_AND_CONDITIONS_LIST.map(({ name }) => name))
    } else {
      setCheckList([])
    }

    const newArray: any = []
    TERMS_AND_CONDITIONS_LIST.map(({ name }) => (newArray[name] = e.target.checked))

    const newObject = Object.assign({}, newArray)
    setTermsAndConditionsValue(newObject)
  }

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckList([...checkList, e.target.name])
    } else {
      setCheckList(checkList.filter((item) => item !== e.target.name))
    }
    setTermsAndConditionsValue((prev) => ({ ...prev, [e.target.name]: e.target.checked }))
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

      {TERMS_AND_CONDITIONS_LIST.map(({ id, name, isMandatory, title, fileName }) => (
        <StyledLabel key={id}>
          <StyledCheckbox
            type="checkbox"
            name={name}
            checked={checkList.includes(name) ? true : false}
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
