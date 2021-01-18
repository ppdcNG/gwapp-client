import React from 'react';
import  { NavLink } from 'react-router-dom';



const Navbar = (props)=>{
    let {user} = props
    return(
        <div className="col-lg-3 d-none d-lg-block">
            <section className="container pt-3 inner-shadow db-left-col">
                <a href="" className="align-self-center brand-name ml-3">gwapp</a>
                <div className="d-flex flex-column text-center pt-4">
                    <img className="rounded-circle mx-auto" alt="avatar" src={user.photoURL} />
                    <h2 className="w-50 mx-auto mt-2">{user.displayName}</h2>
                </div>
                <div className="d-flex flex-column justify-content-between nav align-items-center mt-5">
                    <NavLink to='/home' className = "outer-shadow" activeClassName='nav-active'>
                        <i className="fas fa-home mr-2"></i>Home
                    </NavLink>
                    
                    <NavLink to='/requisitions' className = "outer-shadow" activeClassName='nav-active'>
                        <i className="fas fa-list mr-2"></i>Requisitions
                    </NavLink>

                    <NavLink to = '/settings' className = "outer-shadow" activeClassName = "nav-active">
                        <i className="fas fa-cog mr-2"></i>Settings
                    </NavLink>
                    
                </div>
            </section>
        </div>
    )
}


export default Navbar