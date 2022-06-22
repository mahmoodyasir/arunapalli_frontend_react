import React, {useEffect, useState} from "react";
import Axios from "axios";
import {domain, header} from "../env";
import {useHistory} from "react-router-dom";

const User_Home = () => {

    const [owner, setOwner] = useState(null);
    const [plot_owner, setPlot_owner] = useState(null);


    const get_plot_user = async (id) => {
        await Axios({
            method: "get",
            url: `${domain}/api/all_owner_view/${id}/`,
            headers: header
        }).then(response => {
            console.log(response.data)
            setPlot_owner(response.data)
        })
    }

    useEffect(() => {
        const get_owner = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/plot_owner/`,
                headers: header
            }).then(response => {
                console.log(response.data)
                setOwner(response.data)
            })
        }
        get_owner()
    }, []);


    return (
        <div className="container index">
            <div className="row row2">
                <div className="col-md-9 control-card">
                    <h1 className="beside display-6">Plot Owned By You: </h1>
                    {
                        owner !== null &&
                        owner?.map((item, i) => (

                            <div className="card text-center card-width mx-2">
                                <div className="card-body">
                                    <h4 className="card-title">Plot No: {item?.plot_no}</h4>
                                    <h5 className="card-text">Road No: {item?.road_no}</h5>
                                    <h6 className="card-text">Owned Date: {item?.date}</h6>
                                    <h6 className="card-text">Member Status: {item?.member_status?.title}</h6>
                                    <button onClick={() => get_plot_user(item?.plot_no)}
                                            className="btn btn-outline-primary">See
                                        Other Owner Details
                                    </button>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
            {

                plot_owner !== null &&
                <div className="col-md-12 my-3 beside table-font">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <td>SN</td>
                            <td>Owner Email</td>
                            <td>Mobile</td>
                            <td>NID</td>
                            <td>Firstname</td>
                            <td>Lastname</td>
                            <td>Member Status</td>
                            <td>Plot No</td>
                            <td>Road No</td>
                            <td>Ownership Date</td>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            plot_owner?.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item?.owner_email?.email}</td>
                                    <td>{item?.owner_email?.member_phone}</td>
                                    <td>{item?.owner_email?.member_nid}</td>
                                    <td>{item?.owner_email?.member_firstname}</td>
                                    <td>{item?.owner_email?.member_lastname}</td>
                                    <td>{item?.member_status?.title}</td>
                                    <td>{item?.plot_no}</td>
                                    <td>{item?.road_no}</td>
                                    <td>{item?.date}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}

export default User_Home