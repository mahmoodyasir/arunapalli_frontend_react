import React, {useEffect, useState} from "react";
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain, header} from "../env";

const Online_Payment = () => {

    const [{page_reload, profile}, dispatch] = useGlobalState()
    const [info, setInfo] = useState(null);
    const [plot_toogle, setPlot_toogle] = useState(false);

    const [email, setEmail] = useState(profile !== null && profile?.email);
    const [phone, setPhone] = useState(profile !== null && profile?.member_phone);
    const [name, setName] = useState(profile !== null && profile?.member_firstname + " " + profile?.member_lastname);
    const [nid, setNid] = useState(profile !== null && profile?.member_nid);
    const [plot_no, setPlot_no] = useState(null);
    const [road_no, setRoad_no] = useState(null);
    const [member_status, setMember_status] = useState(null);
    const [payment_amount, setPayment_amount] = useState(null);

    useEffect(() => {
        const user_payment_info = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/user_payment_view/`,
                headers: header
            }).then(response => {
                // console.log(response.data)
                setInfo(response.data)
            })
        }
        user_payment_info()
    }, []);


    const option_work = async (id) => {
        // console.log(email)
        // console.log(id)
        const formdata = new FormData()
        formdata.append("owner_email", email);
        formdata.append("plot_id", id);

        await Axios({
            method: "post",
            url: `${domain}/api/get_plot_owner/`,
            headers: header,
            data: formdata
        }).then(response => {
            console.log(response.data)

            if (response.data[0]["member_status"]["title"] !== "None") {

                if (plot_toogle === true) {
                    setPlot_toogle(true)
                } else {
                    setPlot_toogle(true)
                }

                setRoad_no(response.data[0]["road_no"])
                setMember_status(response.data[0]["member_status"]["title"])
                setPayment_amount(response.data[0]["member_status"]["payment_range"])
            } else {
                alert("You are not a member of that Plot !!!!")
                setPlot_toogle(false)
                setPlot_no(null)
                setRoad_no(null)
                setPayment_amount(null)
                setMember_status(null)
            }

        })
    }

    const make_payment = async () => {

        if (member_status !== "None") {
            const formdata = new FormData()
            formdata.append("email", email);
            formdata.append("phone", phone);
            formdata.append("name", name);
            formdata.append("nid", nid);
            formdata.append("plot_no", plot_no);
            formdata.append("road_no", road_no);
            formdata.append("member_status", member_status);
            formdata.append("payment_amount", payment_amount);

            await Axios({
                method: "post",
                url: `${domain}/api/online_payment/`,
                headers: header,
                data: formdata
            }).then(response => {
                console.log(response.data["data"])

                if (response.data["data"] !== "invalid") {
                    // window.open(response.data, '_blank', 'noopener,noreferrer');
                    window.location.replace(response.data);
                } else {
                    alert("You already paid for the Plot within last date")
                }

            })


        }

    }


    return (
        <div className="index container">
            <div className="row">
                <div className="col-md-8">

                    <div className="form-group my-3">
                        <label>Email Field: </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text"
                               className="form-control"
                               value={email} readOnly="readonly"/>
                    </div>

                    <div className="form-group my-3">
                        <label>Name Field: </label>
                        <input onChange={(e) => setName(e.target.value)} type="text"
                               className="form-control"
                               value={name} readOnly="readonly"/>
                    </div>

                    <div className="form-group my-3">
                        <label>Phone Field: </label>
                        <input onChange={(e) => setPhone(e.target.value)} type="text"
                               className="form-control"
                               value={phone} readOnly="readonly"/>
                    </div>

                    <div className="form-group my-3">
                        <label>NID Field: </label>
                        <input onChange={(e) => setNid(e.target.value)} type="text"
                               className="form-control"
                               value={nid} readOnly="readonly"/>
                    </div>


                    <div className="row col-md-8">
                        <label>Select Plot No:</label>
                        <div className="form-group mt-2 col-md-6">

                            <select onChange={e => setPlot_no(e.target.value)} className="form-control"
                                    value={plot_no}>
                                <option>Select an option ........</option>
                                {
                                    info !== null ?
                                        (
                                            info?.map((item, index) => {
                                                return <option value={item?.plot_no}
                                                               key={index}>{item?.plot_no}</option>
                                            })
                                        ) :
                                        ("")
                                }

                            </select>
                        </div>
                        <div className="col-md-4 mt-2">
                            <button onClick={() => option_work(plot_no)}
                                    className="btn btn-outline-info">Select
                            </button>
                        </div>
                    </div>

                    {
                        plot_toogle !== false ?
                            (
                                <div>

                                    <div className="form-group my-3">
                                        <label>Road No:</label>
                                        <input onChange={(e) => setRoad_no(e.target.value)} type="text"
                                               className="form-control"
                                               value={road_no} readOnly="readonly"/>
                                    </div>

                                    <div className="form-group my-3">
                                        <label>Member Status:</label>
                                        <input onChange={(e) => setMember_status(e.target.value)}
                                               type="text"
                                               className="form-control"
                                               value={member_status} readOnly="readonly"/>
                                    </div>

                                    <div className="form-group my-3">
                                        <label>Payment Amount:</label>
                                        <input onChange={(e) => setPayment_amount(e.target.value)}
                                               type="text"
                                               className="form-control"
                                               value={payment_amount + " taka"} readOnly="readonly"/>
                                    </div>
                                    <button onClick={make_payment} className="btn btn-outline-success">Pay With
                                        SSLCommerz
                                    </button>

                                </div>
                            ) :
                            ("")
                    }


                </div>
            </div>
        </div>
    )
}

export default Online_Payment