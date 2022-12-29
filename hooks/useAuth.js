import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({
  // initial state
});

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId:
    "296531923790-nbfkplbb146jbu2c2es0k0moag3rggon.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "296531923790-nbfkplbb146jbu2c2es0k0moag3rggon.apps.googleusercontent.com",
    expoClientId:
      "296531923790-setrq21npudv6m80q64dv5jn1922suff.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
  });

  useEffect(() => {
    async function SignInWithGoogle() {
      setLoading(true);
      if (response?.type === "success") {
        const idToken = null;
        const { accessToken } = response.authentication;
        const credentials = GoogleAuthProvider.credential(idToken, accessToken);
        await signInWithCredential(auth, credentials);
      }

      return Promise.reject();
    }
    SignInWithGoogle()
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [response]);

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //logged in
          setUser(user);
        } else {
          //NOT logged in
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const memoedValue = useMemo(
    () => ({ user, loading, logout, error, signIn: () => promptAsync() }),
    [[], user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
