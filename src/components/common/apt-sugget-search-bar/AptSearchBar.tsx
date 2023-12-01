import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  FocusEvent,
} from 'react'
import axios from 'axios'
import SearchBar from 'components/ui/SearchBar'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { AptSearch } from 'types/community-type/aptType'
import { useGeolocation } from 'hooks/useGeolocation'
import { externalAptSearchService } from 'services/apt/externalAptSearchService'
import { aptService } from 'services/apt/aptService'
import { toast } from 'react-toastify'

const AptSearchBar = () => {
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

  const changeInputvalue = async (e: ChangeEvent<HTMLInputElement>) => {
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
        setSuggestVisible(false)
        setFocusIndex(0)
        break
      default:
        break
    }
  }

  const onFocus = () => {
    setSuggestVisible(true)
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const next = e.relatedTarget
    if (next instanceof HTMLLIElement) {
      if (!inputRef.current) return
      inputRef.current.focus()
    } else {
      setSuggestVisible(false)
    }
  }

  const moveToCommunityClick = async (aptId: string, aptName: string) => {
    const response = await aptService.aptExists({ aptId })
    if (response.apartExists) {
      return navigate(`/community/${aptId}`)
    }
    return navigate(`/community/${aptId}/create`, { state: { aptId, aptName } })
  }

  const moveToCommunityEnter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.id) return toast.warn('목록에서 아파트를 선택해주세요.')
    const response = await aptService.aptExists({ aptId: inputValue.id })
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
        <SearchBar
          type="text"
          value={inputValue.name}
          ref={inputRef}
          onChange={changeInputvalue}
          onKeyDown={moveFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="아파트 이름을 입력해주세요."
        />
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
              {suggestApts?.length === 0 || !suggestApts ? (
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

export default AptSearchBar

const StyledForm = styled.form`
  width: 500px;
  position: relative;
  color: #303030;
`

const StyledBox = styled.div`
  background: #e9e9e9;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 2;
  width: 100%;
  border-radius: 10px;
  max-height: 117px;
  overflow: auto;
  // 스크롤 바 숨김
  -ms-overflow-style: none; //인터넷 익스플로러
  scrollbar-width: none; // 파이어폭스

  // 크롬, 사파리, 오페라, 엣지 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledUl = styled.ul`
  /* background: #FFFFFF; */
`

const StyledLi = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  &.focus {
    background-color: #c8c8c8;
  }

  &:hover {
    background-color: #c8c8c8;
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
