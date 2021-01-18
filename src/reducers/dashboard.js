import { FETCH_STATS, RECENT_REQS, PROJECT_CODES, VENDOR_LIST, USER_LIST, PROJECT_LIST } from '../actions/types'

export const fetchStats = (state = {pending: 0, approve: 0, checked: 0}, action)=>{
    switch (action.type) {
        case FETCH_STATS:
            return action.payload || false
        default:
            return state
    }
}
export const recentRequisitions = (state = null, action)=>{
    switch (action.type) {
        case RECENT_REQS:
            return action.payload || false
        default:
            return state
    }
}

export const projectCodes = (state = null, action)=>{
    switch (action.type) {
        case PROJECT_CODES:
            return action.payload || false
        default:
            return state
    }
}

export const vendorList = (state = null, action)=>{
    switch (action.type) {
        case VENDOR_LIST:
            return action.payload || false
        default:
            return state
    }
}

export const userList = (state = null, action)=>{

    switch (action.type) {
        case USER_LIST:
            return action.payload || false
        default:
            return state
    }

}
export const projects = (state = null, action)=>{

    switch (action.type) {
        case PROJECT_LIST:
            return action.payload || false
        default:
            return state
    }

}
