import LoadingReqs from '../components/subcomponent/LoadingItems';
import RequisitionItem from '../components/subcomponent/RequisitionItem';







const RequisitionList = (props)=>{
    let {user, recentReqs} = props
    
    if(recentReqs){
        
        let reqs = recentReqs.map((req, i) => <RequisitionItem reqItem={req} key = {req.id} index = {i} />)
        return (
            <div className = "activity">
                {reqs}
            </div>
        )

    }
    else{
        return(
            <LoadingReqs />
        )
    }

    
    
}

export default RequisitionList