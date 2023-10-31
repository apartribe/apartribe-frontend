import App from 'App'
import AddAnnouncePage from 'pages/announce-pages/AddAnnouncePage'
import AnnouncePage from 'pages/announce-pages/AnnouncePage'
import DetailAnnouncePage from 'pages/announce-pages/DetailAnnouncePage'
import EditAnnouncePage from 'pages/announce-pages/EditAnnouncePage'
import FindIdPage from 'pages/auth-pages/FindIdPage'
import FindPwPage from 'pages/auth-pages/FindPwPage'
import LoginPage from 'pages/auth-pages/LoginPage'
import ResetPwPage from 'pages/auth-pages/ResetPwPage'
import SignupLocalPage from 'pages/auth-pages/SignupLocalPage'
import SignupSelectPage from 'pages/auth-pages/SignupSelectPage'
import AddArticlePage from 'pages/article-pages/AddArticlePage'
import ArticlePage from 'pages/article-pages/ArticlePage'
import CommunityHomePage from 'pages/community-pages/CommunityHomePage'
import CreateAptCommunityPage from 'pages/community-pages/CreateAptCommunityPage'
import DetailArticlePage from 'pages/article-pages/DetailArticlePage'
import EditArticlePage from 'pages/article-pages/EditArticlePage'
import AddTogetherPage from 'pages/gather-people-pages/AddTogetherPage'
import DetailTogetherPage from 'pages/gather-people-pages/DetailTogetherPage'
import EditTogetherPage from 'pages/gather-people-pages/EditTogetherPage'
import TogetherPage from 'pages/gather-people-pages/TogetherPage'
import AboutUsPage from 'pages/intro-pages/AboutUsPage'
import ContactPage from 'pages/intro-pages/ContactPage'
import LandingPage from 'pages/intro-pages/LandingPage'
import NotFoundPage from 'pages/intro-pages/NotFoundPage'
import ChangeImagePage from 'pages/setting-pages/ChangeImagePage'
import ChangeNicknamePage from 'pages/setting-pages/ChangeNicknamePage'
import ChangePwPage from 'pages/setting-pages/ChangePwPage'
import SettingPage from 'pages/setting-pages/SettingPage'
import VerifyAptPage from 'pages/setting-pages/VerifyAptPage'
// import VerifyManagerPage from 'pages/setting-pages/VerifyManagerPage' // 추후 인증 모듈 개발 시 복구
// import VerifyResidentPage from 'pages/setting-pages/VerifyResidentPage' // 추후 인증 모듈 개발 시 복구
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRouteOnlyNotLoggedIn from './ProtectedRouteOnlyNotLoggedIn'
import ProtectedRouteLoggedIn from './ProtectedRouteLoggedIn'
import ProtectedRouteOnlyManager from './ProtectedRouteOnlyManager'
import ProtectedRoutePresentAptVerified from './ProtectedRoutePresentAptVerified'
import ProtectedRouteNonExistentApt from './ProtectedRouteNonExistentApt'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/signup/select',
        element: (
          <ProtectedRouteOnlyNotLoggedIn>
            <SignupSelectPage />
          </ProtectedRouteOnlyNotLoggedIn>
        ),
      },
      {
        path: '/signup/local',
        element: (
          <ProtectedRouteOnlyNotLoggedIn>
            <SignupLocalPage />,
          </ProtectedRouteOnlyNotLoggedIn>
        ),
      },
      {
        path: '/login',
        element: (
          <ProtectedRouteOnlyNotLoggedIn>
            <LoginPage />
          </ProtectedRouteOnlyNotLoggedIn>
        ),
      },
      {
        path: '/find/id',
        element: (
          <ProtectedRouteOnlyNotLoggedIn>
            <FindIdPage />
          </ProtectedRouteOnlyNotLoggedIn>
        ),
      },
      {
        path: '/find/pw',
        element: (
          <ProtectedRouteOnlyNotLoggedIn>
            <FindPwPage />
          </ProtectedRouteOnlyNotLoggedIn>
        ),
      },
      {
        path: '/find/pw/reset',
        element: (
          <ProtectedRouteOnlyNotLoggedIn>
            <ResetPwPage />
          </ProtectedRouteOnlyNotLoggedIn>
        ),
      },
      {
        path: '/about',
        element: <AboutUsPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/setting',
        element: (
          <ProtectedRouteLoggedIn>
            <SettingPage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/setting/apartment-verification',
        element: (
          <ProtectedRouteLoggedIn>
            <VerifyAptPage />
          </ProtectedRouteLoggedIn>
        ),
      },
      // { // 추후 인증 모듈 개발 시 복구
      //   path: '/setting/apartment-verification/resident',
      //   element: <VerifyResidentPage />,
      // },
      // { // 추후 인증 모듈 개발 시 복구
      //   path: '/setting/apartment-verification/manager',
      //   element: <VerifyManagerPage />,
      // },
      {
        path: '/setting/pw/change',
        element: (
          <ProtectedRouteLoggedIn>
            <ChangePwPage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/setting/nickname/change',
        element: (
          <ProtectedRouteLoggedIn>
            <ChangeNicknamePage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/setting/image/change',
        element: (
          <ProtectedRouteLoggedIn>
            <ChangeImagePage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/community/:aptId/create',
        element: <CreateAptCommunityPage />,
      },
    ],
  },
  {
    path: '/community/:aptId', // article를 붙이는게 일관성이 있으나, nest 구조상 불가
    element: (
      <ProtectedRouteNonExistentApt>
        <CommunityHomePage />
      </ProtectedRouteNonExistentApt>
    ),
    children: [
      {
        index: true,
        element: <ArticlePage />,
      },
      {
        path: '/community/:aptId/article/add',
        element: (
          <ProtectedRoutePresentAptVerified>
            <AddArticlePage />
          </ProtectedRoutePresentAptVerified>
        ),
      },
      {
        path: '/community/:aptId/article/:postId/detail',
        element: (
          <ProtectedRouteLoggedIn>
            <DetailArticlePage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/community/:aptId/article/:postId/edit',
        element: (
          <ProtectedRoutePresentAptVerified>
            <EditArticlePage />
          </ProtectedRoutePresentAptVerified>
        ),
      },
      {
        path: '/community/:aptId/announce',
        element: <AnnouncePage />,
      },
      {
        path: '/community/:aptId/announce/add',
        element: (
          <ProtectedRouteOnlyManager>
            <AddAnnouncePage />
          </ProtectedRouteOnlyManager>
        ),
      },
      {
        path: '/community/:aptId/announce/:postId/detail',
        element: (
          <ProtectedRouteLoggedIn>
            <DetailAnnouncePage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/community/:aptId/announce/:postId/edit',
        element: (
          <ProtectedRouteOnlyManager>
            <EditAnnouncePage />
          </ProtectedRouteOnlyManager>
        ),
      },
      {
        path: '/community/:aptId/together',
        element: <TogetherPage />,
      },
      {
        path: '/community/:aptId/together/add',
        element: (
          <ProtectedRoutePresentAptVerified>
            <AddTogetherPage />
          </ProtectedRoutePresentAptVerified>
        ),
      },
      {
        path: '/community/:aptId/together/:postId/detail',
        element: (
          <ProtectedRouteLoggedIn>
            <DetailTogetherPage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/community/:aptId/together/:postId/edit',
        element: (
          <ProtectedRoutePresentAptVerified>
            <EditTogetherPage />,
          </ProtectedRoutePresentAptVerified>
        ),
      },
    ],
  },
])

export default Router
