import React, {useEffect, useState} from "react";
import {useGlobalState} from "../state/provider";
import './CSS/common.css'
import Axios from "axios";
import {admin_header, domain} from "../env";

const AssignMember = () => {
    const [{user_profile, status, page_reload}, dispatch] = useGlobalState()


    const [email, setEmail] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [nid, setNid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [member_status, setMember_status] = useState(null);
    const [onetime_payment, setOnetime_payment] = useState(false);

    const member_create = async () => {
        const formdata = new FormData()
        formdata.append("email", email);
        formdata.append("member_firstname", firstname);
        formdata.append("member_lastname", lastname);
        formdata.append("member_nid", nid);
        formdata.append("member_phone", phone);
        formdata.append("member_status", member_status);
        formdata.append("onetime_payment", onetime_payment);
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
        <div className="content col-md-5">
            <h1 className="display-6">Membership Assignment</h1>

            <div className="form-group my-3">
                <label>Email:</label>
                <select onChange={e => setEmail(e.target.value)} className="form-control" value={email}>
                    {
                        user_profile?.map((item, index) => {
                            return <option value={item?.prouser?.email} key={index}>{item?.prouser?.email}</option>
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

            <div className="form-group my-3">
                <label>Member Status:</label>
                <select onChange={e => setMember_status(e.target.value)} className="form-control" value={member_status}>
                    {
                        status?.map((item, index) => {
                            return <option value={item?.id} key={index}>{item?.title}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-check my-3">
                <label>Onetime Membership Payment: </label>
                <input onChange={() => setOnetime_payment(!onetime_payment)} type="checkbox"
                       className="form-check-input"/>
            </div>

            <div className="my-2 action-btn">
                <button onClick={member_create} className="btn btn-primary">Submit</button>
            </div>

        </div>
    )
}

export default AssignMember
