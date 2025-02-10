// signInWithMicrosoft.ts
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { setAccessToken } from "./accessToken";
import { showError } from "./forms-error.tsx";

export function signInWithMicrosoft(destination: string): void {
  const auth = getAuth();
  const provider = new OAuthProvider("microsoft.com");

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User: ", user);

      if (user) {
        user.getIdToken().then((token) => {
          setAccessToken(token);
          localStorage.setItem("emailNotVerified", `${!user.emailVerified}`);
          window.location.href = destination;
        });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = OAuthProvider.credentialFromError(error);
      showError(
        error?.code === "auth/account-exists-with-different-credential"
          ? { message: "Email already registered" }
          : error,
      );
      console.error("Error code: ", errorCode);
      console.error("Error: ", errorMessage);
      console.error("Email: ", email);
      console.error("Credentials: ", credential);

      // Optionally, you can display a user-friendly error message to the UI
    });
}
