import firebase from 'firebase';
import {FETCH_STATS, RECENT_REQS, PROJECT_CODES, VENDOR_LIST, USER_LIST, PROJECT_LIST} from '../actions/types'
const tempuser = 'cWpvzMkvM2OdPWNwNUTXGHxzIsG3';


export const fetchStats = async(uid, dispatch)=>{
    let userId = tempuser || uid;
    let ref = firebase.database().ref(`users/${userId}/stats`);
    ref.on('value', (snapshot)=>{
        let data = snapshot.val();
        console.log('stats data: '+data);
        let newdata = {
            pending: data.pendingRetirements,
            checked: data.requested,
            approved: data.approved
        }
        dispatch({type: FETCH_STATS, payload: newdata});
    });
}

export const fetchProjects = (dispatch) =>{
    let ref = firebase.database().ref(`projects`).once('value', (snapshot)=>{
        let projects = [];
        snapshot.forEach((snap)=>{
            projects.push(snap.val().projectName);
        })
        
        dispatch({type: PROJECT_LIST, payload: projects});
    })
}


export const recentRequisitions = async(uid, dispatch)=>{
    let userId = tempuser || uid
    
    let ref = firebase.database().ref(`userRequisitions/${userId}`).orderByChild('time').limitToFirst(20).on('value',(snapshot)=>{
        let recents = []
        snapshot.forEach((snap)=>{
            recents.push(snap.val());
        })
        dispatch({type: RECENT_REQS, payload: recents})

    });
}

export const fetchProjectCodes = async(dispatch) =>{
    
    let ref = firebase.database().ref('codes').once('value',(snapshot)=>{
        let codes = [];
        snapshot.forEach((snap)=>{
            codes.push({id: snap.key, code: snap.val()});
        })
      

        dispatch({type: PROJECT_CODES, payload: codes});

    });
}

export const fetchVendorAccounts = async(uid, dispatch) =>{
    
    firebase.database().ref(`userVendors/${uid}`).on('value', (snapshot)=>{
        let vendors = [];
        snapshot.forEach((snap)=>{
            vendors.push(snap.val())
        });

        dispatch({type: VENDOR_LIST, payload: vendors})
    })
}

export const addVendor = async(uid, accountName, accountNumber, bankName)=>{
    return firebase.database().ref(`userVendors/${uid}/${accountNumber}`).set({accountNumber, accountName, bankName});
}


export const reactUserList = async ()=>{

    firebase.database().ref('users').once('value', async (snapshot)=>{
        let userList = {};
        snapshot.forEach((snap)=>{
            let user = snap.val();
            if(user.profile && user.profile.photoUrl){
                let {name, email, photoUrl} = user.profile
                userList[snap.key] = {name, email, photoUrl}
            }
        });

        await firebase.database().ref('userList').set(userList);

    })

}

export const fetchUserList = (dispatch) =>{
    firebase.database().ref('userList').once('value', (snapshot)=>{
        let userList = [];
        snapshot.forEach((snap)=>{
            userList.push(snap.val());
            
        })
        console.log('userlist ',userList)
        dispatch({type: USER_LIST, payload: userList})
    })
}

