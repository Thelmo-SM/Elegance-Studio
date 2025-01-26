import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';



export const registerUser = async (user: {email: string, password: string}) => {
    return await createUserWithEmailAndPassword(auth, user.email, user.password);
  };

  export const updateUser = (user: {displayName?: string | null | undefined; photoURL?: string | null | undefined;}) => {
    if(auth.currentUser) return updateProfile(auth.currentUser, user);
  }
  