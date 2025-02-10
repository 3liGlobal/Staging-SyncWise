import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase_config';

export type SignUpRequestDto = {
  email: string;
  password: string;
};

export async function login(data: SignUpRequestDto) {
  return await signInWithEmailAndPassword(auth, data.email, data.password);
}
