import { useState } from "react";
import {currencyCodes} from '../../config/helpers'
import * as dayjs from 'dayjs';
import * as accounting from 'accounting';
import { Link } from "react-router-dom";
import { deleteRequisition } from "../../actions/requisitionActions";


const RequisitionItem = (props)=>{
    let {date, approvedBy, holderCheck, checkedBy, currency, reviewedBy, status, title, total , id, userId, conversations} = props.reqItem;
    
    let notcount = conversations ? conversations.userId ? conversations.userId: conversations.count: '';
    let [deleting, setDeleting] = useState(false);
    let [prompt, setPrompt] = useState(false);
    let statusLabel = {
        approved: 'Approved By',
        holderCheck: 'Budget Holder Checked',
        pending: 'status',
        checked: 'Finance Checked',
        reviewed: 'Reviewer Checked',
        sentBack: 'status'
    }
    let statusRender = {
        approved: approvedBy ? approvedBy.name : '',
        holderCheck: holderCheck ? holderCheck.name: '',
        pending: status,
        checked: checkedBy ? checkedBy.name: '',
        reviewed: reviewedBy? reviewedBy.name: '',
        sentBack: status
    }
    let reqDate = new dayjs(Math.abs(date)).format('D MMM, YY');
    let curr = currencyCodes[currency];
    let amount = accounting.formatMoney(total, curr, 2);
    const deleteReq = async ()=>{
        setDeleting(true)
        await deleteRequisition(id, userId)
    }
    return (
        <div className="row mt-5 py-3 mx-0 mx-lg-2">
            <div className="col-lg-4 ">
                <p className="date m-0">{reqDate}</p>
                <p  className="desc m-0 mt-1"> {title.trunc(100,true)} </p>
            </div>
            <div className="col-lg-5  det-container">
                <div className="col">
                    <span>Amount</span>
                    <h5 className="check-name mt-1">{amount}</h5>
                </div>
                <div className="col">
                    <span>{statusLabel[status]}</span>
                    <p className="check-name">{statusRender[status]}</p>
                </div>
            </div>
            {
                prompt ?
                    (<div className="col-lg-3 d-flex flex-column">
                        <h6 className = "my-2">Are you sure you want to delete ?</h6>
                        <div className = 'd-flex justify-content-between'>
                            <button onClick = {deleteReq} className={`action-btn btn btn-gw-circle outer-shadow ${deleting ? 'disabled loading' : ''}`}><i className="fas fa-check success-icon"></i></button>
                            <button onClick = {()=>{setPrompt(false)}} className="action-btn btn btn-gw-circle outer-shadow btn-danger"><i className="fas fa-times"></i></button>
                        </div>    
                    </div>) : (
                        <div className="col-lg-3 d-flex align-items-center action-container">

                            {status == 'approved' ? <button className="action-btn btn btn-gw-circle outer-shadow"><i className="fas fa-check success-icon"></i></button> : <Link to={`home/edit/${props.index}`} className="action-btn btn btn-gw-circle outer-shadow"><i className="fas fa-pen"></i></Link>}


                            {status == 'approved' ? <button className="action-btn btn btn-gw-circle outer-shadow"><i className="fas fa-print print-icon"></i></button> : <button className="action-btn btn btn-gw-circle outer-shadow" onClick = {()=>{setPrompt(true)}}><i className="fas fa-trash del-icon"></i></button>}

                            <Link to = {`home/conversation/${id}`} className="action-btn btn btn-gw-circle outer-shadow">
                                <i className="fas fa-bell"></i>
                                <span className="badge shadow-none">{notcount}</span>
                            </Link>
                        </div>
                    )
            }
            
        </div>
    )
}

export default RequisitionItem