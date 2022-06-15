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

const App = () => {

    const [{profile, page_reload, admin_profile}, dispatch] = useGlobalState()

    useEffect(() => {
        if (userToken !== null) {
            const getdata = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/member/`,
                    headers: header
                }).then(response => {
                    console.log(response.data["data"])
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
                    console.log(response.data["data"])
                    dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data["data"]
                    })
                })
            }
            getadmindata()
        }
    }, [dispatch, page_reload]);


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
