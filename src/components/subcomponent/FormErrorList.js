

const FormErrorList = (props) =>{
    let {errors} = props;
    
    return(
        <div className = "mt-5 d-flex flex-column justify-content-around px-lg-5">
            <h5 className = "h5">Errors</h5>
            {
                Object.keys(errors).map((key)=>(
                    <div className = 'error-list-item mt-1'> <b>{key}</b>: {errors[key]}</div>
                ))
            }
        </div>
    )
}

export default FormErrorList;