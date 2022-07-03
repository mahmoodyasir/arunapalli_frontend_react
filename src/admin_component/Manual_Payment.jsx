import React, {useState} from "react";
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain} from "../env";

const Manual_Payment = () => {
    const [{page_reload, all_member, all_plot_road, status, all_owner, admin_profile}, dispatch] = useGlobalState()

    const [email, setEmail] = useState(null);

    const [toogle, setToogle] = useState(false);
    const [plot_toogle, setPlot_toogle] = useState(false);

    const [cheque, setCheque] = useState(null);
    const [account_no, setAccount_no] = useState(null);
    const [nid, setNid] = useState(null);
    const [plot_no, setPlot_no] = useState(null);
    const [road_no, setRoad_no] = useState(null);
    const [member_status, setMember_status] = useState(null);
    const [payment_amount, setPayment_amount] = useState(null);


    const [user_data, setUser_data] = useState(null);
    let count = 0;

    const send_mail = async (email) => {

        if (email !== null) {
            if (toogle === true) {
                setToogle(true)
            } else {
                setToogle(true)
            }

            setRoad_no(null)
            setMember_status(null)
            setPayment_amount(null)
            setCheque(null)
            setAccount_no(null)
            setNid(null)
            setPlot_no(null)
            setPlot_toogle(false)

            await Axios({
                method: "get",
                url: `${domain}/api/retrieve_payment_info/${email}/`,
                headers: admin_header
            }).then(response => {
                // console.log(response.data[0])
                setNid(response.data[0]["member_nid"])
                setUser_data(response.data)
                // console.log(user_data)
            })
        }

    }

    const clear = () => {
        setToogle(false)
        setPlot_toogle(false)
        setRoad_no(null)
        setMember_status(null)
        setPayment_amount(null)
        setCheque(null)
        setAccount_no(null)
        setNid(null)
        setPlot_no(null)
        setPlot_toogle(false)
    }

    const option_work = async (id) => {
        console.log(id)
        // console.log(email)
        // console.log(id)
        if (plot_toogle === true) {
            setPlot_toogle(true)
        } else {
            setPlot_toogle(true)
        }
        const formdata = new FormData()
        formdata.append("owner_email", email);
        formdata.append("plot_id", id);

        await Axios({
            method: "post",
            url: `${domain}/api/get_plot_owner/`,
            headers: admin_header,
            data: formdata
        }).then(response => {
            console.log(response.data)
            setRoad_no(response.data[0]["road_no"])
            setMember_status(response.data[0]["member_status"]["title"])
            setPayment_amount(response.data[0]["member_status"]["payment_range"])
        })
    }

    const pay_fee = async () => {

        if (member_status !== "None") {
            const formdata = new FormData()
            formdata.append("member_email", email);
            formdata.append("cheque_number", cheque);
            formdata.append("account_no", account_no);
            formdata.append("member_nid", nid);
            formdata.append("plot_no", plot_no);
            formdata.append("road_no", road_no);
            formdata.append("member_status", member_status);
            formdata.append("paid_amount", payment_amount);

            await Axios({
                method: "post",
                url: `${domain}/api/offline_payment/`,
                headers: admin_header,
                data: formdata
            }).then(response => {
                alert(response.data["message"])
                console.log(response.data["message"])
            })
        }
        else
        {
            setPlot_toogle(false)
            alert("Member type 'None' detected !!")
        }

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 my-2">
                    <h3>Select An Email To Pay</h3>
                    <div className="form-group my-3">
                        <label>Select an Email:</label>
                        <select onChange={e => setEmail(e.target.value)} className="form-control" value={email}>
                            <option>Select .......</option>
                            {

                                all_member !== null ?
                                    (
                                        all_member?.map((item, index) => {
                                            return <option value={item.email} key={index}>{item.email}</option>
                                        })
                                    ) :
                                    ("")
                            }
                        </select>
                    </div>
                    <button onClick={() => send_mail(email)} className="btn btn-outline-primary">Go</button>
                    <button onClick={clear} className="btn btn-outline-danger mx-3">Clear</button>
                </div>

                <div className="col-md-8">
                    {
                        toogle !== false ?
                            (
                                <div className="my-2">
                                    <h3>Provide Payment Information</h3>

                                    <div className="form-group my-3">
                                        <label>Enter Bank Cheque Number:</label>
                                        <input onChange={(e) => setCheque(e.target.value)} type="text"
                                               className="form-control"
                                               placeholder="Write Cheque Number"/>
                                    </div>

                                    <div className="form-group my-3">
                                        <label>Enter Bank Account Number:</label>
                                        <input onChange={(e) => setAccount_no(e.target.value)} type="text"
                                               className="form-control"
                                               placeholder="Write Account Number"/>
                                    </div>

                                    <div className="form-group my-3">
                                        <label>Member NID:</label>
                                        <input onChange={(e) => setNid(e.target.value)} type="text"
                                               className="form-control"
                                               placeholder="Write NID Number"
                                               value={nid} readonly="readonly"/>
                                    </div>

                                    <div className="row col-md-8">
                                        <label>Select Plot No:</label>
                                        <div className="form-group mt-2 col-md-6">

                                            <select onChange={e => setPlot_no(e.target.value)} className="form-control"
                                                    value={plot_no}>
                                                <option>Select an option ........</option>
                                                {
                                                    user_data !== null ?
                                                        (
                                                            user_data[0]["owner_plot_info"]?.map((item, index) => {
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
                                                               value={road_no} readonly="readonly"/>
                                                    </div>

                                                    <div className="form-group my-3">
                                                        <label>Member Status:</label>
                                                        <input onChange={(e) => setMember_status(e.target.value)}
                                                               type="text"
                                                               className="form-control"
                                                               value={member_status} readonly="readonly"/>
                                                    </div>

                                                    <div className="form-group my-3">
                                                        <label>Payment Amount:</label>
                                                        <input onChange={(e) => setPayment_amount(e.target.value)}
                                                               type="text"
                                                               className="form-control"
                                                               value={payment_amount + " taka"} readonly="readonly"/>
                                                    </div>
                                                    <button onClick={pay_fee} className="btn btn-outline-success">Pay
                                                        Membership Fee
                                                    </button>

                                                </div>
                                            ) :
                                            ("")
                                    }

                                </div>

                            ) :
                            ("")
                    }
                </div>

            </div>
        </div>
    )
}

export default Manual_Payment