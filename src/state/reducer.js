export const initialstate = {
    profile:null,
    page_reload: null,
    admin_profile: null,
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

        default:
            return this.state;
    }
}

export default reducer;