import React, {useState} from "react";
import {useGlobalState} from "../state/provider";
import {admin_header, domain, header} from "../env";
import Axios from "axios";

const ProfilePage = () => {

    const [{page_reload, admin_profile, profile}, dispatch] = useGlobalState()
    // console.log(admin_profile["admin_lastname"])

    const [firstname, setFirstname] = useState(profile !== null ? profile?.member_firstname : admin_profile?.admin_firstname);
    const [lastname, setLastname] = useState(profile !== null ? profile?.member_lastname : admin_profile?.admin_lastname);
    const [phone, setPhone] = useState(profile !== null ? profile?.member_phone : admin_profile?.admin_phone);
    const [image, setImage] = useState(null);

    const [oldpass, setOldpass] = useState(null);
    const [newpass, setNewpass] = useState(null);

    let header_value;
    if (profile !== null) {
        header_value = header
    } else {
        header_value = admin_header
    }

    const update_profile_image = async () => {
        const formdata = new FormData()
        formdata.append("image", image)

        await Axios({
            method: "post",
            url: `${domain}/api/profile_image_update/`,
            headers: header_value,
            data: formdata
        }).then(response => {
            console.log(response.data)
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })

    }

    const userdataupdate = async () => {

        await Axios({
            method: "post",
            url: `${domain}/api/userdataupdate/`,
            headers: header_value,
            data: {
                "firstname": firstname,
                "lastname": lastname,
                "phone": phone
            }
        }).then(response => {
            console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })

    }

    const change_password = async (oldpass, newpass) => {

        if (newpass.length < 8) {
            alert("Password must be at least 8 character")
        } else if (oldpass === newpass) {
            alert("Your Old Password cannot be the New Password")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/api/change_password/`,
                headers: header_value,
                data: {
                    "old_pass": oldpass,
                    "new_pass": newpass
                }
            }).then(response => {
                console.log(response.data["message"])
                if (response.data["message"] === true) {
                    alert("Password Changed Successfully")
                } else {
                    alert("Password not matched !! ")
                }
            })
        }

    }

    return (
        <div className="index container">
            <div className="row col-md-5">

                <div className="media">
                    <img
                        src={profile !== null ? `${domain}${profile?.profile?.image}` : `${domain}${admin_profile?.profile_info?.image}`}
                        className="rounded-circle account-image"/>
                    <div className="media-body">
                        <h2>Email: {profile !== null ? profile?.email : admin_profile?.admin_email?.email}</h2>
                        <p>Name: {profile !== null ? profile?.member_firstname + " " + profile?.member_lastname : admin_profile?.admin_firstname + " " + admin_profile?.admin_lastname}</p>
                        <p>NID: {profile !== null ? profile?.member_nid : admin_profile?.admin_nid}</p>
                        <p>Phone: {profile !== null ? profile?.member_phone : admin_profile?.admin_phone}</p>
                    </div>
                </div>

                <div className="">
                    <div className="form-group">
                        <label>Profile Image:</label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control"/>
                        <button onClick={update_profile_image} className="btn btn-info my-2">Upload</button>
                    </div>

                    <div className="form-group my-2">
                        <label>First Name:</label>
                        <input onChange={(e) => setFirstname(e.target.value)} type="text" className="form-control"
                               value={firstname}/>
                    </div>

                    <div className="form-group my-2">
                        <label>Last Name:</label>
                        <input onChange={(e) => setLastname(e.target.value)} type="text" className="form-control"
                               value={lastname}/>
                    </div>

                    <div className="form-group my-2">
                        <label>Phone No: </label>
                        <input onChange={(e) => setPhone(e.target.value)} type="text" className="form-control"
                               value={phone}/>
                    </div>

                    <button onClick={userdataupdate} className="btn btn-success my-2">Update</button>
                </div>

            </div>

            <div className="right-side">
                    <h1>Change Password</h1>
                    <div className="form-group">
                        <label>Old Password:</label>
                        <input onChange={(e) => setOldpass(e.target.value)} type="text" className="form-control"
                               value={oldpass}/>
                    </div>

                    <div className="form-group">
                        <label>New Password:</label>
                        <input onChange={(e) => setNewpass(e.target.value)} type="text" className="form-control"
                               value={newpass}/>
                    </div>
                    <button onClick={(e) => change_password(oldpass, newpass)} className="btn btn-success my-2">Change
                    </button>
                </div>

        </div>
    )
}

export default ProfilePage