import './App.css';
import '../src/admin_component/sidebarstyle.css'
import {useGlobalState} from "./state/provider";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import UserLogin from "./user_component/UserLogin";
import User_Home from "./user_component/User_Home";
import Register_User from "./user_component/Register_User";
import {admin_header, adminToken, domain, header, userToken} from "./env";
import Sidebar from "./admin_component/Sidebar";
import {useEffect} from "react";
import Axios from "axios";
import AdminLogin from "./admin_component/AdminLogin";
import Admin_Homepage from "./admin_component/Admin_Homepage";
import Navbar from "./user_component/Navbar";
import Admin_dashboard from "./admin_component/Dashboaard/admin_dashboard";
import {Admin_Logout} from "./admin_component/Admin_Logout";
import AssignMember from "./admin_component/AssignMember";

const App = () => {

    const [{profile, page_reload, admin_profile, user_profile, status}, dispatch] = useGlobalState()

    useEffect(() => {
        if (userToken !== null) {
            const getdata = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/member/`,
                    headers: header
                }).then(response => {
                    // console.log(response.data["data"])
                    dispatch({
                        type: "ADD_PROFILE",
                        profile: response.data["data"]
                    })
                })
            }
            getdata()
        }
    }, [dispatch, page_reload]);


    useEffect(() => {
        if (adminToken !== null) {
            const getadmindata = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/admin_profile/`,
                    headers: admin_header
                }).then(response => {
                    // console.log(response.data["data"])
                    dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data["data"]
                    })
                })
            }
            getadmindata()
        }
    }, [dispatch, page_reload]);

    useEffect(() => {
        const get_user_profile = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/profileview/`,
                headers: admin_header
            }).then(response => {
                // console.log(response.data)
                dispatch({
                    type: "USER_PROFILE",
                    user_profile: response.data
                })
                // console.log(user_profile)
            })
        }
        get_user_profile()
    }, [dispatch, user_profile]);


    useEffect(() => {
        const get_status = async ()=>{
            await Axios({
                method: "get",
                url: `${domain}/api/statusview`,
                headers: admin_header
            }).then(response => {
                dispatch({
                    type: "STATUS",
                    status: response.data

                })
                // console.log("Status", status)
            })
        }
        get_status()
    }, [dispatch, status]);




    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin_login" component={AdminLogin}/>
                {
                    admin_profile !== null ? (
                            <>
                                    {/*<Sidebar/>*/}
                                    <Admin_dashboard/>
                                    <Switch>
                                        <Route exact path="/admin_homepage" component={Admin_Homepage}/>
                                        <Route exact path="/admin_logout" component={Admin_Logout}/>
                                        <Route exact path="/assign_member" component={AssignMember}/>
                                    </Switch>
                            </>
                        ) :
                        ("")
                }
                {
                    profile !== null ? (
                            <>
                                <Navbar/>
                                <Switch>
                                    <Route exact path="/user_home" component={User_Home}/>
                                </Switch>
                            </>
                        ) :
                        ("")
                }
                <Route exact path="/" component={UserLogin}/>
            </Switch>
            {/*<div>*/}
            {/*    <div className="main">*/}
            {/*        /!*<Sidebar/>*!/*/}
            {/*        <Switch>*/}
            {/*            */}
            {/*            <Route exact path="/user_home" component={User_Home}/>*/}
            {/*            <Route exact path="/register_user" component={Register_User}/>*/}
            {/*        </Switch>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </BrowserRouter>
    );
}

export default App;
