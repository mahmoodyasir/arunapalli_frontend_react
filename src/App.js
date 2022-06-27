import './App.css';
import './user_component/home.css'
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
import Add_Plot_Position from "./admin_component/Add_Plot_Position";
import Assign_Plot_Owner from "./admin_component/Assign_Plot_Owner";
import Manual_Payment from "./admin_component/Manual_Payment";
import PaymentDate from "./admin_component/PaymentDate";
import Payment_Status from "./admin_component/Payment_Status";
import ProfilePage from "./common_component/ProfilePage";
import User_Payment_Status from "./user_component/User_Payment_Status";
import Online_Payment from "./user_component/Online_Payment";
import OwnershipHistory from "./admin_component/Dashboaard/OwnershipHistory";
import RegisterAdmin from "./admin_component/RegisterAdmin";

const App = () => {

    const [{
        profile,
        page_reload,
        admin_profile,
        user_profile,
        status,
        plot_position,
        all_plot_road,
        all_member,
        all_owner,
        fix_date,
        all_table
    }, dispatch] = useGlobalState()

    useEffect(() => {
        if (userToken !== null) {
            const getdata = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/member/`,
                    headers: header
                }).then(response => {
                    // console.log("Member Data $$$$$$$", response.data)
                    dispatch({
                        type: "ADD_PROFILE",
                        profile: response.data["data"][0]
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
                        admin_profile: response.data["data"][0]
                    })
                })
            }
            getadmindata()
        }
    }, [dispatch, page_reload]);

    useEffect(() => {
        if (adminToken !== null)
        {
            const get_count_number = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/table_count/`,
                    headers: admin_header
                }).then(response => {
                    dispatch({
                        type: "ALL_TABLE",
                        all_table: response.data
                    })
                })
            }
            get_count_number()
        }
    }, [dispatch, page_reload]);


    useEffect(() => {
        if (adminToken !== null) {
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
                    console.log(user_profile)
                })
            }
            get_user_profile()
        }

    }, [dispatch, page_reload]);


    useEffect(() => {
        if (adminToken !== null) {
            const get_status = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/statusview`,
                    headers: admin_header
                }).then(response => {
                    dispatch({
                        type: "STATUS",
                        status: response.data

                    })
                    console.log("Status", status)
                })
            }
            get_status()
        }

    }, [dispatch, page_reload]);


    useEffect(() => {
        if (adminToken !== null) {
            const plot_position = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/plotpositionview/`,
                    headers: admin_header
                }).then(response => {
                    dispatch({
                        type: "PLOT_POSITION",
                        plot_position: response.data
                    })
                })
            }
            plot_position()
        }
    }, [dispatch, page_reload]);


    useEffect(() => {
        if (adminToken !== null) {
            const all_plot_road = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/roadplotview/`,
                    headers: admin_header
                }).then(response => {
                    dispatch({
                        type: "ALL_PLOT_ROAD",
                        all_plot_road: response.data
                    })
                })
            }
            all_plot_road()
        }

    }, [dispatch, admin_profile]);

    useEffect(() => {
        if (adminToken !== null) {
            const get_all_member = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/all_member_view/`,
                    headers: admin_header
                }).then(response => {
                    dispatch({
                        type: "ALL_MEMBER",
                        all_member: response.data
                    })
                })
            }
            get_all_member()
        }
    }, [dispatch, admin_profile]);


    useEffect(() => {
        if (adminToken !== null) {
            const get_all_owner = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/all_owner_view/`,

                }).then(response => {
                    dispatch({
                        type: "ALL_OWNER",
                        all_owner: response.data
                    })
                })
            }
            get_all_owner()
        }
    }, [dispatch, admin_profile]);

    useEffect(() => {
        if (adminToken !== null) {
            const handle_date_function = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/api/date_handle/`,
                    headers: admin_header
                }).then(response => {
                    dispatch({
                        type: "DATE",
                        fix_date: response.data
                    })
                })
            }
            handle_date_function()
        }
    }, [dispatch, admin_profile]);


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
                                    <Route exact path="/add_plot_position" component={Add_Plot_Position}/>
                                    <Route exact path="/assign_plot_owner" component={Assign_Plot_Owner}/>
                                    <Route exact path="/register_user" component={Register_User}/>
                                    <Route exact path="/manual_payment" component={Manual_Payment}/>
                                    <Route exact path="/payment_date_fix" component={PaymentDate}/>
                                    <Route exact path="/Payment_status" component={Payment_Status}/>
                                    <Route exact path="/admin_profile" component={ProfilePage}/>
                                    <Route exact path="/owner_history" component={OwnershipHistory}/>
                                    <Route exact path="/register_admin" component={RegisterAdmin}/>
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
                                    <Route exact path="/profile" component={ProfilePage}/>
                                    <Route exact path="/user_payment_status" component={User_Payment_Status}/>
                                    <Route exact path="/online_payment" component={Online_Payment}/>
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
