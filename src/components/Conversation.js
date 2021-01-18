import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {useEffect, useState } from 'react';
import Chat from './subcomponent/Chat';
import firebase from 'firebase';

const Conversation  = (props)=>{
    let {id} = useParams();
    let auth = useSelector(({auth})=>auth)
    let {userId} = auth.uid;
    let [isloading, setIsLoading] = useState(true);
    let [conversations, setConversations] = useState([]);
    let [message, setMessage] = useState();
    let [isSending, setIsSending] = useState(false);
    useEffect(()=>{
        let ref = firebase.database().ref(`conversations/${id}`)
        ref.on("value", async (snapshot)=>{
            let conversations = []
            snapshot.forEach((snap)=>{
                conversations.push(snap.val());
            })
            if(conversations.length > 0){
                let updates = {};
                updates[`requisitions/${id}/conversations/${userId}`] = conversations.length;
                updates[`userRequisitions/${userId}/${id}/conversations/${userId}`] = conversations.length;
                await firebase.database().ref().update(updates);
            }
          
            setConversations(conversations);
            setIsLoading(false)
        })

        return ()=> ref.off();
    },[])

    const sendMessage = async ()=>{
        let messageObj = {
            senderId : auth.uid,
            senderName: auth.displayName,
            message,
            time : 0 - new Date().getTime(),
            photoUrl: auth.myuser.photoUrl
        }
        let messageCount = conversations.length + 1;
        let updates = {};
        let key = firebase.database().ref(`conversations/${id}`).push().key
        updates[`conversations/${id}/${key}`] = messageObj;
        updates[`requisitions/${id}/conversations/count`] = messageCount;
        updates[`userRequisitions/${userId}/${id}/conversations/count`] = messageCount;
        updates[`requisitions/${id}/conversations/${userId}`] = messageCount;
        updates[`userRequisitions/${userId}/${id}/conversations/${userId}`] = messageCount;
        setMessage('');
        await firebase.database().ref().update(updates);
    }
  
    return (
        <section className="p-3 mb-5 outer-shadow requisition-section">
            <div className="nav-item outer-shadow-sm">
                <span
                    className="nav-link"
                    id="conversation-tab"
                    data-toggle="tab"
                    href="#conversation"
                    role="tab"
                    aria-controls="conversation"
                    aria-selected="false"
                >
                    <i class="fas fa-comment-dots"></i>
                    <span className = {`h5 ml-3 align-self-center ${isloading && 'loading'}`}>Conversations</span>

                </span>
            </div>
            
            <div className="chat-main-container px-1 px-lg-3">
                <div className="chat-container">
                    {
                        conversations.map((chat)=><Chat senderId = {chat.senderId} userId = {chat.userId} photoUrl = {chat.photoUrl} time = {chat.time} message = {chat.message} senderName = {chat.senderName}  />)
                    }
                </div>
                <div className="send-container d-flex align-items-center px-lg-3">
                    <input value = {message} type="text" className="form-control inner-shadow-sm" onChange = {(e)=>setMessage(e.target.value)} />
                    <button onClick = {()=>sendMessage()} className={`btn chat-send-button btn-gw-primary ${isSending ? 'loading disabled': ''}`}>Send</button>
                </div>

            </div>
        </section>
    )
}


export default Conversation;