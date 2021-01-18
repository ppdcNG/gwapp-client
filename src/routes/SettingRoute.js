import '../css/settings.css';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
const tempuser = 'cWpvzMkvM2OdPWNwNUTXGHxzIsG3';


const SettingRoute = props =>{
    var [picFile, setPicFile] = useState('');
    var [sigFile, setSigFile] = useState(false);
    var [isUploadingProfile, setIsUploadingProfile] = useState(false);
    var [isUploadingSig, setIsUploadingSig] = useState(false);
    var auth = useSelector(({auth})=>auth)
    const setSelectFile = e =>{
       
        setPicFile(e.target.files[0]);
    }

    const uploadProfilePic =  ()=>{
        if(picFile == '' || !picFile) return; 
        setIsUploadingProfile(true)
        let uploadTask = firebase.storage().ref(`profile_pic/${tempuser || auth.uid}`).put(picFile);
        uploadTask.on('state_change',(snapshot)=>{}, (err)=>{}, async ()=>{
            let url = await uploadTask.snapshot.ref.getDownloadURL()
            await firebase.database().ref(`users/${tempuser||auth.uid}/profile/photoUrl`).set(url);
            setIsUploadingProfile(false);
        });

    }
    const uploadSignature =  ()=>{
        if(!sigFile) return
        setIsUploadingSig(true)
        let uploadTask = firebase.storage().ref(`signatures/${tempuser || auth.uid}`).put(sigFile)
        uploadTask.on('state_change',(snapshot)=>{}, (err)=>{}, async ()=>{
            let url = await uploadTask.snapshot.ref.getDownloadURL()
            await firebase.database().ref(`users/${tempuser||auth.uid}/profile/signatureUrl`).set(url);
            setIsUploadingSig(false);
        });

    }
    return (
        <section className = "my-5  recent-act p-3 h-75 px-2 px-lg-4">
            <section className = "profile-section px-lg-5">
                            <h4 className = "heading-4 my-4">My Profile</h4>
                            <div className = "row py-lg-4">
                                <div className = "col-lg-6">
                                    <div className = "row my-5 my-lg-0 px-5 px-lg-0">
                                        <div className = "col-6 d-flex align-items-center pl-lg-5">
                                            <div className = 'avatar-container inner-shadow-sm'>
                                                <img className = "profile-avatar" src={picFile == "" ?auth.myuser.photoUrl: URL.createObjectURL(picFile)}/>
                                            </div>
                                        </div>
                                        <div className = "col-6 id d-flex flex-column  justify-content-center">
                                            <label className = "file-input-label outer-shadow-sm" for = "profile-pic"><span>Select File</span> <i className="fas fa-angle-down ml-auto gw-accent-color"></i></label>
                                            <input className = 'file-input' type = "file" name = "profile-pic" id = "profile-pic" onChange = {setSelectFile}/>
                                            <button onClick = {uploadProfilePic} type = "button" className = {`btn btn-sm btn-gw-primary ${isUploadingProfile && 'loading disabled'}`}><i className="fas fa-upload"></i> Upload</button>
                                        </div>

                                    </div>
                                </div>
                                <div className = "col-lg-6">
                                    <div className = "row my-5 my-lg-0 px-5 px-lg-0">
                                        <div className = "col-6 d-flex align-items-center pl-lg-5">
                                            <div className = 'avatar-container inner-shadow-sm'>
                                                <img className = "profile-avatar" src={sigFile ? URL.createObjectURL(sigFile) : auth.myuser.signatureUrl}/>
                                            </div>
                                        </div>
                                        <div className = "col-6 id d-flex flex-column r justify-content-center">
                                            <label className = "file-input-label outer-shadow-sm" for = "profile-pic">Select Signature  <i className="fas fa-angle-down ml-auto gw-accent-color"></i></label>
                                            <input onChange = {(e)=> setSigFile(e.target.files[0])} className = 'file-input' type = "file" name = "profile-pic" id = "profile-pic"/>
                                            <button onClick = {uploadSignature} type = "button" className = {`btn btn-sm btn-gw-primary ${isUploadingSig && 'loading disabled'}`}><i className="fas fa-upload"></i> Upload</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
        </section>

    )
}

export default SettingRoute;