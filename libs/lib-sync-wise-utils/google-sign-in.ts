import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {setAccessToken} from "./accessToken.ts";

export function signInWithGoogle(destination: string): void {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User: ", user)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setAccessToken(user.accessToken)
            localStorage.setItem("emailNotVerified", `${!user?.emailVerified}`)
            window.location.href = destination;
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error code: ", errorCode)
        console.log("Error: ", errorMessage)
        console.log("Email: ", email)
        console.log("Credentials: ", credential)
    });
}
