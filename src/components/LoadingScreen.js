import React, { Component } from 'react';


const LoadingScreen = (props)=>{

    return (
        <div className="loading-cont">
        <div className = 'd-flex align-items-center flex-column'>
            <i className="fas fa-spinner fa-3x spinning"></i>
            <p className = 'loading'>Please Wait...</p>
        </div>
    </div>
    )
}


export default LoadingScreen;