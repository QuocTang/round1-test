// Different Layout

import ArticleList from '~/pages/Articles/ArticleList/ArticleList';
import UpdateArticle from '~/pages/Articles/UpdateArticle/UpdateArticle';
import CommentList from '~/pages/Comment/CommentList/CommentList';
import Dashboard from '~/pages/Dashboard';
import ForgotPassword from '~/pages/ForgotPassword';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';

import Register from '~/pages/Register';
import ResetPassword from '~/pages/ResetPassword';

import UpdateUser from '~/pages/User/UpdateUser/UpdateUser';
import UserList from '~/pages/User/UserList/UserList';
import { Roles } from '~/utils/Types';

interface Routes {
    path: string;
    Component: React.ComponentType;
    layout?: null | any;
    roles?: Roles[];
}

const privateRoutes: Routes[] = [
    {
        path: '',
        Component: Dashboard,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
    {
        path: 'user-list',
        Component: UserList,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
    {
        path: 'update-user/:id',
        Component: UpdateUser,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
    {
        path: 'article-list',
        Component: ArticleList,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
    {
        path: 'update-article/:slug',
        Component: UpdateArticle,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
    {
        path: 'comment-list',
        Component: CommentList,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
];

const publicRoutes: Routes[] = [
    {
        path: 'login',
        Component: Login,
        layout: null,
    },
    {
        path: '*',
        Component: NotFound,
        layout: null,
    },
    {
        path: 'register',
        Component: Register,
        layout: null,
    },
    // {
    //     path: 'forgot-password',
    //     Component: ForgotPassword,
    //     layout: null,
    // },
    // {
    //     path: 'reset-password/:token',
    //     Component: ResetPassword,
    //     layout: null,
    // },
];

export { publicRoutes, privateRoutes };
