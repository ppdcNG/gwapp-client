import React from 'react';
import {Formik, Form} from  'formik';
import {useSelector} from 'react-redux'
import RequisitionInfo from './RequisitionInfo';
import RequisitionItems from './RequisitionItems';
import RequisitionBeneficiary from './RequisitonBeneficiary';
import { submitRequisition, editRequisition } from "../actions/requisitionActions";
import {useHistory} from 'react-router-dom'
import Step from './subcomponent/Step';
import '../css/requisition.css';
import * as dayjs from 'dayjs';

const RequisitionForm = (props)=>{
    let auth = useSelector(({auth})=>auth);
    let history = useHistory();
    let {reqId, initialValues} = props;
    console.log({initialValues});
    let date = initialValues ? Math.abs(initialValues.date) : '';
    console.log(date)
    let today = dayjs().format('YYYY-MM-DD');

    let newvalues = initialValues ? {...initialValues, date: dayjs(Math.abs(parseInt(initialValues.date))).format('YYYY-MM-DD') } : false
    
    initialValues = newvalues || {
        title: '',
        step: 1,
        name: auth.displayName,
        date: today,
        includeTax: false,
        taxPercentage: '',
        total: 0,
        currency: 'NGN',
        amountInWords: '',
        bankName: '',
        accountName : '',
        accountNumber: '',
        invoices: [],
        items: [{title: '', amount: 0, code: "2600"}],
        attentionTo: []


    }
    return (
        <Formik
            initialValues={
                initialValues
            }
            validate = {
                values =>{
                    const errors = {}
                    if(values.title === ''){
                        errors.title = "You must include a title for your requisition"
                    }

                    if(values.bankName === ''){
                        errors.bankName = "You must include a beneficiary bank name for your requisiton";
                    }
                    if(values.accountName ==''){
                        errors.accountName = "You must include a beneficiary account name for your requisiton";
                    }
                    if(values.accountNumber ==''){
                        errors.accountNumber = "You must include a beneficiary account number for your requisiton";
                    }
                    // if(values.total == 0){
                    //     errors.total = "You must add items and amount to your requisition";
                    // }
                    if(values.includeTax == true && (values.taxPercentage == '' || values.taxPercentage ==0)){
                        errors.taxPercentage = "Tax percentage must be included if you want to include tax";
                    }

                    return errors;
                }
            }
            onSubmit = {
                async (values, {setSubmitting, resetForm })=>{
                    if(reqId){
                        let oldreq = initialValues
                        await editRequisition(auth,values,oldreq);
                        setSubmitting(false)
                        resetForm();
                        history.push('/home')
                    }
                    else{
                        await submitRequisition(auth, values);
                        setSubmitting(false)
                        resetForm();
                        history.push('/home');
                    }
                }
            }
        >
            {
                ({ handleChange, values, setFieldValue, errors, touched, isSubmitting }) =>
                    (
                        <Form>
                            <section class="p-3 mb-5 outer-shadow requisition-section">
                            <Step step={values.step} setStep = {setFieldValue} />
                            {
                            values.step === 1 && <RequisitionInfo values={values} handleChange={handleChange} setStep = {setFieldValue} errors = {errors} touched = {touched} />
                            }
                            {
                                values.step === 2 && <RequisitionItems values = {values} handleChange = {handleChange} setStep = {setFieldValue} setFieldValue = {setFieldValue} errors = {errors} touched = {touched} />
                            }
                            {
                                values.step === 3 && <RequisitionBeneficiary isSubmitting = {isSubmitting} values = {values} handleChange = {handleChange} setStep = {setFieldValue} errors = {errors} touched = {touched} />
                            }
                            </section>
                        </Form>
                        
                    )
            }


        </Formik>
    )
}

export default RequisitionForm;
