import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../config/firebase_config.ts";

export type SignUpRequestDto = {
  email: string;
  password: string;
};

export async function signUp(data: SignUpRequestDto) {
  return await createUserWithEmailAndPassword(auth, data.email, data.password);
}
