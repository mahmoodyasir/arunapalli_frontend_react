import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import {useGlobalState} from "../../state/provider";

export const SidebarData = [
    {
        title: 'Home',
        path: '/admin_homepage',
        icon: <AiIcons.AiFillHome/>
    },
    {
        title: 'All Member Account',
        path: '/',
        icon: <AiIcons.AiFillHome/>
    },
    {
        title: 'Payment',
        path: '#',
        icon: <AiIcons.AiFillTool/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Payment Status',
                path: '/admin_action/add_category',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Manual Payment',
                path: '/admin_action/add_product',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Select Payment Date',
                path: '/admin_action/add_product',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    },

    {
        title: 'Account',
        path: '#',
        icon: <AiIcons.AiFillPlusCircle/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Create Admin Account',
                path: '/order_page/all_order',
                icon: <FaIcons.FaUserPlus/>
            },
            {
                title: 'Create User Account',
                path: '/order_page/incomplete_order',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Assign to Member',
                path: '/assign_member',
                icon: <IoIcons.IoIosPaper/>
            },

        ]
    },
    {
        title: 'Logout',
        path: '/admin_logout',
        icon: <IoIcons.IoMdHelpCircle/>
    }
];