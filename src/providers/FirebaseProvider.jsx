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
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = React.createContext("");

const FirebaseProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currUser) => {
      console.log("user >> ", currUser);
      setUser(currUser);
      try {
        if (currUser) {
          const userInfo = { uid: currUser.uid };
          const res = await axiosPublic.post("jwt", userInfo);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        } else {
          localStorage.removeItem("access-token");
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    });
    return () => unSubscribe();
  }, [axiosPublic]);

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
