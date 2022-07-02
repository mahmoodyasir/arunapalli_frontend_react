import React, {useEffect, useState} from "react";
import {admin_header, domain} from "../env";
import image from "../image_folder/defaul_img.png";
import {useGlobalState} from "../state/provider";
import Axios from "axios";

const Plot_Status_Update = ({onDialog, plot_id, status_id, email}) => {
    const [{page_reload, all_plot_road, status, admin_profile}, dispatch] = useGlobalState()
    const [plot_no, setPlot_no] = useState(null);
    const [mem_status, setMem_status] = useState(null);
    const [record_delete, setRecord_delete] = useState(null);
    const [boolean_val, setBoolean_val] = useState(null);

    useEffect(() => {
        const get_bool = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/payment_boolean/${email}/`,
                headers: admin_header
            }).then(response => {

                setBoolean_val(response.data["message"])
            })
        }
        get_bool()
    }, []);


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

                <h1 className="display-6">Update Data</h1>
                <div className="card">

                    <div className="card-body">
                        <h4 className="card-title">Do you want to update data for member <span
                            className="card-heading">{email}</span> ?</h4>
                        <h5 className="text-center">Current Plot "{plot_id}" and Current Member Status
                            "{status_id}"</h5>
                        <h6 className="text-center">Payment History: <span className="card-heading">{boolean_val !== true ? "False":"True"}</span>
                        </h6>


                        <div className="row">

                            <div className="col-md-12">
                                <div className="form-group my-2 col-md-5 center-div">
                                    <label>Select Plot No:</label>
                                    <select onChange={e => setPlot_no(e.target.value)} className="form-control">
                                        <option>Choose .......</option>

                                        {
                                            all_plot_road !== null ?
                                                (
                                                    all_plot_road['plot']?.map((item, index) => {
                                                        return <option value={item.title}
                                                                       key={index}>{item.title} </option>
                                                    })
                                                ) :
                                                ("")

                                        }

                                    </select>
                                </div>

                                <div className="form-group my-2 col-md-5 center-div">
                                    <label>Select Status:</label>
                                    <select onChange={e => setMem_status(e.target.value)} className="form-control">
                                        <option>Choose .......</option>

                                        {
                                            status?.map((item, index) => {
                                                return <option value={item.id} key={index}>{item.title} </option>
                                            })
                                        }

                                    </select>
                                </div>

                                <div className="form-check my-3 col-md-5 center-div">
                                    <label>Delete Record</label>
                                    <input onChange={() => setRecord_delete(!record_delete)} type="checkbox"
                                           className="form-check-input"/>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div>
                    <button onClick={() => onDialog("button", plot_no, mem_status, record_delete)}
                            className="btn btn-outline-info center-div mx-3">Update
                    </button>
                    <button className="btn btn-outline-success my-3 center-div mx-3"
                            onClick={() => onDialog("button")}>Cancel
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Plot_Status_Update