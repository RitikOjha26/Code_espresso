import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updatePassword, sendEmailVerification } from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password) => {

    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    
    await sendEmailVerification(userCred.user, {
        url: 'http://localhost:3000/',
    });
    
    return userCred;

};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider);

    // result.user --> to store user deatils somewhere 
    console.log(result.user);
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = (email) => {

    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    });
};

