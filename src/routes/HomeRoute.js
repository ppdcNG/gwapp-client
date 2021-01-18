import { useDispatch, useSelector } from 'react-redux';
import Stats from '../components/Stats';
import { useEffect } from 'react';
import {Route, Switch, useRouteMatch, Link, useHistory } from 'react-router-dom'
import RequisitionList from '../components/RequisitionList';
import RequisitionForm from '../components/RequisitionForm';
import EditRequisitionForm from '../components/EditRequisitionForm';
import Conversation from '../components/Conversation';
import MobileUser from '../components/MobileUser';
import { recentRequisitions, fetchVendorAccounts} from '../actions/dashboardActions'



const HomeRoute = (props) =>{
    let user = useSelector(({auth})=> auth);
    let recentReqs = useSelector(({recentReqs})=> recentReqs);
    let checkrecentReqs = recentReqs ? true: false;
    let dispatch = useDispatch()
    let {path, url} = useRouteMatch();
    let history = useHistory()
    useEffect(()=>{
        recentRequisitions(user.uid, dispatch)
    }, [checkrecentReqs]);

    useEffect(()=>{
        fetchVendorAccounts(user.uid, dispatch);
    }, []);
    
    return (
        <>
        
            
        
            <Switch>
                <Route exact  path = {path} >
                    <MobileUser user = {user} />

                    <Stats user={user} />
                    <section className="my-5  recent-act p-3 h-75 px-2 px-lg-4">
                        <Link to={`${url}/create`} >
                            <button className="btn btn-gw-circle float-right outer-shadow">
                                <i className="fas fa-plus"></i>
                            </button>
                        </Link>
                        <h5 className="mt-4 heading-5 ml-lg-2">Recent Activities</h5>
                        <RequisitionList user={user} recentReqs={recentReqs} />
                    </section>
                </Route>
                <Route  path = {`${path}/create`}>
                   <RequisitionForm/>
                </Route>
                <Route  path = {`${path}/edit/:id`}>
                    <EditRequisitionForm />
                </Route>
                <Route  path = {`${path}/conversation/:id`}>
                    <Conversation />
                </Route>
            </Switch>
        
        </>

    )
}

export default HomeRoute;