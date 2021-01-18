import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const Chat = (props) =>{
    let {senderId, userId, photoUrl, senderName, time, message} = props;
    let timestamp = Math.abs(time);
    let timeago = dayjs(timestamp).fromNow();
    
    return (
        <div className={`${senderId == userId ? 'right' : 'left'} chat my-5`}>
            <div className="av-container">
                <img className="chat-avatar" src={photoUrl} />
            </div>
            <div className="chat-bubble outer-shadow-lg mx-3 p-1 p-lg-3">
                <div>
                    <h5 className="chat-heading">{senderName}</h5>
                    <span className="chat-time">{timeago}</span>
                </div>
                <p className="chat-message">
                    {message}
                </p>
            </div>
        </div>
    )
}


export default Chat;