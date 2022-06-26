import React, {useEffect, useState} from "react";
import Axios from "axios";
import {admin_header, domain} from "../env";

const Payment_Status = () => {

    const [offline, setOffline] = useState(null);
    const [online, setOnline] = useState(null);

    useEffect(() => {
        const get_payment_status = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/all_payment_status/`,
                headers: admin_header
            }).then(response => {
                // console.log(response.data['offline'])
                // console.log(response.data['online'])

                setOffline(response.data['offline'])
                setOnline(response.data['online'])
            })
        }
        get_payment_status()
    }, []);


    return (
        <div className="container">
            <div className="row">
                <h1 className="beside my-3">Offline Payment Status</h1>
                <div className="col-md-12 card text-black bg-white payment_status_scroll">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Email</th>
                            <th>Cheque No</th>
                            <th>Account No</th>
                            <th>NID</th>
                            <th>Plot No</th>
                            <th>Road No</th>
                            <th>Member Status</th>
                            <th>Paid Amount</th>
                            <th>Payment Status</th>
                            <th>First Date</th>
                            <th>Last Date</th>
                            <th>Paid Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            offline?.length !== 0 ?
                                offline?.map((item, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item?.member_email?.member_email?.email}</td>
                                        <td>{item?.member_email?.cheque_number}</td>
                                        <td>{item?.member_email?.account_no}</td>
                                        <td>{item?.member_email?.member_email?.member_nid}</td>
                                        <td>{item?.plot_no}</td>
                                        <td>{item?.road_no}</td>
                                        <td>{item?.member_status}</td>
                                        <td>{item?.member_email?.paid_amount}</td>
                                        <td>{item?.payment_status}</td>
                                        <td className="text-nowrap">{item?.start_date}</td>
                                        <td className="text-nowrap">{item?.end_date}</td>
                                        <td className="text-nowrap">{item?.member_email?.payment_date}</td>

                                    </tr>
                                ) :
                                <div>
                                    <h1 className="beside display-6">NO Payment Information FOUND</h1>
                                </div>
                        }
                        </tbody>
                    </table>
                </div>

                <h1 className="beside my-3">Online Payment Status</h1>
                <div className="col-md-12 card text-black bg-white payment_status_scroll">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Email</th>
                            <th>Transaction ID</th>
                            <th>Medium</th>
                            <th>NID</th>
                            <th>Plot No</th>
                            <th>Road No</th>
                            <th>Member Status</th>
                            <th>Paid Amount</th>
                            <th>Payment Status</th>
                            <th>First Date</th>
                            <th>Last Date</th>
                            <th>Paid Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            online?.length !== 0 ?
                                online?.map((item, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item?.online_email?.email?.email}</td>
                                        <td>{item?.online_email?.transaction_id}</td>
                                        <td>{item?.online_email?.medium}</td>
                                        <td>{item?.online_email?.member_nid}</td>
                                        <td>{item?.plot_no}</td>
                                        <td>{item?.road_no}</td>
                                        <td>{item?.member_status}</td>
                                        <td>{item?.online_email?.paid_amount}</td>
                                        <td>{item?.payment_status}</td>
                                        <td className="text-nowrap">{item?.start_date}</td>
                                        <td className="text-nowrap">{item?.end_date}</td>
                                        <td className="text-nowrap">{item?.online_email?.payment_date}</td>
                                    </tr>
                                ) :
                                <div>
                                    <h1 className="beside display-6">NO Payment Information FOUND</h1>
                                </div>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Payment_Status