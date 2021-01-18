import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {FETCH_USER} from '../actions/types'
import { signIn } from '../actions/authActions';
import '../css/landing.css';

const Login = props =>{
    const dispatch = useDispatch();
    var [loading, setLoading] = useState(false);
    var [adminLoading, setAdminLoading] = useState(false);
    const googleSignIn = async ()=>{
        setLoading(true)
        let result = await signIn();
        if(result.err){
            setLoading(false);
        }
        if(result.user){
            dispatch({type: FETCH_USER, payload: result.user});
        }
    }
    return (
        <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="row">
                <div className="col-lg-6 header">
                    <h1 className="heading-1">For collecting Money</h1>
                    <p className="tagline ml-">gwapp  is an initiative of the PPDC Finance and Tech teams, to facilitace, organise and manage financial requisitions within the organisations</p>
                    {loading ? <button className="btn btn-gw-primary disabled"><i className="fas fa-spinner spinning"></i></button> :<button className="btn btn-gw-primary" onClick = {googleSignIn}>Sign in <i className="fab fa-google"></i></button>}
                    {adminLoading ? <button className="btn btn-gw-secondary disabled"><i className="fas fa-spinner spinning"></i></button> : <button className="btn btn-gw-secondary">Admin Signin <i className="fab fa-google"></i></button>}
                </div>
                <div className="col-lg-6 d-none d-lg-block right-col-landing">
                    <div className="inner-shadow diamond diamond-1"></div>
                    <div className="inner-shadow diamond diamond-2"></div>
                    <div className="inner-shadow diamond diamond-3"></div>
                </div>
            </div>
        </div>
    )
}


export default Login;