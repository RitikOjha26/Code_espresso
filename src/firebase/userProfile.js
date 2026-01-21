import {doc , setDoc , getDoc, updateDoc} from 'firebase/firestore'
import {db} from './firebase';

export const createUserProfile = async (user) =>{

    const userRef = doc(db , 'users' , user.uid);
    const docSnap = await getDoc(userRef);

    if(!docSnap.exists())
    {
        await setDoc(userRef ,{
            email: user.email,
            name: user.displayName,
            createdAt: new Date(),
            role: 'user',
            token: 0,

        })
    }
}

export const getUserProfile = async (user) => {
    if (!user?.uid) {
        console.error('Invalid user object:', user);
        return null;
    }

    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        console.log('User profile:', docSnap.data());
        return docSnap.data(); 
    } else {
        console.log('No such user profile in Firestore');
        return null;
    }
};

export const updateUserData = async (user , updateData) =>{

    const userRef= doc(db,'users', user.uid);
    await updateDoc(userRef , updateData);

}
