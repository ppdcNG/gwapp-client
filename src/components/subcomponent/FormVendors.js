import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useFormikContext } from 'formik';

import Vendor from './Vendor';

const FormVendors = (props)=>{
    let {vendorList} = props

    const  [searchTerm, setSearch ] = useState('');

    const renderVendor = (vendorList)=>{
        return vendorList.map((vend, i)=>{
            console.log(vend.accountName);
            console.log(searchTerm)
            if(vend.accountName.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1){
             return <Vendor accountName = {vend.accountName} accountNumber  = {vend.accountNumber} bankName = {vend.bankName}  />
            }
        })
    }
    
    const searchVendor = (e)=>{
        setSearch(e.target.value);
    }
    
    return(
        <>
        <div className="d-flex justify-content-between">
                    <p className="">Beneficiaries</p>
                    <input value = {searchTerm} type="text" className="inner-shadow-sm search-sm" placeholder="Search Beneficiary" onChange = {searchVendor} />
                </div>
                <div className="beneficiaries-scroll">
                    <div className="form-row beneficiaries">
                       {
                           vendorList == 0 ? <Vendor accountName = 'No Vendor Yet' accountNumber = "xxxxx" bankName = "Bank of XXX" />:
                           renderVendor(vendorList)
                       }
                    </div>
                </div>
        </>
    )
}

export default FormVendors;