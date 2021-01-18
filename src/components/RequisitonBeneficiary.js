import FormVendors from './subcomponent/FormVendors';
import FormUserList from './subcomponent/FormUserList';
import FormErrorList from './subcomponent/FormErrorList';
import {useState} from 'react';
import { useSelector } from 'react-redux';
import {addVendor} from '../actions/dashboardActions';


const RequisitionBeneficiary = (props)=>{
    const {values, handleChange, setStep, errors, touched, isSubmitting} = props;
    const auth = useSelector(({auth})=>auth);
    let vendorList = useSelector(({vendorList})=> vendorList);
    const [isSaving, setIsSaving] = useState(false);
    console.log({touched})
    const saveVendor = async ()=>{
        if([values.bankName, values.accountNumber, values.accountName].includes('')){
            console.log("emptyvalues");
            return
        }
        setIsSaving(true);
        try {
            await addVendor(auth.uid, values.accountName, values.accountNumber, values.bankName);
        } catch (error) {
            console.log(error);
        }
        
        setIsSaving(false)

    }
    return (
        <>
            <h4 className="mb-3 heading-4">Bank Details</h4>
            <div className="container">
                <FormVendors vendorList = {vendorList} />
            </div>
            <div className="container mt-4">
                <div className="form-group">
                    <label className="m-0" htmlFor="beneficiary">Name of Beneficiary</label>
                    <input name = "accountName" value = {values.accountName} onChange = {handleChange} type="text" id="beneficiary" className={`form-control inner-shadow-sm ${errors.accountName && touched.accountName && 'is-invalid'}`} />
                    <div class = "invalid-feedback">{(errors.accountName && touched.accountName) ? errors.accountName: ''}</div>
                </div>
                <div className="form-group">
                    <label className="m-0" htmlFor="beneficiary-bank">Beneficiary Bank Name</label>
                    <input name = "bankName" value = {values.bankName} onChange = {handleChange} type="text" id="beneficiary-bank" className={`form-control inner-shadow-sm ${errors.bankName  && touched.bankName && 'is-invalid'}`} />
                    <div class = "invalid-feedback">{(errors.bankName && touched.bankName) ? errors.bankName: ''}</div>
                </div>
                <div className="form-group">
                    <label className="m-0" htmlFor="beneficiary-account">Beneficiary Account Number</label>
                    <input name = "accountNumber" value = {values.accountNumber} onChange = {handleChange} type="text" id="beneficiary-account" className={`form-control inner-shadow-sm ${errors.accountNumber && touched.accountNumber && 'is-invalid'}`} />
                    <div class = "invalid-feedback">{(errors.accountNumber && touched.accountNumber) ? errors.accountNumber: ''}</div>
                </div>
                <div className = "d-flex">
                    { isSaving ? <button type = "button" className="btn btn-input-secondary-sm outer-shadow-sm ml-auto loading disabled"><i class="fas fa-save print-icon mr-2"></i> Save</button>: <button onClick = {()=>{saveVendor()}} type = "button" className="btn btn-input-secondary-sm outer-shadow-sm ml-auto"><i class="fas fa-save print-icon mr-2"></i> Save</button>}
                </div>
                <div className="mt-5 px-0 px-lg-2">
                    <div className="user-list-cont">
                        <div className="d-flex attendees-avatar">
                            <FormUserList />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="currency">Requisition Attentioned To?</label>
                            <div name="" id="" className="inner-shadow-sm p-2">{values.attentionTo ? values.attentionTo.join(', '): ''}</div>
                        </div>
                    </div>
                </div>
                {
                    Object.keys(errors).length !== 0 && Object.keys(touched).length !==0 ? <FormErrorList errors = {errors} /> : ''
                }
                <div className="d-flex justify-content-between py-5">
                    {
                        isSubmitting ? <button type="button" className="btn btn-gw-secondary outer-shadow-sm disabled" onClick ={ ()=> setStep('step', 2)} >Back</button>:<button type="button" className="btn btn-gw-secondary outer-shadow-sm" onClick ={ ()=> setStep('step', 2)} >Back</button>
                    }
                    {
                        isSubmitting ? <button type="button" className="btn btn-gw-primary outer-shadow-sm loading disabled">Please Wait..</button> :<button type="submit" className="btn btn-gw-primary outer-shadow-sm">Submit Requisition</button>
                    }
                    
                    
                </div>
            </div>
        </>
    )
}

export default RequisitionBeneficiary