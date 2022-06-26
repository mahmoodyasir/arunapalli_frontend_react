import React, {useEffect, useState} from "react";
import {admin_header, domain} from "../../env";
import image from "../../image_folder/defaul_img.png";
import Axios from "axios";

const OwnershipHistory = () => {

    const [owner_history, setOwner_history] = useState(null);

    useEffect(() => {
        const get_owner_history = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/owner_history/`,
                headers: admin_header
            }).then(response => {
                console.log(response.data)
                setOwner_history(response.data)
            })
        }
        get_owner_history()
    }, []);


    return (
        <div className="container">
            <h1 className="display-6 beside my-3">Owner History</h1>
                    <div className="col-md-12 card text-black bg-white scrollable">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>SN</th>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>NID</th>
                                <th>Phone</th>
                                <th>Plot No</th>
                                <th>Road No</th>
                                <th>Member Status</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                owner_history?.length !== 0 ?
                                    owner_history?.map((item, i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.owner_email}</td>
                                            <td>{item?.member_firstname}</td>
                                            <td>{item?.member_lastname}</td>
                                            <td>{item?.member_nid}</td>
                                            <td>{item?.member_phone}</td>
                                            <td>{item?.plot_no}</td>
                                            <td>{item?.road_no}</td>
                                            <td>{item?.member_status}</td>
                                            <td>{item?.date}</td>

                                        </tr>
                                    ) :
                                    <div>
                                        <h1 className="beside display-6">NO Member Information FOUND</h1>
                                    </div>
                            }
                            </tbody>
                        </table>
                    </div>
        </div>
    )
}

export default OwnershipHistory