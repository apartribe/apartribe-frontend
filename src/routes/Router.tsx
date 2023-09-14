import App from "App";
import AddAnnouncePage from "pages/announcement-pages/AddAnnouncePage";
import AnnouncePage from "pages/announcement-pages/AnnouncePage";
import DetailAnnouncePage from "pages/announcement-pages/DetailAnnouncePage";
import EditAnnouncePage from "pages/announcement-pages/EditAnnouncePage";
import FindIdPage from "pages/auth-pages/FindIdPage";
import FindPwPage from "pages/auth-pages/FindPwPage";
import LoginPage from "pages/auth-pages/LoginPage";
import ResetPwPage from "pages/auth-pages/ResetPwPage";
import SignupLocalPage from "pages/auth-pages/SignupLocalPage";
import SignupSelectPage from "pages/auth-pages/SignupSelectPage";
import AddBoardPostPage from "pages/board-pages/AddBoardPostPage";
import BoardPage from "pages/board-pages/BoardPage";
import CommunityHomePage from "pages/board-pages/CommunityHomePage";
import CreateAptCommunityPage from "pages/board-pages/CreateAptCommunityPage";
import DetailBoardPostPage from "pages/board-pages/DetailBoardPostPage";
import EditBoardPostPage from "pages/board-pages/EditBoardPostPage";
import AddGatherPeoplePage from "pages/gether-people-pages/AddGatherPeoplePage";
import DetailGatherPeoplePage from "pages/gether-people-pages/DetailGatherPeoplePage";
import EditGatherPeoplePage from "pages/gether-people-pages/EditGatherPeoplePage";
import GatherPeoplePage from "pages/gether-people-pages/GatherPeoplePage";
import AboutUsPage from "pages/intro-pages/AboutUsPage";
import ContactPage from "pages/intro-pages/ContactPage";
import LandingPage from "pages/intro-pages/LandingPage";
import NotFoundPage from "pages/intro-pages/NotFoundPage";
import SearchAptPage from "pages/intro-pages/SearchAptPage";
import ChangeImagePage from "pages/setting-pages/ChangeImagePage";
import ChangeNicknamePage from "pages/setting-pages/ChangeNicknamePage";
import ChangePwPage from "pages/setting-pages/ChangePwPage";
import SettingPage from "pages/setting-pages/SettingPage";
import VerifyAptPage from "pages/setting-pages/VerifyAptPage";
import VerifyManagerPage from "pages/setting-pages/VerifyManagerPage";
import VerifyResidentPage from "pages/setting-pages/VerifyResidentPage";
import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement:<NotFoundPage/>,
        children: [
            {
                index: true,
                element: <LandingPage/>
            },
            {
                path: '/signup/select',
                element: <SignupSelectPage/>
            },
            {
                path: '/signup/local',
                element: <SignupLocalPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/find/id',
                element: <FindIdPage/>
            },
            {
                path: '/find/pw',
                element: <FindPwPage/>
            },
            {
                path: '/find/pw/reset',
                element: <ResetPwPage/>
            },
            {
                path: '/about',
                element: <AboutUsPage/>
            },
            {
                path: '/contact',
                element: <ContactPage/>
            },
            {
                path: '/search-apartment',
                element: <SearchAptPage/>
            },
            {
                path: '/setting',
                element: <SettingPage/>
            },
            {
                path: '/setting/apartment-verification',
                element: <VerifyAptPage/>
            },
            {
                path: '/setting/apartment-verification/resident',
                element: <VerifyResidentPage/>
            },
            {
                path: '/setting/apartment-verification/manager',
                element: <VerifyManagerPage/>
            },
            {
                path: '/setting/pw/change',
                element: <ChangePwPage/>
            },
            {
                path: '/setting/nickname/change',
                element: <ChangeNicknamePage/>
            },
            {
                path: '/setting/image/change',
                element: <ChangeImagePage/>
            },
            { // 다시 보기
                path: '/community/:aptId/create',
                element: <CreateAptCommunityPage/>
            },
            {
                path: '/community/:aptId',
                element: <CommunityHomePage/>,
                children: [
                    {
                        index: true,
                        element: <BoardPage/>,
                    },
                    {
                         path: '/community/:aptId/bbs/add',
                        element: <AddBoardPostPage/>,
                    },
                    {
                         path: '/community/:aptId/bbs/:postId/detail',
                        element: <DetailBoardPostPage/>,
                    },
                    {
                         path: '/community/:aptId/bbs/:postId/edit',
                        element: <EditBoardPostPage/>,
                    },
                    {
                         path: '/community/:aptId/announcements',
                        element: <AnnouncePage/>,
                    },
                    {
                         path: '/community/:aptId/announcements/add',
                        element: <AddAnnouncePage/>,
                    },
                    {
                         path: '/community/:aptId/announcements/:postId/detail',
                        element: <DetailAnnouncePage/>,
                    },
                    {
                         path: '/community/:aptId/announcements/:postId/edit',
                        element: <EditAnnouncePage/>,
                    },
                    {
                         path: '/community/:aptId/gather-people',
                        element: <GatherPeoplePage/>,
                    },
                    {
                         path: '/community/:aptId/gather-people/add',
                        element: <AddGatherPeoplePage/>,
                    },
                    {
                         path: '/community/:aptId/gather-people/:postId/detail',
                        element: <DetailGatherPeoplePage/>,
                    },
                     {
                         path: '/community/:aptId/gather-people/:postId/edit',
                        element: <EditGatherPeoplePage/>,
                    }
                ]
            },

        ]
}
]);

export default Router;