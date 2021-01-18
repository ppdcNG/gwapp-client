import { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';
import RequisitionList  from './RequisitionList';
import { cloudURL } from '../config/helpers';
import axios from  'axios';
var tempuser = "cWpvzMkvM2OdPWNwNUTXGHxzIsG3"
const RequisitionSearch = (props)=>{
    
    var[state, setState] = useState({isLoading: false, start: '', previousStart: [], searchList : []});
    var [project, setProject] = useState('');
    var[startDate, setStartDate] = useState('');
    const auth = useSelector(({auth})=> auth);
    var projects = useSelector(({projects})=>projects);
    
    console.log('previouselig', state.previousStart);
    useEffect(async ()=>{
        let startTime = 0 - new Date().getTime();
        let reqObj = {userId: tempuser || auth.uid , project, start: startTime}
        try {
            let requisitions =  await  axios.post(cloudURL + 'userRequisitions', reqObj);
            let newState = {...state, searchList: requisitions.data, start: requisitions.data[requisitions.data.length -1].time};
            setState(newState);
        } catch (error) {
            console.log(error);
        }
        

    }, []);

    const previous = async () =>{
        let prev = state.previousStart.pop();
        prev = prev || 0- new Date().getTime();
        let stateBefore = {...state, isLoading: true};
        setState(stateBefore);
        let reqObj = {project, start: prev, userId: tempuser || auth.uid}
        try {
            let requisitions =  await  axios.post(cloudURL + 'userRequisitions', reqObj);
            let stateAfter = {...state, searchList: requisitions.data, isLoading: false, start: requisitions.data[requisitions.data.length -1].time, previousStart: state.previousStart };
            setState(stateAfter);
        } catch (error) {
            console.log(error);
        }
        

    }
    const next = async ()=>{
        
        let history = [...state.previousStart, state.searchList[0].time];
        console.log(history);
        let stateBefore = {...state, previousStart: history, isLoading:true }
        setState(stateBefore);
        let reqObj = {project, start: state.start, userId: tempuser || auth.uid}
        try {
            let requisitions =  await  axios.post(cloudURL + 'userRequisitions', reqObj);
            let newState = {...state, searchList: requisitions.data, isLoading: false, start:requisitions.data[requisitions.data.length -1].time, previousStart: history }
            console.log('newState', newState);
            setState(newState);
        } catch (error) {
            console.log(error);
        }
        
    }
    const filter = async()=>{
        let stateBefore = {...state, isLoading:true};
        let newdate = 0 - new Date(startDate).getTime()
        setState(stateBefore);
        let reqObj = {project, start: newdate, userId: tempuser || auth.uid}
        try {
            let requisitions =  await  axios.post(cloudURL + 'userRequisitions', reqObj);
            let newState = {...state, searchList: requisitions.data, isLoading: false, start:requisitions.data[requisitions.data.length -1].time, previousStart: [] }
            setState(newState);
        } catch (error) {
            console.log(error);
        }

    }
    return(
        <div className="">
            <h3 className="h3">Search Requisition</h3>
            <h6 className="mt-4 heading-6">Filter</h6>
            <form className="mt-4">
                <div className="form-row mb-4">
                    <div className="col pick-date">
                        <label>Start From</label>
                        <input
                           
                            placeholder="Start From"
                            type="date"
                            id="example"
                            className="px-3 form-control datepicker outer-shadow"
                            value = {startDate}
                            onChange = {(e)=>{setStartDate(e.target.value)}}
                        />
                    </div>
                    <div className="col">
                        <label>Project</label>
                        <select  className="browser-default custom-select outer-shadow" value = {project} onChange = { (e) =>{setProject(e.target.value)}}>
                            {
                                projects.map((proj)=>(<option value = {proj}>{proj}</option>))
                            }
                        </select>
                    </div>
                </div>
                <button type = "button" className="btn btn-gw-primary btn-md" onClick = {()=>filter()}> <i className="fas fa-filter"></i>Filter</button>
            </form>
            <section className = "my-5  recent-act p-3 h-75 px-2 px-lg-4">
            {
                <RequisitionList recentReqs = {state.searchList.length == 0 || state.isLoading ? null : state.searchList}/>
            }
            </section>
            
            <div className = "d-flex justify-content-between">
                    <button type="button" className={`btn btn-gw-secondary outer-shadow-sm ${state.previousStart.length ==0 ? 'disabled': ''}`} onClick = {()=> previous()}>Previous</button>
                    <button type="button" className={`btn btn-gw-primary outer-shadow-sm ${state.isLoading && 'disabled'}`} onClick = {()=> next()}>Next</button>
            </div>
        </div>
    )
}


export default RequisitionSearch;