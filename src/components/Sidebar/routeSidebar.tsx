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
        name: 'Sit N Go Stage',
        icon: <FaWpforms />,
        isParent: true,
        children: [
            {
                path: '/create-sit-n-go-stage',
                name: 'Create New Sit N Go Stage',
                icon: <IoIosAdd />,
            },
            {
                path: '/list-sit-n-go-stage',
                name: 'List Sit N Go Stage',
                icon: <VscTasklist />,
            },
        ],
    },
];
