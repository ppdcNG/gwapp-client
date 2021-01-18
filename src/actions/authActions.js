import firebase from 'firebase';
import {FETCH_USER} from './types';
const tempuser = 'cWpvzMkvM2OdPWNwNUTXGHxzIsG3';

export const fetchUser = (dispatch)=>{
    
    firebase.auth().onAuthStateChanged( async user=>{
        let userId = tempuser || user.uid;
        if(user){
            console.log(user);
            try {
                let myuser = await firebase.database().ref(`users/${userId}/profile`).get();
                console.log(myuser.val());
                user.myuser = myuser.val();
                dispatch({type: FETCH_USER, payload: user})
            } catch (error) {
                
            }
           
        }
        else{
            dispatch({type: FETCH_USER, payload: null})
        }
    })
}


export const signIn = async (dispatch) =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    try {
        let result = await  firebase.auth().signInWithPopup(provider)
        
        return result;

    } catch (e) {
        console.log(e)
        return {err: e, errorMessage: e.errorMessage}
    }

}