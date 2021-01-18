import {useState} from 'react';
import firebase from 'firebase';
import {useFormikContext} from 'formik';

const InvoiceItem = (props)=>{
    let {name, id ,value, url, index, remove, handleChange } = props;
    let {setFieldValue, values} = useFormikContext();
    let[isDeleting, setIsDeleting] = useState(false)
    const deleteInvoice = async()=>{
        setIsDeleting(true);
        let storageBucket = firebase.storage().ref(`invoices/${id}`);
        try{
            let deleted = await storageBucket.delete();
            let invoices = [...values.invoices];
            invoices.splice(index,1);
            setFieldValue('invoices', invoices);
        }
        catch(e){
            console.log(e.message);
            setIsDeleting(false)
        }
    }
    return (
        <div className="uploaded outer-shadow-sm">
            <input name = {name} type="text" value={value}  onChange = {handleChange} />
            <div className="uploaded-actions">
                <a target = "_blank" href = {url}><i className="fas fa-eye gw-accent-color px-2"></i></a>
                {
                    isDeleting ? <i  className="fas fa-trash gw-danger-color px-2 disabled loading"></i>: <i onClick = {deleteInvoice} className="fas fa-trash gw-danger-color px-2"></i>
                }
                
            </div>
        </div>
    )
}

export default InvoiceItem;