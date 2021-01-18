import Projectcodes from './ProjectCodes';
import {useFormikContext} from 'formik';


const ReqItem = (props) =>{
    let{titleName, amountName,codeName, codeValue, amountValue, titleValue, handleChange, index, key } = props;
    let {setFieldValue, values} = useFormikContext();
    const removeItem = ()=>{
        let items = [...values.items];
        items.splice(index, 1);
        setFieldValue('items', items);
    }
    return (
        <div className="item-list outer-shadow-sm row" key = {key}>
            <div className="col-lg-11 d-flex justify-content-between px-0">
                <input type="text" value={titleValue} name = {titleName} onChange = {handleChange} />
                <input type="number" className="item-list-amount" value={amountValue} name = {amountName} onChange = {handleChange} />
                <select className="browser-default custom-select inner-shadow-sm" name = {codeName} value ={codeValue} onChange = {handleChange} >
                    <Projectcodes />
                </select>
            </div>
            <div className="col-lg-1 d-flex justify-content-center">
                <div className="item-list-actions">
                    <button className="btn" onClick = {removeItem}>
                        <i className="fas fa-trash del-icon"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ReqItem