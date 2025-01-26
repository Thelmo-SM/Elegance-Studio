import { auth } from '@/utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const loginUser= async (user: {email: string, password: string}) => {
      return await signInWithEmailAndPassword(auth, user.email, user.password);

};
