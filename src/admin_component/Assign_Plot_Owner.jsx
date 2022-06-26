import React, {useRef, useState} from "react";
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {admin_header, domain} from "../env";
import Dialog from "./Dialog";

const Assign_Plot_Owner = () => {

    const [{page_reload, all_member, all_plot_road, status, all_owner, admin_profile}, dispatch] = useGlobalState()
    // console.log("All Owner", all_owner)
    // console.log("All Member", all_member)
    // console.log("All Plot Road", all_plot_road)
    // console.log("All Status", status)

    const [email, setEmail] = useState(null);
    const [plot_no, setPlot_no] = useState(null);
    // const [road_no, setRoad_no] = useState(null);
    const [mem_status, setMem_status] = useState(null);

    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        //Update
        nameUser: "",
        middleButton: false,
        button1: "",
        button2: "",
        button3: ""
    });

    const idUserRef = useRef();

    const handleDialog = (message, isLoading, nameUser, middleButton, button1, button2, button3) => {
        setDialog({
            message,
            isLoading,
            //Update
            nameUser,
            middleButton,
            button1,
            button2,
            button3
        });
    };

    const handleDelete = (id, name) => {

        handleDialog("Are you sure you want to delete?", true, name, false,
            "Yes", "", "No");
        idUserRef.current = id;
    };

    const areUSureDelete = (choose) => {
        if (choose === "button1") {
            console.log("Only Owner", idUserRef.current)
            Axios({
                method: "post",
                url: `${domain}/api/owner_delete/${idUserRef.current}/${choose}/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data)
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
            })
            handleDialog("", false);
        } else {
            handleDialog("", false);
        }
    };

    const add_plot_owner = async () => {
        const formdata = new FormData()
        formdata.append("owner_email", email);
        formdata.append("plot_no", plot_no);
        // formdata.append("road_no", road_no);
        formdata.append("member_status", mem_status);

        await Axios({
            method: "post",
            url: `${domain}/api/add_plot_owner/`,
            headers: admin_header,
            data: formdata
        }).then(response => {
            dispatch({
                type: "ADMIN_PROFILE",
                admin_profile: response.data
            })
        })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 my-2">
                    <h4>Assign Plot To Owner</h4>
                    <div className="form-group my-3">
                        <label>Owner Email:</label>
                        <select onChange={e => setEmail(e.target.value)} className="form-control" value={email}>
                            <option>Select .......</option>

                            {
                                all_member?.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.email}</option>
                                })
                            }

                        </select>
                    </div>

                    <div className="form-group my-2">
                        <label>Select Plot No:</label>
                        <select onChange={e => setPlot_no(e.target.value)} className="form-control"
                                value={plot_no}>
                            <option>Choose .......</option>

                            {
                                all_plot_road !== null ?
                                    (
                                        all_plot_road['plot']?.map((item, index) => {
                                            return <option value={item.title} key={index}>{item.title} </option>
                                        })
                                    ) :
                                    ("")

                            }

                        </select>
                    </div>

                    {/*<div className="form-group my-2">*/}
                    {/*    <label>Select Road No:</label>*/}
                    {/*    <select onChange={e => setRoad_no(e.target.value)} className="form-control"*/}
                    {/*            value={road_no}>*/}

                    {/*        {*/}
                    {/*            all_plot_road !== null ?*/}
                    {/*                (*/}
                    {/*                    all_plot_road['road']?.map((item, index) => {*/}
                    {/*                        return <option value={item.title} key={index}>{item.title} </option>*/}
                    {/*                    })*/}
                    {/*                ) :*/}
                    {/*                ("")*/}
                    {/*        }*/}

                    {/*    </select>*/}
                    {/*</div>*/}

                    <div className="form-group my-2">
                        <label>Select Status:</label>
                        <select onChange={e => setMem_status(e.target.value)} className="form-control"
                                value={mem_status}>
                            <option>Choose .......</option>

                            {
                                status?.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.title} </option>
                                })
                            }

                        </select>
                    </div>
                    <button onClick={add_plot_owner} className="btn btn-outline-success my-2">Add Owner</button>

                </div>

                <div className="col-md-8">
                    <div className="scrollable">
                        <table className="table table-bordered text-center">
                            <thead className="head-position">
                            <tr>
                                <th>SN</th>
                                <th>Owner Email</th>
                                <th>Plot No</th>
                                <th>Road No</th>
                                <th>Member Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                all_owner?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item?.owner_email?.email}</td>
                                        <td>{item?.plot_no}</td>
                                        <td>{item?.road_no}</td>
                                        <td>{item?.member_status?.title}</td>
                                        <td>{item.date}</td>

                                        {/*<td>*/}
                                        {/*    <Link to={`/admin_action/add_product/product_details/${item.id}`} target="_blank" className="btn btn-info">Details</Link>*/}
                                        {/*</td>*/}
                                        <td>
                                            <button onClick={() => handleDelete(item?.id, item?.owner_email?.email)} className="btn btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

            {dialog.isLoading && (
                <Dialog
                    //Update
                    nameUser={dialog.nameUser}
                    onDialog={areUSureDelete}
                    message={dialog.message}
                    middleButton={dialog.middleButton}
                    button1={dialog.button1}
                    button2={dialog.button2}
                    button3={dialog.button3}
                />
            )}

        </div>
    )
}

export default Assign_Plot_Owner