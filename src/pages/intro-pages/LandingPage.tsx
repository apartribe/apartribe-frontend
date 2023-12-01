import AptRankSection from 'components/landing/AptRankSection'
import BannerSection from 'components/landing/BannerSection'
import FAQSection from 'components/landing/FAQSection'
import ReviewSection from 'components/landing/ReviewSection'
import VideoSection from 'components/landing/VideoSection'
import React from 'react'

const LandingPage = () => {
  return (
    <>
      <BannerSection />
      <AptRankSection />
      <VideoSection />
      <ReviewSection />
      <FAQSection />
    </>
  )
}

export default LandingPage
