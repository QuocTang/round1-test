import { IoIosAdd } from 'react-icons/io';
import { FaWpforms } from 'react-icons/fa';
import { TbLayoutDashboard } from 'react-icons/tb';
import { VscTasklist } from 'react-icons/vsc';
export const RouteSidebarMenu = [
    {
        name: 'Main',
        title: true,
    },
    // {
    //     path: '/',
    //     name: 'Dashboard',
    //     icon: <TbLayoutDashboard />,
    // },
    {
        name: 'User Management',
        icon: <FaWpforms />,
        isParent: true,
        children: [
            {
                path: '/user-list',
                name: 'User List',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Article Management',
        icon: <FaWpforms />,
        isParent: true,
        children: [
            {
                path: '/article-list',
                name: 'Article List',
                icon: <VscTasklist />,
            },
        ],
    },
    {
        name: 'Comment Management',
        icon: <FaWpforms />,
        isParent: true,
        children: [
            {
                path: '/comment-list',
                name: 'Comment List',
                icon: <VscTasklist />,
            },
        ],
    },
];
