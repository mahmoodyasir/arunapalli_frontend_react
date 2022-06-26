import React, {useRef, useState} from "react";
import Axios from "axios";
import {admin_header, domain} from "../env";
import {useHistory} from "react-router-dom";
import {useGlobalState} from "../state/provider";
import image from "../image_folder/defaul_img.png"
import Dialog from "../admin_component/Dialog";

const Register_User = () => {

    const [{page_reload, user_profile}, dispatch] = useGlobalState()

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirmpassword] = useState(null);
    const history = useHistory()


    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        //Update
        nameUser: "",
        middleButton: false,
        button1: "",
        button2: "",
        button3: ""
    });

    const idUserRef = useRef();

    const handleDialog = (message, isLoading, nameUser, middleButton, button1, button2, button3) => {
        setDialog({
            message,
            isLoading,
            //Update
            nameUser,
            middleButton,
            button1,
            button2,
            button3
        });
    };

    const handleDelete = (id, name) => {

        handleDialog("Deleting an user will affect every table. Are you sure you want to delete?", true, name, false,
            "Proceed", "", "Cancel");
        idUserRef.current = id;
    };

    const areUSureDelete = (choose) => {
        if (choose === "button1") {
            console.log("It Works", idUserRef.current)
            Axios({
                method: "post",
                url: `${domain}/api/user_delete/${idUserRef.current}/${choose}/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data)
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
            })
            handleDialog("", false);
        } else {
            handleDialog("", false);
        }
    };


    const registernewuser = async () => {
        if (password !== confirmpassword) {
            alert("Password not matched !! Try Again .... ")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/api/register/`,
                data: {
                    "email": username,
                    "password": password
                }
            }).then(response => {
                // console.log(response.data)
                alert(response.data['message'])
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })

            })
        }
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-6">
                    <h1 className="display-6 my-3">User Registration</h1>
                    <div className="form-group">
                        <label>Email</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control"
                               placeholder="Email"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"
                               placeholder="Password"/>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input onChange={(e) => setConfirmpassword(e.target.value)} type="password"
                               className="form-control"
                               placeholder="Confirm Password"/>
                    </div>

                    <button onClick={registernewuser} className="btn btn-info my-2">Register</button>
                </div>


                <div className="col-md-4">
                    <h1 className="display-6 beside my-3">Users</h1>
                    <div className="col-md-12 card text-black bg-white payment_status_scroll">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>SN</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                user_profile?.length !== 0 ?
                                    user_profile?.map((item, i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.prouser?.email}</td>
                                            <td>
                                                {
                                                    item?.image !== null ? (
                                                            <img className="img-fluid img-thumbnail img-data"
                                                                 src={`${domain}${item?.image}`}/>
                                                        ) :
                                                        (
                                                            <img className="img-fluid img-thumbnail img-data"
                                                                 src={image}/>
                                                        )
                                                }
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(item?.id, item?.prouser?.email)}
                                                        className="btn btn-outline-danger">Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ) :
                                    <div>
                                        <h1 className="beside display-6">NO Member Information FOUND</h1>
                                    </div>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>

            {dialog.isLoading && (
                <Dialog
                    //Update
                    nameUser={dialog.nameUser}
                    onDialog={areUSureDelete}
                    message={dialog.message}
                    middleButton={dialog.middleButton}
                    button1={dialog.button1}
                    button2={dialog.button2}
                    button3={dialog.button3}
                />
            )}

        </div>
    )
}

export default Register_User