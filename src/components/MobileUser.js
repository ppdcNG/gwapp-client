import React from 'react';
import firebase from 'firebase'

const MobileUser = props =>{

    const logout = async ()=> {
        firebase.auth().signOut();
    }
    let {user} = props;

    return (
        <>
        <section className="d-flex px-2 mx-3 ">
            <a href="" className="align-self-center brand-name d-lg-none">gwapp</a>
            <a className="ml-auto rounded-circle inner-outer-shadow logout-icon" onClick ={logout}>
                <i className="fas fa-power-off"></i>
            </a>
        </section>
        <section className="d-lg-none inner-shadow mt-5 px-2 py-4 sm-header mx-2">
            <div className="d-flex align-items-center">
                <img className="rounded-circle mx-3" width = "50" height = "50"  alt="avatar" src={user.photoURL} />
                <h4 className="ml-5 heading-3 font-weight-bold w-50 align-self-center">Hello {user.displayName}</h4>
            </div>
        </section>
        </>
    )
}


export default MobileUser;