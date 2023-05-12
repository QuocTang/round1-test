import { BiUser } from 'react-icons/bi';
import { IoMdLogOut } from 'react-icons/io';

export const settingMenu = [
    // {
    //     title: 'Profile',
    //     link: '/profile',
    //     icon: <BiUser />,
    // },
    {
        title: 'Logout',
        link: '',
        icon: <IoMdLogOut />,
        action: 'logout',
    },
];
export const tournamentTypeOptions = [
    {
        label: 'FreeRoll',
        value: 'FreeRoll',
    },
    {
        label: 'Normal',
        value: 'Normal',
    },
];

export const BooleanOptions = [
    {
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
];

export const ActionTimeOptions = [
    {
        label: 'Standard (45 sec)',
        value: 45,
    },
    {
        label: 'Turbo (30 sec)',
        value: 30,
    },
    {
        label: 'Hyper Turbo (15 sec)',
        value: 15,
    },
];

export const payoutTypeOptions = [
    {
        label: 'Chips',
        value: 'Chips',
    },
    {
        label: 'NFT',
        value: 'NFT',
    },
];
