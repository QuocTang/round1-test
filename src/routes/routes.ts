// Different Layout

import Dashboard from '~/pages/Dashboard';
import ForgotPassword from '~/pages/ForgotPassword';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';

import Register from '~/pages/Register';
import ResetPassword from '~/pages/ResetPassword';
import CreateSitNGoStage from '~/pages/SitNGoStage/CreateSitNGoStage/CreateSitNGoStage';
import EditSitNGoStage from '~/pages/SitNGoStage/EditSitNGoStage/EditSitNGoStage';
import ListSitNGoStage from '~/pages/SitNGoStage/ListSitNGoStage/ListSitNGoStage';
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
        path: 'create-sit-n-go-stage',
        Component: CreateSitNGoStage,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
    {
        path: 'edit-sit-n-go-stage/:id',
        Component: EditSitNGoStage,
        roles: [Roles.Admin, Roles.SuperAdmin, Roles.Manager],
    },
    {
        path: 'list-sit-n-go-stage',
        Component: ListSitNGoStage,
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
