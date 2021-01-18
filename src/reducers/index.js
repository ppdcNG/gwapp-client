import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxThunk from 'redux-thunk'
import authReducer from './auth';
import {fetchStats, recentRequisitions, projectCodes, vendorList, userList, projects} from './dashboard'

const reducers = combineReducers({
    auth: authReducer,
    stats: fetchStats,
    recentReqs: recentRequisitions,
    projectCodes,
    vendorList,
    userList,
    projects
});


var store = createStore(reducers, {}, applyMiddleware(reduxThunk));

export default store;