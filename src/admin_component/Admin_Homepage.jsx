import React from "react";
import '../user_component/user_component_style.css'
import {useGlobalState} from "../state/provider";

const Admin_Homepage = () => {

    const [{page_reload, user_profile}, dispatch] = useGlobalState()

    return(
        <div className="content">
            <h1>Admin Homepage</h1>
        </div>
    )
}

export default Admin_Homepage