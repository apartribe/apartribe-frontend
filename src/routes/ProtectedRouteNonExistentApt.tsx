import React, { ReactNode, useState, useEffect } from 'react'
import FlexibleModal from 'components/common/FlexibleModal'
import { useNavigate, useParams } from 'react-router-dom'
import { aptService } from 'services/apt/aptService'

interface Props {
  children: ReactNode
}

// 존재하지 않는 아파트 주소로 직접 접근하는 행위를 차단하는 라우트
const ProtectedRouteNonExistentApt = ({ children }: Props) => {
  const { aptId } = useParams()
  const navigate = useNavigate()
  const [isExistentApt, setIsExistentApt] = useState(true)

  useEffect(() => {
    const checkAptExistence = async () => {
      const { apartExists } = await aptService.aptExists({ aptId: aptId as string })
      setIsExistentApt(apartExists)
    }

    checkAptExistence()
  }, [])

  const modalProps = {
    text: `존재하지 않는 아파트 커뮤니티 입니다.`,
    buttons: [
      { title: '홈으로 돌아가기', action: () => navigate('/') },
      { title: '뒤로 가기', action: () => navigate(-1) },
    ],
  }

  return isExistentApt ? <>{children}</> : <FlexibleModal modalProps={modalProps} />
}

export default ProtectedRouteNonExistentApt
