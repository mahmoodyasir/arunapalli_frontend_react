import React, {useEffect, useState} from "react";
import {useGlobalState} from "../state/provider";
import './CSS/common.css'
import Axios from "axios";
import {admin_header, domain} from "../env";

const Add_Plot_Position = () => {

    const [{plot_position, page_reload, all_plot_road}, dispatch] = useGlobalState()
    const [plot_no, setPlot_no] = useState(null);
    const [road_no, setRoad_no] = useState(null);

    const [new_plot, setNew_plot] = useState(null);
    const [new_road, setNew_road] = useState(null);

    const plot_with_road = async () => {
        const formdata = new FormData()
        formdata.append("plot_no", plot_no);
        formdata.append("road_no", road_no);

        await Axios({
            method: "post",
            url: `${domain}/api/add_plot_road/`,
            headers: admin_header,
            data: formdata
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const new_plot_add = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/plot_add/`,
            headers: admin_header,
            data: {"title": new_plot}
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const new_road_add = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/road_add/`,
            headers: admin_header,
            data: {"title": new_road}
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    // console.log(all_plot_road['plot'])
    // console.log(all_plot_road['road'])
    return (
        <div className="container my-2">
            <div className="row">
                <div className="col-md-4">
                    <h4>Plot Position According To Road </h4>
                    <div className="scrollable">
                        <table className="table table-bordered text-center">
                            <thead className="head-position">
                            <tr>
                                <th>SN</th>
                                <th>Plot No</th>
                                <th>Road No</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                plot_position?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.plot_no}</td>
                                        <td>{item.road_no}</td>
                                        <td>{item.date}</td>

                                        {/*<td>*/}
                                        {/*    <Link to={`/admin_action/add_product/product_details/${item.id}`} target="_blank" className="btn btn-info">Details</Link>*/}
                                        {/*</td>*/}
                                        <td>
                                            <button className="btn btn-primary">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>
                    </div>
                </div>

                <div className="col-md-4">
                    <h4>All Plot No List</h4>
                    <div className="scrollable">
                        <table className="table table-bordered text-center">
                            <thead className="head-position">
                            <tr>
                                <th>SN</th>
                                <th>Plot No</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                all_plot_road['plot']?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.date}</td>

                                        <td>
                                            <button className="btn btn-primary">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>
                    </div>
                </div>


                <div className="col-md-4">
                    <h4>All Road No List</h4>
                    <div className="scrollable">
                        <table className="table table-bordered text-center">
                            <thead className="head-position">
                            <tr>
                                <th>SN</th>
                                <th>Road No</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                all_plot_road['road']?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.date}</td>

                                        <td>
                                            <button className="btn btn-primary">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>


            {/*Data Insertion Part*/}

            <div className="row my-2">
                <div className="col-md-4">
                    <h4>Select Plot Position with Road</h4>
                    <div className="form-group my-2">
                        <label>Select Plot No:</label>
                        <select onChange={e => setPlot_no(e.target.value)} className="form-control"
                                value={plot_no}>

                            {
                                all_plot_road['plot']?.map((item, index) => {
                                    return <option value={item.title} key={index}>{item.title} </option>
                                })
                            }

                        </select>
                    </div>

                    <div className="form-group my-2">
                        <label>Select Road No:</label>
                        <select onChange={e => setRoad_no(e.target.value)} className="form-control"
                                value={road_no}>

                            {
                                all_plot_road['road']?.map((item, index) => {
                                    return <option value={item.title} key={index}>{item.title} </option>
                                })
                            }

                        </select>
                    </div>
                    <button onClick={plot_with_road} className="btn btn-success">Submit</button>

                </div>


                <div className="col-md-4">
                    <h4>Create Plot Position</h4>
                    <div className="form-group my-2">
                        <label >Enter Plot Number:</label>
                        <input onChange={(e) => setNew_plot(e.target.value)} type="text" className="form-control" placeholder="Write Plot Number"/>
                    </div>

                    <button onClick={new_plot_add} className="btn btn-success">Submit</button>

                </div>


                <div className="col-md-4">
                    <h4>Create Road Position</h4>
                    <div className="form-group my-2">
                        <label >Enter Road Number:</label>
                        <input onChange={(e) => setNew_road(e.target.value)} type="text" className="form-control" placeholder="Write Road Number"/>
                    </div>

                    <button onClick={new_road_add} className="btn btn-success">Submit</button>

                </div>

            </div>
        </div>
    )
}

export default Add_Plot_Position