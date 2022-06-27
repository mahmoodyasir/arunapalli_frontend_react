import React from "react";
import '../user_component/user_component_style.css'
import {useGlobalState} from "../state/provider";
import sidepic from '../image_folder/swamp.png'

const Admin_Homepage = () => {

    const [{all_table}, dispatch] = useGlobalState()
    console.log(all_table)

    return(
        <div className="container">
            <div className="col-md-10 my-3">
                <h1 className="beside display-6">Summary Of Activities</h1>
                <div className="card mb-3 bg-light">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={sidepic} className="img-fluid rounded-start h-100" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-light bg-primary rounded beside display-6">Total User: {all_table?.user}</h5>
                            <h5 className="card-title text-light bg-warning rounded beside display-6">Total Members: {all_table?.member}</h5>
                            <h5 className="card-title text-light bg-info rounded beside display-6">Total Plot: {all_table?.plot}</h5>
                            <h5 className="card-title text-light bg-orange rounded beside display-6">Total Road: {all_table?.road}</h5>
                            <h5 className="card-title text-light bg-teal rounded beside display-6">Total Assigned Plot:{all_table?.assigned_plot} </h5>
                            <h5 className="card-title text-light bg-purple rounded beside display-6">Total Online Payment: {all_table?.online}</h5>
                            <h5 className="card-title text-light bg-indigo rounded beside display-6">Total Offline Payment: {all_table?.offline}</h5>
                            {/*<p className="card-text btn rounded bg-success text-white">Manage Incomplete Carts</p>*/}

                        </div>
                    </div>
                </div>
            </div>


            </div>
        </div>
    )
}

export default Admin_Homepage