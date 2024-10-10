import {
    ROUTE_AUTH,
    ROUTE_NEWS,
    ROUTE_POST,
    ROUTE_POST_CREATE,
    ROUTE_POST_EDIT,
    ROUTE_PROFILE,
    ROUTE_PROFILE_EDIT,
    ROUTE_SUBSCRIPTIONS,
} from 'constants/routes';
import {IRoute} from 'types/IRoute';
import AuthPage from './AuthPage/AuthPage';
import NewsPage from './NewsPage';
import PostCreatePage from './PostCreatePage';
import SubscriptionsPage from './SubscriptionsPage/SubscriptionsPage';
import ProfilePage from './ProfilePage/ProfilePage';
import ProfileEditPage from './ProfileEditPage/ProfileEditPage';
import PostEditPage from './PostEditPage';

const routes: IRoute[] = [
    {
        id: ROUTE_AUTH,
        path: ROUTE_AUTH,
        component: AuthPage,
    },
    {
        id: ROUTE_NEWS,
        path: ROUTE_NEWS,
        component: NewsPage,
    },
    {
        id: ROUTE_POST_CREATE,
        path: ROUTE_POST_CREATE,
        component: PostCreatePage,
    },
    {
        id: ROUTE_POST_EDIT,
        path: ROUTE_POST_EDIT,
        component: PostEditPage,
    },
    {
        id: ROUTE_PROFILE,
        path: ROUTE_PROFILE,
        component: ProfilePage,
    },
    {
        id: ROUTE_PROFILE_EDIT,
        path: ROUTE_PROFILE_EDIT,
        component: ProfileEditPage,
    },
    {
        id: ROUTE_SUBSCRIPTIONS,
        path: ROUTE_SUBSCRIPTIONS,
        component: SubscriptionsPage,
    },
];

export default routes;
