import React from 'react';
import { NavLink } from 'react-router-dom'

const MobileNav = props =>{


    return (
        <footer>
            <section className="mobile-footer d-flex justify-content-around py-3 d-lg-none">
                <NavLink className = "outer-shadow" to='/home' activeClassName="active">
                        <i className="fas fa-home"></i>
                </NavLink>
                <NavLink className = "outer-shadow" to='/requisitions' activeClassName="active"> 
                        <i className="fas fa-list"></i>
                </NavLink>
                <NavLink className = "outer-shadow" to='/settings' activeClassName="active">
                    <i className="fas fa-cog"></i>
                </NavLink>
                
                
                
            </section>
        </footer>
    )
}


export default MobileNav;