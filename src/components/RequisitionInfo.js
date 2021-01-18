import React from 'react';
import InvoiceUploader from './subcomponent/InvoiceUploader';
import InvoiceItem from './subcomponent/InvoiceItem';
import {FieldArray} from 'formik'



const RequisitionInfo = (props) =>{
    let {handleChange, values, setStep, errors, touched} = props;

    console.log(errors, touched)

    return (
        <>
            <h4 className="container mb-4 heading-4 ml-lg-3">Requisition Info</h4>
            <div className="container px-lg-5">
                <div className="form-group">
                    <label className="m-0 my-2" htmlFor="name">Name</label>
                    <input name = "name" value = {values.name} onChange = {handleChange} type="text" id="title" className="form-control inner-shadow-sm" />
                </div>
                <div className="form-group">
                    <label className="m-0 my-2" htmlFor="date">Date</label>
                    <input type="date" name = "date" value = {values.date} id="date" onChange = {handleChange} className="form-control inner-shadow-sm" />
                </div>
                <div className="form-group">
                    <label className="m-0 my-2" htmlFor="title">Description/Title</label>
                <textarea name = "title" value = {values.title} onChange = {handleChange} className={`form-control inner-shadow-sm ${(errors.title && touched.title)? 'is-invalid' : ''}`} id="title" rows="3"></textarea>
                     <div class = "invalid-feedback">{(errors.title & touched.title) ? errors.title: ''}</div>
                </div>
                <section className="mt-3 overview">
                    <FieldArray>
                        {
                            (helpers)=>(
                                <>
                                    <InvoiceUploader newIndex = {values.invoices.length}  />
                                    <div className="horizontal-scroll" style={{ overflowX: 'scroll', width: '100%' }}>
                                        <div className="uploaded-files-container">
                                            {
                                                values.invoices.map((invoice, i)=>{
                                                    return(
                                                        <InvoiceItem index = {i} remove = {()=>{helpers.pop()}} name = {`invoices.${i}.name`} url = {invoice.url} id ={invoice.id} key = {invoice.id} value = {`${invoice.name} ${i+1}`} handleChange = {handleChange}/>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </>

                            )

                            
                        }
                    </FieldArray>
                    

                </section>
                <div className="form-row mt-3">
                    <div className="col-12 col-lg-6 my-3 my-lg-0">
                        <div className="form-check">
                            <div className="custom-control custom-checkbox">
                                <input checked = {values.includeTax} name = "includeTax" value = {values.includeTax} type="checkbox" className="custom-control-input" onChange = {handleChange} id="includeTax" />
                                <label className="custom-control-label pull-left" htmlFor="includeTax">Include Withholding<br />Tax</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="form-group">
                            <label htmlFor="wtax">Withholding Tax %</label>
                        <input  name = "taxPercentage" value = {values.taxPercentage} onChange = {handleChange} type="number" id="wtax" className={`form-control inner-shadow-sm ${errors.taxPercentage && touched.taxPercentage? 'is-invalid': ''}`} />
                            <div class = "invalid-feedback">{(errors.taxPercentage && touched.taxPercentage) ? errors.taxPercentage: ''}</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between py-5">
                    <button type="button" className="btn btn-gw-secondary outer-shadow-sm" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-gw-primary outer-shadow-sm" onClick = {()=> setStep('step', 2)} >Next</button>
                </div>
            </div>
        </>
    )
}

export default RequisitionInfo;