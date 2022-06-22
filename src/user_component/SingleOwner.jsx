import React, {useState} from "react";
import Axios from "axios";
import {domain, header} from "../env";
import User_Home from "./User_Home";

const SingleOwner = ({item}) => {


    return (
        <div>
            <div className="card text-center card-width mx-2">
                <div className="card-body">
                    <h4 className="card-title">Plot No: {item?.plot_no}</h4>
                    <h5 className="card-text">Road No: {item?.road_no}</h5>
                    <h6 className="card-text">Owned Date: {item?.date}</h6>
                    <h6 className="card-text">Member Status: {item?.member_status?.title}</h6>
                    <button className="btn btn-outline-primary">See
                        Details
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SingleOwner