import WidgetTitleArea from 'components/common/WidgetTitleArea'
import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaRankingStar } from 'react-icons/fa6'

const CommentRankWidget = () => {
  return (
    <ShadowBox>
      <WidgetTitleArea
        Icon={FaRankingStar}
        title="지난 주 댓글 랭킹"
        hasSeeMore={false}
      />
      CommentRankWidget
    </ShadowBox>
  )
}

export default CommentRankWidget
