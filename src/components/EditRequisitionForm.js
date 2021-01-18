import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'

import RequisitionForm from './RequisitionForm';


const EditRequisitionForm = (props)=>{
    let {id} = useParams();
    let reqList = useSelector(({recentReqs})=>recentReqs);
    
    let req = reqList[id];
    req.invoices = req.invoices || []
    req.step = 1
    console.log(req);
    return(
        <RequisitionForm reqId = {id} initialValues = {req} />
    )





}

export default EditRequisitionForm;