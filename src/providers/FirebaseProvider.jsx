import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import auth from "../auth/firebase/firebase.config";

export const AuthContext = React.createContext("");

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currUser) => {
      console.log("user >> ", currUser);
      setUser(currUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateProfileInfo = (name, url) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    logIn,
    logOut,
    updateProfileInfo,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
