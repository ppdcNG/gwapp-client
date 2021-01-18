
import ReqItem from './subcomponent/ReqItem';

import {FieldArray, useFormikContext} from 'formik';
import {numToWords, currencyWord, currencySubWord} from '../config/helpers'


const RequisitionItems = (props)=>{
    const {values, handleChange, setStep, errors, touched } = props;
    const {setFieldValue} = useFormikContext();
    const addItem = ()=>{
        let items = [...values.items];
        items.push({title: '', amount: 0, code: "2600"})
        let tots = 0;
        items.map((item)=>{
            tots += item.amount == ''? 0 : parseFloat(item.amount)
        })
        setFieldValue('items', items);
    }
    const total = ()=>{
        let tots = 0;
        values.items.map((item)=>{
            tots += item.amount == ''? 0 : parseFloat(item.amount)
        })
        return tots.toFixed(2)
    }

    const converNumtoWord = (number, currency)=>{
        let bits = ""+ parseFloat(number);
        bits = bits.split('.');
        
        let firspart = "" + numToWords(parseInt(bits[0])) + currencyWord[currency];
        let seconpart = bits[1] ? ", " + numToWords(parseInt(bits[1])) + currencySubWord[currency]: "";

        return firspart + seconpart
    }
    return (
        <>
            <h4 className="container mb-4 heading-4 ml-lg-4">Requisition Items</h4>
            <div className="container px-lg-4">
                <div className="d-flex">
                    
                        <button type = "button" className="btn btn-sm btn-gw-primary ml-auto mt-4" onClick = {addItem}>Add item</button>
                    
                </div>
            </div>
            <section className="container panel px-0 px-lg-4">
                <h6 className="mt-4 mb-3">Item List</h6>
                <FieldArray>
                    {
                        (helpers)=>(
                            values.items.map((item,i)=>(
                                <ReqItem titleName = {`items.${i}.title`} titleValue = {item.title} amountName = {`items.${i}.amount`} amountValue = {item.amount} 
                                codeName = {`items.${i}.code`} codeValue = {item.code} handleChange = {handleChange} index = {i} />
                            ))
                        )
                    }
                </FieldArray>
            </section>
            <div className="container px-0 px-lg-4">
                <div className="form-row mt-5">
                    <div className="col">
                        <div className="form-group">
                            <label for="currency">Currency</label>
                            <select name = "currency" value = {values.currency} onChange = {handleChange} className="browser-default custom-select inner-shadow-sm" >
                                <option value="NGN">₦</option>
                                <option value="USD">$</option>
                                <option value="GBP">£</option>
                                <option value="EUR">€</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label for="total">Total</label>
                            <input readOnly name = "total" value = {total()} onChange = {handleChange} type="number" id="total" className={`form-control inner-shadow-sm ${errors.total && touched.total  && 'is-invalid'}`} />
                            <div class = "invalid-feedback">{(errors.total && touched.total) ? errors.total: ''}</div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="m-0" for="amount">Amount In words</label>
                    <input name = "amountInWords" value = {converNumtoWord(total(), values.currency)} onChange = {handleChange} type="text" id="amount" className="form-control inner-shadow-sm" />
                </div>
               
                <div className="d-flex justify-content-between py-5">
                    <button type="button" className="btn btn-gw-secondary outer-shadow-sm" onClick = {()=> setStep('step', 1)} >Back</button>
                    <button type="button" className="btn btn-gw-primary outer-shadow-sm" onClick = {()=> setStep('step', 3)} >Next</button>
                </div>
            </div>
        </>
    )
}

export default RequisitionItems;