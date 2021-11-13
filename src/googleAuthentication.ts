import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const result = (await signInWithPopup(auth, provider)) ?? null;
    const credential = GoogleAuthProvider.credentialFromResult(result) ?? null;

    if (credential === null) {
      console.error("failed to signin");
      return null;
    }

    const token = credential.accessToken;
    const user = result.user;

    return { token, user };
  } catch (error) {
    alert(error);
    return { token: null, user: null };
  }
};

export const googleLogout = () => {
  const auth = getAuth();
  signOut(auth);
};
