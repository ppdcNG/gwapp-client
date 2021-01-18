import {Switch, Route, Redirect} from 'react-router-dom';

import HomeRoute from './HomeRoute';
import RequisitionRoute from './RequisitionRoutes';
import SettingsRoute from './SettingRoute';



const MainRoute = (props)=>{
    return (
        <Switch>
            <Route exact path = "/requisitions">
                <RequisitionRoute/>
            </Route>
            <Route exact path = "/settings">
                <SettingsRoute/>
            </Route>
            <Route  path = "/home">
                <HomeRoute/>
            </Route>
            <Route  path = "/">
                <Redirect to = '/home' />
            </Route>
        </Switch>
    )
}

export default MainRoute;