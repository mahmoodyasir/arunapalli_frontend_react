import React, {useState} from "react";
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain} from "../env";

const Member_Status = () => {
    const [{page_reload, status}, dispatch] = useGlobalState()
    const [main_amount, setMain_amount] = useState(null);
    const [general_amount, setGeneral_amount] = useState(null);
    // console.log(status)

    const update_payment_range = async (id, type, amount) => {

        if (isNaN(amount) || amount === "0") {
            alert("Enter a valid number !!!! ")
        } else {
            const formdata = new FormData()
            formdata.append("id", id);
            formdata.append("name", type);
            formdata.append("amount", amount);

            await Axios({
                method: "post",
                url: `${domain}/api/status_update/`,
                headers: admin_header,
                data: formdata
            }).then(response => {
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
            })
        }

    }

    return (
        <div className="container beside card my-3 col-md-5">
            <h1 className="display-6 my-3">Status Control</h1>
            <div className="col-md-12 card text-black bg-white">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>SN</th>
                        <th>Title</th>
                        <th>Payment Range</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        status?.length !== 0 ?
                            status?.map((item, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.title !== "None" ? item?.payment_range : "Not Applicable"}</td>
                                    <td>{item?.date}</td>
                                </tr>
                            ) :
                            <div>
                                <h1 className="beside display-6">NO Status Information FOUND</h1>
                            </div>
                    }
                    </tbody>
                </table>
            </div>

            <div>
                <h1 className="display-6 my-3">Update Status Payment Range</h1>

                <div className="form-group row my-3">
                    <label className="col-md-5">Main Member amount:</label>
                    <div className="col-md-5">
                        <input onChange={e => setMain_amount(e.target.value)} type="text" className="form-control"
                               placeholder="Write payment amount"/>
                    </div>
                    <div className="col-md-2">
                        {
                            status !== null &&
                            status?.map((item, i) => (
                                item?.title === "Main" ?
                                    (
                                        <button key={i}
                                                onClick={() => update_payment_range(item?.title === "Main" && item?.id,
                                                    item?.title === "Main" && item?.title, main_amount)}
                                                className="btn btn-outline-success">Update</button>
                                    )
                                    : ("")
                            ))
                        }
                    </div>
                </div>


                <div className="form-group row my-3">
                    <label className="col-md-5">General Member amount:</label>
                    <div className="col-md-5">
                        <input onChange={e => setGeneral_amount(e.target.value)} type="text" className="form-control"
                               placeholder="Write payment amount"/>
                    </div>
                    <div className="col-md-2">
                        {
                            status !== null &&
                            status?.map((item, i) => (
                                item?.title === "General" ?
                                    (
                                        <button key={i}
                                                onClick={() => update_payment_range(item?.title === "General" && item?.id,
                                                    item?.title === "General" && item?.title, general_amount)}
                                                className="btn btn-outline-success">Update</button>
                                    )
                                    : ("")
                            ))
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Member_Status