import {useSelector} from 'react-redux'


const ProjectCodes = (props)=>{
    let codes = useSelector(({projectCodes})=>projectCodes);
    return(
        <>
        {
            codes.map((cd, i)=>(
                <option key = {cd.id} value = {`${cd.id}-${cd.code}`}>{cd.id}</option>
            ))
        }
        </>
    )
}

export default ProjectCodes;