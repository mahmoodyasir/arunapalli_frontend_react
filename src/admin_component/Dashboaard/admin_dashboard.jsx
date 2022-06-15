import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {SidebarData} from "./admin_dashboard_data";
import SubMenu from "./admin_dashboard_submenu";
import {IconContext} from "react-icons";
import {useGlobalState} from "../../state/provider";
import {admin_header, domain} from "../../env";
import './All_Order.css'
import Axios from "axios";


const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #643687;
    width: 280px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    overflow: auto;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Admin_dashboard = () => {
    const [{ page_reload }, dispatch] = useGlobalState();
    const [sidebar, setSidebar] = useState(false);
    const [profile, setProfile] = useState(null);

    const showSidebar = () => setSidebar(!sidebar)



        useEffect(() => {
            const getadmindata = async () => {
                await Axios({
                        method: "get",
                        url: `${domain}/api/admin_profile/`,
                        headers: admin_header
                    }).then(response => {
                        console.log(response.data['data']['0'])
                        setProfile(response.data["data"]['0'])
                        // console.log(response.data)
                        // dispatch({
                        //     type: "ADMIN_PROFILE",
                        //     admin_profile: response.data["data"]
                        // })
                    })
                }
                getadmindata()
        }, [page_reload]);



    return(
       <>
           <IconContext.Provider value={{ color: '#fff'}}>
           <Nav>
               <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSidebar} />
               </NavIcon>
           </Nav>
           <SidebarNav sidebar={sidebar}>
               <SidebarWrap>
                   <NavIcon to="#">
                       <AiIcons.AiOutlineClose onClick={showSidebar} />
                   </NavIcon>

                    <div className="mb-4">
                        <img src={`${domain}${profile?.profile_info?.image}`} className="rounded-circle account-image h_control mx-5" />
                        <Link className="nav-link" to="/profile" target="_blank"><button className="btn link-hover text-white btn-info">Email: {profile?.admin_email?.email}</button></Link>
                    </div>

                   {SidebarData.map((item, index) => {
                       return <SubMenu item={item} key={index} />;
                   })}
               </SidebarWrap>
           </SidebarNav>
        </IconContext.Provider>
       </>
    );
}

export default Admin_dashboard