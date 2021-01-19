import React, {useState, useRef} from 'react';
import firebase from 'firebase';
import {useFormikContext} from 'formik'




const InvoiceUploader  = (props)=>{
    let { newIndex } = props
    let {setFieldValue} = useFormikContext()
    var[uploadFileName, setUploadFileName] = useState('Select File')
    var[uploadProgress, setUploadProgress] = useState(0);
    var[isUploading, setIsUploading] = useState(false);
    let uploadInput = useRef(null)
    const uploadFile=(e)=>{
        let file = uploadInput.current.files[0];
        if(!file) return
        setIsUploading(true);
        let ext = file.name.split('.').pop();
        let filename = "" + new Date().getTime() + '.'+ ext;
        let storageBucket = firebase.storage().ref(`invoices/${filename}`);
        let uploadTask = storageBucket.put(file);
        uploadTask.on('state_change', function(snapshot){
            let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        }, function(error){
            setUploadFileName(error.code)
        }, async function(){
            let url = await uploadTask.snapshot.ref.getDownloadURL()
            let imageObj= {
                id: filename,
                name: 'Invoice',
                url: url
            }
            uploadInput.current.value = null;
            setIsUploading(false)
            setUploadFileName('Select File');
            setUploadProgress(0);
            setFieldValue(`invoices[${newIndex}]`, imageObj)
            console.log(imageObj)
        })

    }
    return (
        <>
        <h5 className="py-3 heading-5">Receipts/Invoices</h5>

            <div className="form-row pb-3">
                <div className="col-8 col-lg-9 py-2">
                    <label htmlFor="file-upload" className="file-label outer-shadow-sm">{uploadFileName}<i className="fas fa-chevron-down float-right"></i></label>
                    <input ref = {uploadInput} accept = "image/*|application/pdf" type="file" id="file-upload" className="form-control" onChange = {(e)=>{setUploadFileName(e.target.files[0].name)}} />
                    <div className="progress md-progress inner-shadow-sm">
                        <div className="progress-bar" style = {{width: uploadProgress + '%'}} role="progressbar" aria-valuenow={uploadProgress} aria-valuemin="0" aria-valuemax="100">{uploadProgress}%</div>
                    </div>
                </div>
                <div className="col-4 col-lg-3">
                    {
                        isUploading ? <button type = "button" className="btn btn-input-secondary-sm outer-shadow-sm disabled loading"><i className="fas fa-upload mr-2"></i> Upload</button> : <button type = "button" className="btn btn-input-secondary-sm outer-shadow-sm" onClick = {uploadFile}><i className="fas fa-upload mr-2"></i> Upload</button>
                    }
                </div>
            </div>
        </>
    )
}

export default InvoiceUploader