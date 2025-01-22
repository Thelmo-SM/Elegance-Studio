import { db, auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import { userTypes } from "@/types/userTypes";


export const registerUser = async ({name, lastName, email, password, phone}: userTypes) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            name,
            lastName,
            phone,
            createdAt: serverTimestamp(),
        });
        return {success: true, user };

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return { success: false, error };
    }
};