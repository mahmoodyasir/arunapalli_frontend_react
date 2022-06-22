import React, {useEffect, useState} from "react";
import Axios from "axios";
import {domain, header} from "../env";
import logo from '../image_folder/defaul_img.png'
import {useGlobalState} from "../state/provider";

const User_Payment_Status = () => {

    const [{page_reload, profile}, dispatch] = useGlobalState()

    const [payment_info, setPayment_info] = useState(null);
    const [specific, setSpecific] = useState(null);

    useEffect(() => {
        const get_data = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/user_payment_info/`,
                headers: header
            }).then(response => {
                setPayment_info(response.data)
            })
        }
        get_data()
    }, []);

    const specific_payment_info = async (id) => {
            await Axios({
                method: "get",
                url: `${domain}/api/user_payment_info/${id}/`,
                headers: header
            }).then(response => {
                console.log(response.data[0])
                setSpecific(response.data[0])
            })
        }


    return (
        <div className="index container">
            <div className="row">

                <div className="media beside">
                    <div>
                        <img src={`${domain}${profile?.profile?.image}`} className="rounded-circle account-image"
                             onError={(e) => {
                                 e.target.onerror = null;
                                 e.target.src = logo
                             }}/>
                    </div>
                    <div className="col-md-4 media-body card text-white bg-success mb-3">
                        <h2 className="card-title display-6">Email: {profile?.email}</h2>
                        <p className="card-text">Name: {profile?.member_firstname + " " + profile?.member_lastname}</p>
                        <p className="card-text">NID: {profile?.member_nid}</p>
                        <p className="card-text">Phone: {profile?.member_phone}</p>
                    </div>
                </div>
            </div>
            <div className="beside">
                <h1 className="display-5">Payment History</h1>
            </div>
            <div className="container">
                <div className="row beside col-md-12">
                    <div className="col-md-8 card text-black bg-white mini_scroll">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>SN</th>
                                <th>Plot No</th>
                                <th>Payment Medium</th>
                                <th>Payment Status</th>
                                <th>Date</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                payment_info?.length !== 0 ?
                                    payment_info?.map((item, i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.plot_no}</td>
                                            <td>{item?.payment_type}</td>
                                            <td>{item?.payment_status}</td>
                                            <td>{item?.date}</td>
                                            <td>
                                                <button onClick={() => specific_payment_info(item?.id)}
                                                    className="btn btn-info">Details
                                                </button>
                                            </td>
                                        </tr>
                                    ) :
                                    <div>
                                        <h1 className="beside display-6">NO Payment Information FOUND</h1>
                                    </div>
                            }
                            </tbody>
                        </table>
                    </div>

                    {specific !== null ?
                        <>
                            <div className="card text-black bg-white mb-4 mt-2">
                                <h1 className="beside display-6 mt-4">MORE DETAILS</h1>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Member Status</th>
                                        <th>Plot No</th>
                                        <th>Road No</th>
                                        <th>Cheque No</th>
                                        <th>Account No</th>
                                        <th>Paid Amount</th>
                                        <th>First Date</th>
                                        <th>Last Date</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        {
                                            <>
                                                <td>{specific?.member_status}</td>
                                                <td>{specific?.plot_no}</td>
                                                <td>{specific?.road_no}</td>
                                                <td>{specific?.member_email?.cheque_number}</td>
                                                <td>{specific?.member_email?.account_no}</td>
                                                <td>{specific?.member_email?.paid_amount} BDT</td>
                                                <td>{specific?.member_email?.start_date}</td>
                                                <td>{specific?.member_email?.end_date}</td>
                                            </>
                                        }
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <></>
                    }

                </div>
            </div>

        </div>
    )
}

export default User_Payment_Status