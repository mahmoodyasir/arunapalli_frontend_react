export const initialstate = {
    profile:null,
    page_reload: null,
    admin_profile: null,
    user_profile: null,
    status: null,
    plot_position: null,
    all_plot_road: null,
    all_member: null,
    all_owner: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "PAGE_RELOAD":
            return {
                ...state,
                page_reload: action.page_reload
            }
        case "ADMIN_PROFILE":
            return {
                ...state,
                admin_profile: action.admin_profile
            }
        case "USER_PROFILE":
            return {
                ...state,
                user_profile: action.user_profile
            }
        case "STATUS":
            return {
                ...state,
                status: action.status
            }
        case "PLOT_POSITION":
            return {
                ...state,
                plot_position: action.plot_position
            }
        case "ALL_PLOT_ROAD":
            return {
                ...state,
                all_plot_road: action.all_plot_road
            }
        case "ALL_MEMBER":
            return {
                ...state,
                all_member: action.all_member
            }
        case "ALL_OWNER":
            return {
                ...state,
                all_owner: action.all_owner
            }

        default:
            return this.state;
    }
}

export default reducer;