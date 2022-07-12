import React, {useEffect, useState} from "react";
import Axios from "axios";
import {admin_header, domain} from "../env";

const Payment_Status = () => {

    const [offline, setOffline] = useState(null);
    const [online, setOnline] = useState(null);
    const [onetime, setOnetime] = useState(null);
    const [start_date, setStart_date] = useState(null);
    const [end_date, setEnd_date] = useState(null);
    const [obj, setObj] = useState(null);
    const [temp_online, setTemp_online] = useState(null);
    const [temp_offline, setTemp_offline] = useState(null);
    const [temp_onetime, setTemp_onetime] = useState(null);

    //Backup State
    const [save_obj, setSave_obj] = useState(null);
    const [save_temp_offline, setSave_temp_offline] = useState(null);
    const [save_temp_online, setSave_temp_online] = useState(null);
    const [save_temp_onetime, setSave_temp_onetime] = useState(null);
    const [save_online, setSave_online] = useState(null);
    const [save_offline, setSave_offline] = useState(null);
    const [save_onetime, setSave_onetime] = useState(null);

    useEffect(() => {
        const get_payment_status = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/show_payment/`,
                headers: admin_header
            }).then(response => {
                // console.log(response.data['offline'])
                // console.log(response.data['online'])
                console.log(response.data['onetime'])
                setObj(response.data)
                setSave_obj(response.data)

                setTemp_offline(response.data["offline_amount"])
                setSave_temp_offline(response.data["offline_amount"])

                setTemp_online(response.data["online_amount"])
                setSave_temp_online(response.data["online_amount"])

                setTemp_onetime(response.data["onetime_amount"])
                setSave_temp_onetime(response.data["onetime_amount"])

                setOffline(response.data['offline'])
                setSave_offline(response.data['offline'])

                setOnline(response.data['online'])
                setSave_online(response.data['online'])

                setOnetime(response.data['onetime'])
                setSave_onetime(response.data['onetime'])
            })
        }
        get_payment_status()
    }, []);

    const get_filtered_data = async (pk, start_date, end_date) => {
        await Axios({
            method: "get",
            url: `${domain}/api/filter_payment/${pk}/${start_date}/${end_date}/`,
            headers: admin_header
        }).then(response => {
            console.log(response.data)

            if (response.data["type"] === "offline")
            {
                setOffline(response.data["data"])
                setTemp_offline(response.data["total"])
            }
            else if (response.data["type"] === "online")
            {
                setOnline(response.data["data"])
                setTemp_online(response.data["total"])
            }
            else if (response.data["type"] === "onetime")
            {
                setOnetime(response.data["data"])
                setTemp_onetime(response.data["total"])
            }
        })
    }

    const get_previous_state = () => {
        setObj(save_obj)
        setTemp_offline(save_temp_offline)
        setTemp_online(save_temp_online)
        setTemp_onetime(save_temp_onetime)
        setOffline(save_offline)
        setOnline(save_online)
        setOnetime(save_onetime)
    }

    return (
        <div className="container">
            <div className="row col-md-12 ">

                <div className="content col-md-12 my-3 content-flow">
                    <div className="card bg-info grand">
                        <h1>Grand Total: <span>{obj?.grand_amount}</span> BDT</h1>
                    </div>
                </div>

                <h1 className="beside my-3">Offline Payment Status</h1>
                <div className="col-md-12 beside">

                    <h4>From: </h4>
                    <div className="form-group my-3 mx-3">
                        <input onChange={(e) => setStart_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <h4>To: </h4>
                    <div className="form-group my-3 mx-3">
                        <input onChange={(e) => setEnd_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <div>
                        <button onClick={() => get_filtered_data("offline", start_date, end_date)} className="btn btn-outline-primary mx-3">Go</button>
                        <button onClick={get_previous_state} className="btn btn-outline-info">clear</button>
                    </div>

                    <h4 className="mx-3">Total: {temp_offline} taka</h4>

                </div>
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
                <div className="col-md-12 beside">

                    <h4>From: </h4>
                    <div className="form-group my-3 mx-3">
                        <input onChange={(e) => setStart_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <h4>To: </h4>
                    <div className="form-group my-3 mx-3">
                        <input onChange={(e) => setEnd_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <div>
                        <button onClick={() => get_filtered_data("online", start_date, end_date)} className="btn btn-outline-primary mx-3">Go</button>
                        <button onClick={get_previous_state} className="btn btn-outline-info">clear</button>
                    </div>

                    <h4 className="mx-3">Total: {temp_online} taka</h4>

                </div>
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

                <h1 className="beside my-3">Onetime Payment Status</h1>
                <div className="col-md-12 beside">

                    <h4>From: </h4>
                    <div className="form-group my-3 mx-3">
                        <input onChange={(e) => setStart_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <h4>To: </h4>
                    <div className="form-group my-3 mx-3">
                        <input onChange={(e) => setEnd_date(e.target.value)} type="date"
                               className="form-control"
                               placeholder=""/>
                    </div>

                    <div>
                        <button onClick={() => get_filtered_data("onetime", start_date, end_date)} className="btn btn-outline-primary mx-3">Go</button>
                        <button onClick={get_previous_state} className="btn btn-outline-info">clear</button>
                    </div>

                    <h4 className="mx-3">Total: {temp_onetime} taka</h4>

                </div>


                <div className="col-md-12 card text-black bg-white payment_status_scroll">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>SN</th>
                            <th>Email</th>
                            <th>Bank Name</th>
                            <th>Account No</th>
                            <th>Cheque No</th>
                            <th>NID</th>
                            <th>Paid Amount</th>
                            <th>Paid Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            onetime?.length !== 0 ?
                                onetime?.map((item, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item?.member_email}</td>
                                        <td>{item?.bank_name}</td>
                                        <td>{item?.account_no}</td>
                                        <td>{item?.cheque_number}</td>
                                        <td>{item?.member_nid}</td>
                                        <td>{item?.amount} BDT</td>
                                        <td className="text-nowrap">{item?.date}</td>
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