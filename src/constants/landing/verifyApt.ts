import resident from 'assets/auth/resident.png'
import manager from 'assets/auth/manager.png'

export const CARD_CONTENTS = [
  {
    id: 'resident',
    badge: '아파트 인증 필요',
    image: resident,
    title: '집주인 · 입주민 · 청약권자',
    example: `“ 아파트에 소유하거나 거주하고 있음을 증명할 수 있어요! ”
    “ 청약에 당첨 되었어요! ”`,
    description: [
      '모든 게시물 열람 가능',
      '본인 아파트 커뮤니티 게시물 게재 가능',
      '타 아파트 페이지 게시물 열람 가능',
    ],
  },
  {
    id: 'manager',
    badge: '재직자 인증 필요',
    image: manager,
    title: '경비원 · 관리인 · 아파트 대표',
    example: `“ 경비원 · 관리인 재직 사실을 증명할 수 있어요 ! ”
“ 아파트 대표 · 동 대표로 활동하고 있어요 ! ”`,
    description: [
      '공지사항 게시물 업로드 권한 부여',
      '본인 아파트 커뮤니티 게시물 팝업 알림 가능',
      ' 닉네임과 함께 직책 공개 ex) [ 경비원 ] 참된 일꾼',
    ],
  },
]

export const RESIDENT_POSITIONS = ['자가', '임대인', '임차인', '청약권자']
export const MANAGER_POSITIONS = ['관리인', '경비원', '아파트 대표', '동 대표']
