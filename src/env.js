import Cookies from 'js-cookie';
// export const domain = "https://mobileshopdjango.herokuapp.com";
export const domain = "http://127.0.0.1:8000";
export const userToken = window.localStorage.getItem("token")
export const adminToken = window.localStorage.getItem("admin_token")

export const header = {
    Authorization: `token ${userToken}`
}

export const admin_header = {
    Authorization: `token ${adminToken}`
}
// export const domain = "";
