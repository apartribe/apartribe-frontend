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
import SearchAptPage from 'pages/intro-pages/SearchAptPage'
import ChangeImagePage from 'pages/setting-pages/ChangeImagePage'
import ChangeNicknamePage from 'pages/setting-pages/ChangeNicknamePage'
import ChangePwPage from 'pages/setting-pages/ChangePwPage'
import SettingPage from 'pages/setting-pages/SettingPage'
import VerifyAptPage from 'pages/setting-pages/VerifyAptPage'
import VerifyManagerPage from 'pages/setting-pages/VerifyManagerPage'
import VerifyResidentPage from 'pages/setting-pages/VerifyResidentPage'
import { createBrowserRouter } from 'react-router-dom'

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
        element: <SignupSelectPage />,
      },
      {
        path: '/signup/local',
        element: <SignupLocalPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/find/id',
        element: <FindIdPage />,
      },
      {
        path: '/find/pw',
        element: <FindPwPage />,
      },
      {
        path: '/find/pw/reset',
        element: <ResetPwPage />,
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
        path: '/search-apartment',
        element: <SearchAptPage />,
      },
      {
        path: '/setting',
        element: <SettingPage />,
      },
      {
        path: '/setting/apartment-verification',
        element: <VerifyAptPage />,
      },
      {
        path: '/setting/apartment-verification/resident',
        element: <VerifyResidentPage />,
      },
      {
        path: '/setting/apartment-verification/manager',
        element: <VerifyManagerPage />,
      },
      {
        path: '/setting/pw/change',
        element: <ChangePwPage />,
      },
      {
        path: '/setting/nickname/change',
        element: <ChangeNicknamePage />,
      },
      {
        path: '/setting/image/change',
        element: <ChangeImagePage />,
      },
      {
        // 다시 보기
        path: '/community/:aptId/create',
        element: <CreateAptCommunityPage />,
      },
    ],
  },
  {
    path: '/community/:aptId', // article를 붙이는게 일관성이 있으나, nest 구조상 불가
    element: <CommunityHomePage />,
    children: [
      {
        index: true,
        element: <ArticlePage />,
      },
      {
        path: '/community/:aptId/article/add',
        element: <AddArticlePage />,
      },
      {
        path: '/community/:aptId/article/:postId/detail',
        element: <DetailArticlePage />,
      },
      {
        path: '/community/:aptId/article/:postId/edit',
        element: <EditArticlePage />,
      },
      {
        path: '/community/:aptId/announce',
        element: <AnnouncePage />,
      },
      {
        path: '/community/:aptId/announce/add',
        element: <AddAnnouncePage />,
      },
      {
        path: '/community/:aptId/announce/:postId/detail',
        element: <DetailAnnouncePage />,
      },
      {
        path: '/community/:aptId/announce/:postId/edit',
        element: <EditAnnouncePage />,
      },
      {
        path: '/community/:aptId/together',
        element: <TogetherPage />,
      },
      {
        path: '/community/:aptId/together/add',
        element: <AddTogetherPage />,
      },
      {
        path: '/community/:aptId/together/:postId/detail',
        element: <DetailTogetherPage />,
      },
      {
        path: '/community/:aptId/together/:postId/edit',
        element: <EditTogetherPage />,
      },
    ],
  },
])

export default Router
