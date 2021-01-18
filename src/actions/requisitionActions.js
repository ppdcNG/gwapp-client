import firebase from 'firebase';
import { converNumtoWord, total } from '../config/helpers'

const tempuser = 'cWpvzMkvM2OdPWNwNUTXGHxzIsG3';



export const submitRequisition = async (auth, formvalues) =>{
    let userId  = tempuser || auth.uid;
    let reqkey = firebase.database().ref(`userRequisitions/${userId}`).push().key;
    formvalues.user = auth.myuser;
    formvalues.time = 0 - new Date().getTime();
    formvalues.userId = auth.uid;
    formvalues.status = 'pending';
    formvalues.date = 0 - new Date(formvalues.date).getTime();
    formvalues.total = total(formvalues.items);
    formvalues.amountInWords = converNumtoWord(formvalues.total);
    formvalues.id = reqkey;
   
    let updates= {};
    if (formvalues.includeTax) {
        let taxReqTitle = "With holding Tax for " + formvalues.title;
        let taxReqTotal = formvalues.total * (parseFloat(formvalues.taxPercentage / 100));
        let taxAmountInWords = converNumtoWord(taxReqTotal, formvalues.currency);
        let taxItems = [{ code: 4330, item: taxReqTitle, amount: taxReqTotal }];
        let taxkey = firebase.database().ref(`userRequisitions/${userId}`).push().key;
        let taxrequisition = { ...formvalues, accountNumber: "FIRS", accountName: "Abuja FIRS", bank: 'Check', total: taxReqTotal, amountInWords: taxAmountInWords, items: taxItems, id: taxkey, includeTax: false, title: taxReqTitle, taxPercentage : 0 };
        formvalues.taxId = taxkey;
        updates[`userRequisitions/${userId}/${taxkey}`] = taxrequisition;
        updates[`requisitions/${taxkey}`] = taxrequisition;
    }
    updates[`userRequisitions/${userId}/${reqkey}`] = formvalues;
    updates[`requisitions/${reqkey}`] = formvalues;

    try {
        return firebase.database().ref().update(updates);
        //todo send mail to the attention to
    } catch (error) {
        console.log(error)
    }

}
export const editRequisition = async (auth, formvalues, oldreq) =>{
    let userId  = tempuser || auth.uid;
    console.log('edit date',formvalues.date)
    formvalues.date = 0 - new Date(formvalues.date).getTime();
    let reqkey = oldreq.id
    formvalues = {...oldreq, ...formvalues};
    formvalues.user = auth.myuser;
    formvalues.time = 0 - new Date().getTime();
    formvalues.userId = auth.uid;
    formvalues.status = 'pending';
    formvalues.total = total(formvalues.items);
    formvalues.amountInWords = converNumtoWord(formvalues.total);
    let updates= {};
    if (formvalues.includeTax && formvalues.taxId) {
        let taxReqTitle = "With holding Tax for " + formvalues.title;
        let taxReqTotal = formvalues.total * (parseFloat(formvalues.taxPercentage / 100));
        let taxAmountInWords = converNumtoWord(taxReqTotal, formvalues.currency);
        let taxItems = [{ code: 4330, title: taxReqTitle, amount: taxReqTotal }];
        let taxkey = formvalues.taxId
        let taxrequisition = { ...formvalues, accountNumber: "FIRS", accountName: "Abuja FIRS", bank: 'Check', total: taxReqTotal, amountInWords: taxAmountInWords, items: taxItems, id: taxkey, includeTax: false, title: taxReqTitle, taxPercentage : 0 };
        formvalues.taxId = taxkey;
        updates[`userRequisitions/${userId}/${taxkey}`] = taxrequisition;
        updates[`requisitions/${taxkey}`] = taxrequisition;
    }
    updates[`userRequisitions/${userId}/${reqkey}`] = formvalues;
    updates[`requisitions/${reqkey}`] = formvalues;

    try {
        return  firebase.database().ref().update(updates);
        //todo send mail to the attention to
    } catch (error) {
        console.log(error)
    }

}

export const deleteRequisition = (reqId, uid)=>{
    let userId = tempuser || uid
    let updates = {};
    try {
        updates[`userRequisitions/${userId}/${reqId}`] = null;
        updates[`requisitions/${reqId}`] = null;
        return firebase.database().ref().update(updates)
    } catch (error) {
        console.log(error);
        
    }
}
