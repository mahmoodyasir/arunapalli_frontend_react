import React, {useState} from "react";
import sidepic from "../image_folder/swamp.png"
import '../user_component/user_component_style.css'
import Axios from "axios";
import {domain, header} from "../env";

const AdminLogin = () => {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const loginrequest = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/admin_login/`,
            data: {
                'email': email,
                'password': password
            }
        }).then(response => {
            console.log(response.data['admin_token']);
            window.localStorage.setItem("admin_token", response.data['admin_token'])
            window.location.href = '/admin_homepage'
        }).catch(_ => {
            alert("Your username or password is incorrect !! Try Again ....")
        })
    }



    return (
        <div className="container col-md-6 login_center">
            <h1 className="display-6 beside mb-5 fw-bold">Housing Plot Management System</h1>
            <div className="card bg-light">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={sidepic} className="img-fluid rounded-start h-100" alt=""/>
                    </div>
                    <div className="col-md-6">

                        <div className="card-body">
                            <h1 className="display-6">Admin Login</h1>
                            <div className="form-group">
                                <label>Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="Email"
                                       className="form-control" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password"
                                       className="form-control" placeholder="Password"/>
                            </div>
                            <button onClick={loginrequest} className="btn btn-success my-2">Login</button>
                            {/*<p className="card-text btn rounded bg-success text-white">Manage Incomplete Carts</p>*/}

                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default AdminLogin