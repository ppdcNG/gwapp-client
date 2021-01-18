import { useFormikContext } from "formik";



const Vendor = (props) =>{
    let {accountNumber, accountName, bankName, index} = props;
    let {setFieldValue} = useFormikContext();
    
    const vendorClick = ()=>{
      
        setFieldValue('accountName', accountName);
        setFieldValue('accountNumber',accountNumber);
        setFieldValue('bankName', bankName);
    }

    return(
        
            <div className="card outer-shadow-sm ml-3" onClick = {()=>{vendorClick()}}>
                <h5 className="heading-5">{accountName}</h5>
                <div className="d-flex justify-content-between">
                    <p className=" m-0 text-muted">{accountNumber}</p>
                    <p className=" m-0 text-muted">{bankName}</p>
                </div>
            </div>
        

    )
}


export default Vendor;