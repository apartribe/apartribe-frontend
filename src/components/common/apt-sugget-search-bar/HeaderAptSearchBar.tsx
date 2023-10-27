import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  FocusEvent,
  FC,
  SetStateAction,
  Dispatch,
} from 'react'
import axios from 'axios'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { AptSearch } from 'types/community-type/aptType'
import { BiSearchAlt } from 'react-icons/bi'
import { TiDelete } from 'react-icons/ti'
import { aptService } from 'services/apt/aptService'
import { useGeolocation } from 'hooks/useGeolocation'
import { externalAptSearchService } from 'services/apt/externalAptSearchService'
import { Modal, ModalBackground } from 'styles/reusable-style/elementStyle'

interface Props {
  searchMode: boolean
  setSearchMode: Dispatch<SetStateAction<boolean>>
}

const HeaderAptSearchBar: FC<Props> = ({ searchMode, setSearchMode }) => {
  const navigate = useNavigate()

  const [suggestVisible, setSuggestVisible] = useState(false)
  const [focusIndex, setFocusIndex] = useState(-1)
  const [inputValue, setInputValue] = useState({ name: '', id: '', address: '' })
  const [suggestApts, setSuggestApts] = useState<AptSearch[]>([])
  const liRef = useRef<HTMLElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { coordinates } = useGeolocation()
  const lng = coordinates?.lng ?? 127.256518
  const lat = coordinates?.lat ?? 37.2666079

  const startSearch = () => {
    setSuggestVisible(true)
    setSearchMode(true)
  }

  const finishSearch = () => {
    setSuggestVisible(false)
    setSearchMode(false)
    setFocusIndex(0)
    // 재검색 시, 기 검색된 아이디가 남아있으면 존재하지 않는 아파트로 접근할 수 있게됨.
    // 따라서 검색이 완료되면, id 값을 초기화함. name값은 남아있는 것이 사용자 경험이 좋다고 판단됨.
    setInputValue((prevState) => ({ ...prevState, id: '' }))
  }

  const changeInputvalue = async (e: ChangeEvent<HTMLInputElement>) => {
    startSearch()
    setInputValue((prevState) => ({ ...prevState, name: e.target.value }))
    setFocusIndex(-1)
    if (!e.target.value) return
    const response = await externalAptSearchService.search({
      keyword: e.target.value,
      lng,
      lat,
    })
    setSuggestApts(response)
  }

  const moveFocus = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case 'ArrowUp':
        if (e.key === 'Process') break
        if (suggestApts.length === 0) break
        if (focusIndex <= 0) {
          setFocusIndex(suggestApts.length - 1)
          setInputValue(() => {
            const { id, name, address } = suggestApts[suggestApts.length - 1]
            return { id, name, address }
          })
        } else {
          setFocusIndex((prev) => prev - 1)
          setInputValue(() => {
            const { id, name, address } = suggestApts[focusIndex - 1]
            return { id, name, address }
          })
        }
        break
      case 'ArrowDown':
        if (e.key === 'Process') break
        if (suggestApts.length === 0) break
        if (focusIndex >= suggestApts.length - 1) {
          setFocusIndex(0)
          setInputValue(() => {
            const { id, name, address } = suggestApts[0]
            return { id, name, address }
          })
        } else {
          setFocusIndex((prev) => prev + 1)
          setInputValue(() => {
            const { id, name, address } = suggestApts[focusIndex + 1]
            return { id, name, address }
          })
        }
        break
      case 'Escape':
        finishSearch()
        break
      default:
        break
    }
  }

  const onFocus = () => {
    startSearch()
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const next = e.relatedTarget
    if (next instanceof HTMLLIElement) {
      if (!inputRef.current) return
      inputRef.current.focus()
    } else {
      finishSearch()
    }
  }

  const moveToCommunityClick = async (aptId: string, aptName: string) => {
    const response = await aptService.aptExists({ aptId })
    finishSearch()
    if (response.apartExists) {
      return navigate(`/community/${aptId}`)
    }
    return navigate(`/community/${aptId}/create`, { state: { aptId, aptName } })
  }

  const moveToCommunityEnter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.id) return alert('목록에서 아파트를 선택해주세요.')
    const response = await aptService.aptExists({ aptId: inputValue.id })
    finishSearch()

    if (response.apartExists) {
      return navigate(`/community/${inputValue.id}`)
    }
    return navigate(`/community/${inputValue.id}/create`, {
      state: { aptId: inputValue.id, aptName: inputValue.name },
    })
  }

  useEffect(() => {
    if (liRef.current) {
      liRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [focusIndex])

  return (
    <div>
      <StyledForm onSubmit={moveToCommunityEnter}>
        <StyledInput
          className={searchMode ? 'stretch' : 'shorten'}
          type="text"
          value={inputValue.name}
          ref={inputRef}
          onChange={changeInputvalue}
          onKeyDown={moveFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={
            searchMode ? '아파트 이름을 입력해주세요.' : '아파트 커뮤니티 검색'
          }
        />
        <StyledDiv>
          <StyledClearIcon
            onClick={() => setInputValue({ name: '', id: '', address: '' })}
          />
          <StyledSearchIcon />
        </StyledDiv>
        {suggestVisible ? (
          <StyledBox>
            <StyledUl>
              {suggestApts &&
                suggestApts.map((suggestApt, index) => {
                  const { id, name, address } = suggestApt
                  return (
                    <StyledLi
                      key={id}
                      tabIndex={-1}
                      onClick={() => moveToCommunityClick(id, name)}
                      className={index === focusIndex ? 'focus' : ''}
                      ref={(el) => {
                        if (index === focusIndex) {
                          liRef.current = el
                        }
                      }}
                    >
                      <StyledParagraph className="name">{name}</StyledParagraph>
                      <StyledParagraph className="address">{address}</StyledParagraph>
                    </StyledLi>
                  )
                })}
              {suggestApts.length === 0 ? (
                <StyledParagraph className="nothing">
                  일치하는 검색어가 없습니다.
                </StyledParagraph>
              ) : (
                ''
              )}
            </StyledUl>
          </StyledBox>
        ) : (
          ''
        )}
      </StyledForm>
    </div>
  )
}

export default HeaderAptSearchBar

const StyledForm = styled.form`
  position: relative;
  color: #303030;
  &.stretch {
    width: 900px;
  }

  &.shorten {
    width: 220px;
  }
`

const StyledDiv = styled.div`
  background-color: white;
  display: flex;
  position: absolute;
  top: 50%;
  right: 1px;
  transform: translate(0, -50%);
  padding: 0 10px;
  border-radius: 10px;
  font-size: 20px;
  color: #555555;
`

const StyledBox = styled.div`
  background: #ffffffeb;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 999;
  width: 100%;
  border-radius: 10px;
  max-height: 300px;
  overflow: auto;
  // 스크롤 바 숨김
  -ms-overflow-style: none; //인터넷 익스플로러
  scrollbar-width: none; // 파이어폭스

  // 크롬, 사파리, 오페라, 엣지 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledUl = styled.ul``

const StyledLi = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &.focus {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`

const StyledParagraph = styled.p`
  margin: 0;

  &.name {
    font-weight: 700;
  }

  &.address {
    font-size: 12px;
  }

  &.nothing {
    padding-left: 20px;
  }
`

const StyledInput = styled.input`
  transform-origin: right center;
  height: 35px;
  padding-left: 15px;
  border: 1px solid #c8c8c8;
  border-radius: 100px;
  outline: none;
  transition: 0.3s ease-in-out;

  &.stretch {
    width: 900px;
  }

  &.shorten {
    width: 220px;
  }
`

const StyledClearIcon = styled(TiDelete)`
  cursor: pointer;
`

const StyledSearchIcon = styled(BiSearchAlt)``
