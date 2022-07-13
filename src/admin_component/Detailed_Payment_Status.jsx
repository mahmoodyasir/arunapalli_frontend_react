import React, {useEffect, useState} from "react";
import Axios from "axios";
import {admin_header, domain} from "../env";

const Detailed_Payment_Status = () => {

    const [all_due, setAll_due] = useState(null);
    const [total_due, setTotal_due] = useState(null);

    useEffect(() => {
        const get_all_due = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/all_due_view/`,
                headers: admin_header
            }).then(response => {
                // console.log(response.data)
                setAll_due(response.data["info"])
                setTotal_due(response.data["total_due"])
            })
        }
        get_all_due()
    }, []);


    return (
        <div className="container">
            <div className="col-md-12 beside my-3">
                <div className="card bg-info grand">
                    <h1>Total Due: <span>{total_due}</span> BDT</h1>
                </div>
            </div>

            <div className="col-md-12 card text-black bg-white scrollable">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Owner Email</th>
                        <th>First Date</th>
                        <th>Last Date</th>
                        <th>Paid</th>
                        <th>Plot No</th>
                        <th>Member Status</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        all_due?.length !== 0 ?
                            all_due?.map((item, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item?.owner_email}</td>
                                    <td>{item?.start_date}</td>
                                    <td>{item?.end_date}</td>
                                    <td>{item?.paid !== true ? "False" : "True"}</td>
                                    <td>{item?.plot_no}</td>
                                    <td>{item?.member_status}</td>
                                    <td>{item?.amount} BDT</td>
                                    <td className="text-nowrap">{item?.date}</td>
                                    {/*<td>{item?.payment_status}</td>*/}
                                    {/*<td className="text-nowrap">{item?.start_date}</td>*/}
                                    {/*<td className="text-nowrap">{item?.end_date}</td>*/}
                                    {/*<td className="text-nowrap">{item?.member_email?.payment_date}</td>*/}

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
    )
}

export default Detailed_Payment_Status