import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import {useGlobalState} from "../../state/provider";

export const SidebarData = [
    {
        title: 'Home',
        path: '/admin_homepage',
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
                path: '/Payment_status',
                icon: <MdIcons.MdOutlinePayment/>
            },
            {
                title: 'Manual Payment',
                path: '/manual_payment',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Select Payment Date',
                path: '/payment_date_fix',
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
                path: '/register_admin',
                icon: <FaIcons.FaUserPlus/>
            },
            {
                title: 'Create User Account',
                path: '/register_user',
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
        title: 'Plot Control',
        path: '#',
        icon: <AiIcons.AiFillPlusCircle/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Add Plot Position',
                path: '/add_plot_position',
                icon: <AiIcons.AiOutlineAppstoreAdd/>
            },
            {
                title: 'Assign Plot',
                path: '/assign_plot_owner',
                icon: <MdIcons.MdOutlineAssignmentTurnedIn/>
            },
            {
                title: 'Plot History',
                path: '/owner_history',
                icon: <IoIcons.IoIosPaper/>
            },

        ]
    },
    {
        title: 'Member Status Control',
        path: '/member_status',
        icon: <IoIcons.IoMdHelpCircle/>
    },
    {
        title: 'Logout',
        path: '/admin_logout',
        icon: <IoIcons.IoMdHelpCircle/>
    }
];