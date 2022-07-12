import React, {useEffect, useRef, useState} from "react";
import {useHistory} from 'react-router'
import {useGlobalState} from "../state/provider";
import './CSS/common.css'
import Axios from "axios";
import {admin_header, domain} from "../env";
import Dialog from "./Dialog";
import MemberDetails from "./MemberDetails";

const AssignMember = () => {
    // const history = useHistory()
    // history.go(0)
    const [{user_profile, status, page_reload, all_member}, dispatch] = useGlobalState()

    const [email, setEmail] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [nid, setNid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [member_status, setMember_status] = useState(null);
    const [onetime_payment, setOnetime_payment] = useState(true);
    const [cheque_no, setCheque_no] = useState(null);
    const [account_no, setAccount_no] = useState(null);
    const [bank_name, setBank_name] = useState(null);
    const [all_bank, setAll_bank] = useState(null);
    const [amount, setAmount] = useState("");
    const [toogle, setToogle] = useState(false);

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

    const [member_details, setMember_details] = useState({
        isLoading: false,
        id: ""
    });

    const idUserRef = useRef();
    const idMemberRef = useRef();

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


    const handleDetails = (isLoading, id) => {
        setMember_details({
            isLoading,
            id
        });
    };

    const handleDelete = (id, name) => {

        handleDialog("Are you sure you want to delete?", true, name, true,
            "Delete Member", "Delete with User", "Cancel");
        idUserRef.current = id;
    };

    const handleMember = (id) => {

        handleDetails(true, id)
        idMemberRef.current = id;
    };

    const areUSureDelete = (choose) => {
        if (choose === "button1") {
            console.log("Only Member", idUserRef.current)
            Axios({
                method: "post",
                url: `${domain}/api/member_delete/${idUserRef.current}/${choose}/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data)
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
            })
            handleDialog("", false);
        } else if (choose === "button2") {
            console.log("Member with user", idUserRef.current)
            Axios({
                method: "post",
                url: `${domain}/api/member_delete/${idUserRef.current}/${choose}/`,
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


    const areUSureDetails = (choose) => {
        if (choose === "button") {
            console.log("Details", idMemberRef.current)
            handleDetails(false, "")
        } else {
            handleDetails(false, "")
        }
    };


    useEffect(() => {
        const get_bank_and_amount = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/bank_amount/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data["bank_name"])
                console.log(response.data["onetime_amount"][0]["amount"])
                setAll_bank(response.data["bank_name"])
                setAmount(response.data["onetime_amount"][0]["amount"])
            })
        }
        get_bank_and_amount()
    }, []);



    const member_create = async () => {
        const formdata = new FormData()
        formdata.append("email", email);
        formdata.append("member_firstname", firstname);
        formdata.append("member_lastname", lastname);
        formdata.append("member_nid", nid);
        formdata.append("member_phone", phone);
        formdata.append("onetime_payment", onetime_payment);

        formdata.append("bank_name", bank_name);
        formdata.append("cheque_no", cheque_no);
        formdata.append("account_no", account_no);
        formdata.append("amount", amount);
        console.log(member_status)

        await Axios({
            method: "post",
            url: `${domain}/api/add_member/`,
            headers: admin_header,
            data: formdata
        }).then(response => {
            console.log(response.data["message"])
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }


    return (

        <div className="container">
            <div className="row">


                <div className="col-md-3">
                    <h1 className="display-6 my-3">Membership Assignment</h1>

                    <div className="form-group my-3">
                        <label>Email:</label>
                        <select onChange={e => setEmail(e.target.value)} className="form-control" value={email}>
                            <option>Select .......</option>
                            {
                                user_profile?.map((item, index) => {
                                    return <option value={item?.prouser?.email}
                                                   key={index}>{item?.prouser?.email}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group my-3">

                        <label>Member Firstname:</label>
                        <input onChange={e => setFirstname(e.target.value)} type="text" className="form-control"
                               placeholder="Write Member's Firstname"/>
                    </div>

                    <div className="form-group my-3">
                        <label>Member Lastname:</label>
                        <input onChange={e => setLastname(e.target.value)} type="text" className="form-control"
                               placeholder="Write Member's Lastname"/>
                    </div>

                    <div className="form-group my-3">
                        <label>Member NID:</label>
                        <input onChange={e => setNid(e.target.value)} type="text" className="form-control"
                               placeholder="Write Member's NID Number"/>
                    </div>

                    <div className="form-group my-3">
                        <label>Member Phone:</label>
                        <input onChange={e => setPhone(e.target.value)} type="text" className="form-control"
                               placeholder="Write Member's Phone No"/>
                    </div>

                    <div className="form-check my-3">
                        <label>Onetime Membership Payment: </label>
                        <input onChange={() => setToogle(!toogle)} type="checkbox"
                               className="form-check-input"/>
                    </div>

                    {
                        toogle !== false &&
                        <>
                            <div>
                                <label>Bank Name:</label>
                                <select onChange={e => setBank_name(e.target.value)} className="form-control"
                                       value={bank_name}>
                                    <option>Select .......</option>
                                    {
                                        all_bank?.map((item, index) => {
                                            return <option value={item?.name}
                                                           key={index}>{item?.name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group my-3">
                                <label>Cheque No:</label>
                                <input onChange={e => setCheque_no(e.target.value)} type="text" className="form-control"
                                       placeholder="Write Bank Cheque Number"/>
                            </div>

                            <div className="form-group my-3">
                                <label>Account No:</label>
                                <input onChange={e => setAccount_no(e.target.value)} type="text"
                                       className="form-control"
                                       placeholder="Write Bank Account No"/>
                            </div>

                            <div className="form-group my-3">
                                <label>Amount:</label>
                                <input onChange={(e) => setAmount(e.target.value)} type="text"
                                       className="form-control"
                                       placeholder="Onetime Amount"
                                       value={amount !== null && amount}
                                       readOnly="readonly"/>
                            </div>

                            <div className="my-2">
                                <button onClick={member_create} className="btn btn-primary">Submit</button>
                            </div>
                        </>
                    }


                </div>


                <div className="col-md-9">
                    <h1 className="display-6 beside my-3">Members</h1>
                    <div className="col-md-12 card text-black bg-white scrollable">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>SN</th>
                                <th>Email</th>
                                <th>Member Firstname</th>
                                <th>Member Lastname</th>
                                <th>Member NID</th>
                                <th>Member Phone</th>
                                <th>Onetime Payment</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                all_member?.length !== 0 ?
                                    all_member?.map((item, i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.member_firstname}</td>
                                            <td>{item?.member_lastname}</td>
                                            <td>{item?.member_nid}</td>
                                            <td>{item?.member_phone}</td>
                                            <td>{item?.onetime_payment !== true ? "False" : "True"}</td>
                                            <td className="beside">
                                                <button onClick={() => handleMember(item?.id)}
                                                        className="btn btn-outline-primary">Details
                                                </button>

                                                <button onClick={() => handleDelete(item?.id, item?.email)}
                                                        className="btn btn-outline-danger mx-2">Delete
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

            {member_details.isLoading && (
                <MemberDetails
                    //Update
                    onDialog={areUSureDetails}
                    id={member_details.id}
                />
            )}

        </div>
    )
}

export default AssignMember
