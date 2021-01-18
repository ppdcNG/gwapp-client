import { useSelector } from  "react-redux";
import { useFormikContext } from "formik";
import { useState} from  'react';


const FormUserList = (props)=>{

    let userList = useSelector(({userList})=>userList);
    let {values, setFieldValue} = useFormikContext()
    let [list, setList] = useState(userList);

    const selectUser = (i)=>{
        let user = list[i];
        let {attentionTo} = values;
        if(user.selected){
            let formikIndex = attentionTo.indexOf(user.email)
            attentionTo.splice(formikIndex, 1);
            setFieldValue('attentionTo', attentionTo);
            let newlist = [...list];
            newlist[i].selected = false;
            setList(newlist);
        }
        else{
            let newlist = [...list];
            newlist[i].selected = true;
            attentionTo.push(user.email);
            setFieldValue('attentionTo', attentionTo);
            setList(newlist);
        }
    }

    return (
        list.map((user, i)=>(
            <div className={`user-list ${user.selected && 'selected'}`} onClick = {(e)=>{selectUser(i)}}>
                <img src={user.photoUrl} className="img-fluid z-depth-1 rounded-circle" alt="avatar" />
                <p>{ user.name.split(' ')[0]}</p>
            </div>
        ))
    )

}

export default FormUserList;