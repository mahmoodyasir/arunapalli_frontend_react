import React, {useEffect, useState} from "react";
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain} from "../env";

const PaymentDate = () => {

    const [{admin_profile, fix_date}, dispatch] = useGlobalState()
    const [number, setNumber] = useState(null);

    const [start_date, setStart_date] = useState(null);
    const [end_date, setEnd_date] = useState(null);

    const receive_date = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/date_handle/`,
            headers: admin_header,
            data: {
                "start_date": start_date,
                "end_date": end_date,
            }
        }).then(response => {
            // let now = new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
            // console.log(now)

            console.log(response.data)
            alert(response.data["message"])
            dispatch({
                type: "ADMIN_PROFILE",
                admin_profile: response.data
            })
        })
    }

    const delete_date = async (id) => {
        if (fix_date?.length <= 1) {
            alert("You can not delete the last date")
        } else {
            await Axios({
                method: "delete",
                url: `${domain}/api/date_handle/${id}/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data)
                alert(response.data["message"])
                dispatch({
                    type: "ADMIN_PROFILE",
                    admin_profile: response.data
                })
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div>
                        {
                            // setNumber(fix_date?.length)

                        }
                    </div>

                    <div className="form-group my-3">
                        <label>Enter Start Date:</label>
                        <input onChange={(e) => setStart_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <div className="form-group my-3">
                        <label>Enter End Date:</label>
                        <input onChange={(e) => setEnd_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <button onClick={receive_date} className="btn btn-success">Add Date</button>

                </div>

                <div className="col-md-6">
                    <div className="scrollable">
                        <table className="table table-bordered table-striped text-center">
                            <thead className="head-position">
                            <tr>
                                <th>SN</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Applied Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                fix_date?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item?.start_date}</td>
                                        <td>{item?.end_date}</td>
                                        <td>{item?.applied_date}</td>
                                        <td>
                                            <button onClick={() => delete_date(item?.id)}
                                                    className="btn btn-outline-danger">Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentDate