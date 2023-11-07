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
import MyArticlePage from 'pages/setting-pages/MyArticlePage'
import MyCommentPage from 'pages/setting-pages/MyCommentPage'
import DeleteMemberPage from 'pages/setting-pages/DeleteMemberPage'
import ChangeNicknamePage from 'pages/setting-pages/ChangeNicknamePage'
import ChangePwPage from 'pages/setting-pages/ChangePwPage'
import SettingPage from 'pages/setting-pages/SettingPage'
import VerifyAptPage from 'pages/setting-pages/VerifyAptPage'
// import VerifyManagerPage from 'pages/setting-pages/VerifyManagerPage' // 추후 인증 모듈 개발 시 복구
// import VerifyResidentPage from 'pages/setting-pages/VerifyResidentPage' // 추후 인증 모듈 개발 시 복구
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRouteNotLoggedIn from './ProtectedRouteNotLoggedIn'
import ProtectedRouteLoggedIn from './ProtectedRouteLoggedIn'
import ProtectedRouteOnlyManager from './ProtectedRouteOnlyManager'
import ProtectedRoutePresentAptVerified from './ProtectedRoutePresentAptVerified'
import ProtectedRouteExistentApt from './ProtectedRouteExistentApt'
import ProtectedRouteAptVerified from './ProtectedRouteAptVerified'

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
          <ProtectedRouteNotLoggedIn>
            <SignupSelectPage />
          </ProtectedRouteNotLoggedIn>
        ),
      },
      {
        path: '/signup/local',
        element: (
          <ProtectedRouteNotLoggedIn>
            <SignupLocalPage />,
          </ProtectedRouteNotLoggedIn>
        ),
      },
      {
        path: '/login',
        element: (
          <ProtectedRouteNotLoggedIn>
            <LoginPage />
          </ProtectedRouteNotLoggedIn>
        ),
      },
      {
        path: '/find/id',
        element: (
          <ProtectedRouteNotLoggedIn>
            <FindIdPage />
          </ProtectedRouteNotLoggedIn>
        ),
      },
      {
        path: '/find/pw',
        element: (
          <ProtectedRouteNotLoggedIn>
            <FindPwPage />
          </ProtectedRouteNotLoggedIn>
        ),
      },
      {
        path: '/find/pw/reset',
        element: (
          <ProtectedRouteNotLoggedIn>
            <ResetPwPage />
          </ProtectedRouteNotLoggedIn>
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
        path: '/setting/my-article',
        element: (
          <ProtectedRouteLoggedIn>
            <MyArticlePage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/setting/my-comment',
        element: (
          <ProtectedRouteLoggedIn>
            <MyCommentPage />
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/setting/member/delete',
        element: (
          <ProtectedRouteLoggedIn>
            <DeleteMemberPage />
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
      <ProtectedRouteExistentApt>
        <CommunityHomePage />
      </ProtectedRouteExistentApt>
    ),
    children: [
      {
        index: true,
        element: <ArticlePage />,
      },
      {
        path: '/community/:aptId/article/add',
        element: (
          <ProtectedRouteLoggedIn>
            <ProtectedRouteAptVerified>
              <ProtectedRoutePresentAptVerified>
                <AddArticlePage />
              </ProtectedRoutePresentAptVerified>
            </ProtectedRouteAptVerified>
          </ProtectedRouteLoggedIn>
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
          <ProtectedRouteLoggedIn>
            <ProtectedRouteAptVerified>
              <ProtectedRoutePresentAptVerified>
                <EditArticlePage />
              </ProtectedRoutePresentAptVerified>
            </ProtectedRouteAptVerified>
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/community/:aptId/announce',
        element: <AnnouncePage />,
      },
      {
        path: '/community/:aptId/announce/add',
        element: (
          <ProtectedRouteLoggedIn>
            <ProtectedRouteOnlyManager>
              <ProtectedRouteAptVerified>
                <ProtectedRoutePresentAptVerified>
                  <AddAnnouncePage />
                </ProtectedRoutePresentAptVerified>
              </ProtectedRouteAptVerified>
            </ProtectedRouteOnlyManager>
          </ProtectedRouteLoggedIn>
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
          <ProtectedRouteLoggedIn>
            <ProtectedRouteOnlyManager>
              <ProtectedRouteAptVerified>
                <ProtectedRoutePresentAptVerified>
                  <EditAnnouncePage />
                </ProtectedRoutePresentAptVerified>
              </ProtectedRouteAptVerified>
            </ProtectedRouteOnlyManager>
          </ProtectedRouteLoggedIn>
        ),
      },
      {
        path: '/community/:aptId/together',
        element: <TogetherPage />,
      },
      {
        path: '/community/:aptId/together/add',
        element: (
          <ProtectedRouteLoggedIn>
            <ProtectedRouteAptVerified>
              <ProtectedRoutePresentAptVerified>
                <AddTogetherPage />
              </ProtectedRoutePresentAptVerified>
            </ProtectedRouteAptVerified>
          </ProtectedRouteLoggedIn>
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
          <ProtectedRouteLoggedIn>
            <ProtectedRouteAptVerified>
              <ProtectedRoutePresentAptVerified>
                <EditTogetherPage />,
              </ProtectedRoutePresentAptVerified>
            </ProtectedRouteAptVerified>
          </ProtectedRouteLoggedIn>
        ),
      },
    ],
  },
])

export default Router
