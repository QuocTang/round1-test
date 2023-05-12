import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiMessageSquareCheck } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import Config from '~/config';
import { MenuActive, toggleMenu } from '~/features/SidebarActive/MenuSlice';
import { AuthService } from '~/services';
import { settingMenu } from '~/utils/DataMockup';
import Image from '../Image';
import './Header.scss';
const Header = () => {
    const dispatch = useAppDispatch();
    const isOpenMenu = useAppSelector(MenuActive);

    const Navigate = useNavigate();

    const toggleMenuActive = () => {
        dispatch(toggleMenu());
    };

    const handleLogout = (action: string) => {
        if (action === 'logout') {
            // HANDLE LOG OUT
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            Navigate('/login');
        }
    };

    return (
        <div className="header fixed left-0 right-0 z-30">
            <div
                className={`bg-[#fff] relative header-container w-full shadow-md border-b border-[#e9edf4]  h-[75px]  tablet:shadow-none tablet:pl-[10px] transition-all ${
                    !isOpenMenu ? 'pl-[295px]' : 'pl-[95px]'
                }`}
            >
                <div className="flex justify-between h-full items-center mr-[16px]">
                    <div className="btn-toggle-menu p-2">
                        <button
                            className="cursor-pointer relative hover:opacity-70 before:block before:absolute before:left-[-10px] 
                        before:w-[20px] before:h-[23px] before:bg-transparent"
                            onClick={() => toggleMenuActive()}
                        >
                            {isOpenMenu ? <HiMenuAlt2 /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                    <div className="header-right mr-[20px]">
                        <ul className="nav-list flex gap-[10px] items-center text-2xl text-tbase">
                            {/* AVATAR */}
                            <li className="cursor-pointer">
                                <div className="avatar w-9 h-9 relative z-20">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button className="!w-full !p-0 !bg-transparent">
                                                <Tooltip label="">
                                                    <div className="icon relative w-full">
                                                        <Image
                                                            className="w-full h-full rounded-full"
                                                            src={'d'}
                                                            alt=""
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent marginRight="20px" className="!w-auto">
                                            <div className="menu-dropdown bg-white text-base shadow-xl rounded-md">
                                                <ul className="list-menu p-2 py-3">
                                                    {settingMenu.map((menu: any, index) => (
                                                        <li key={index} onClick={(e) => handleLogout(menu.action)}>
                                                            <Link
                                                                to={menu.link}
                                                                className="flex items-center hover:bg-hover hover:text-primary hover:transition-all hover:duration-300 rounded-md px-3 py-2"
                                                            >
                                                                <span className="icon mr-1 text-lg">{menu.icon}</span>
                                                                <span className="title font-medium text-base">
                                                                    {menu.title}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
