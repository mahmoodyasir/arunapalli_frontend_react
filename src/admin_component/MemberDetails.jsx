import React, {useEffect, useState} from "react";
import image from '../image_folder/defaul_img.png'
import Axios from "axios";
import {admin_header, domain} from "../env";

const MemberDetails = ({onDialog, id}) => {

    const [obj, setObj] = useState(null);

    // Axios({
    //     method: "get",
    //     url: `${domain}/api/member_details/${id}/`,
    //     headers: admin_header
    // }).then(response => {
    //     console.log(response.data)
    // })

    useEffect(() => {
        const get_member_details = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/member_details/${id}/`,
                headers: admin_header
            }).then(response => {
                // console.log(response.data[0])
                setObj(response.data[0])
            })
        }
        get_member_details()
    }, []);

    console.log(obj)


    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
            onClick={() => onDialog(false)}>

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px"
                }}>

                <h1 className="display-6">Member Details</h1>
                <div className="card">
                    {
                        obj?.profile?.image !== null ?
                            (
                                 <img className="card-img-top rounded-circle w-25 mx-auto" src={`${domain}${obj?.profile?.image}`} alt="Card image cap"/>
                            ) :
                            (
                                 <img className="card-img-top rounded-circle w-25 mx-auto" src={image} alt="Card image cap"/>
                            )
                    }

                    <div className="card-body">
                        <h4 className="card-title">Email: {obj?.email}</h4>
                        <h5>Firstname: {obj?.member_firstname}</h5>
                        <h5>Lastname: {obj?.member_lastname}</h5>
                        <h5>NID: {obj?.member_nid}</h5>
                        <h5>Phone: {obj?.member_phone}</h5>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Onetime Payment: {obj?.onetime_payment !== true? "False" : "True"}</small>
                    </div>
                </div>
                <button className="btn btn-outline-success my-3" onClick={() => onDialog("button")}>Close</button>

            </div>

        </div>
    )
}

export default MemberDetails