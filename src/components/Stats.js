import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchStats} from '../actions/dashboardActions';


const Stats = (props)=>{
    let {user} = props;
    let stats = useSelector(({stats})=> stats);
    let loadclass = stats ? '': 'loading';
    let dispatch = useDispatch();

    useEffect(()=>{
        fetchStats(user.uid, dispatch);
    }, [])
    
    
    return(
        <section className="mt-5 overview px-lg-4">
            <h5 className="py-3 heading-5">This Month</h5>
            <div className="d-flex justify-content-between">
                <div className={`inner-shadow column d-flex align-items-center justify-content-center py-3 ${loadclass}`}>
                    <i className="fas fa-sync-alt fa-2x"></i>
                    <div className="px-2 text-center">
                        <h4 className="stat-header">{stats.pending}</h4>
                        <p className="m-0 stat-desc">Pending</p>
                    </div>
                </div>
                <div className={`inner-shadow column d-flex align-items-center justify-content-center py-3 ${loadclass}`}>
                    <i className="fas fa-eye fa-2x"></i>
                    <div className="px-2 text-center">
                        <h4 className="stat-header">{stats.checked}</h4>
                        <p className="m-0 stat-desc">Checked</p>
                    </div>
                </div>
                <div className={`inner-shadow column d-flex align-items-center justify-content-center py-3 ${loadclass}`}>
                    <i className="fas fa-sync-alt fa-2x"></i>
                    <div className="px-2 text-center">
                        <h4 className="stat-header">{stats.approved}</h4>
                        <p className="m-0 stat-desc">Approved</p>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Stats;