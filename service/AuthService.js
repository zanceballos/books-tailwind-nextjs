import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { useToast } from '@chakra-ui/react'
const AuthService = React.createContext();

export function useAuth() {
  return useContext(AuthService);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const toast= useToast()

  //Create User with Password
  function signup(username, email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((results) => {
        //create firestore database for user
        db.collection("users")
          .doc(results.user.uid)
          .get()
          .then((doc) => {
            if (doc.exits) {
              alert("document already exists!");
            } else {
              db.collection("users").doc(results.user.uid).set({
                username: username,
                email: email,
                role: "Reader",
                dateRegistered: new Date().toLocaleString(),
                AuthProvider: "password",
              }).then(() => {
                toast({
                  title: 'Registered Successfully',
                  description: "You have created an account!",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                  position:"top",
                })
              });
            }
          });
      });
  }

  //login user with password
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then((results) => {
      //Return some popup
      toast({
        title: 'Logged In Successfully',
        description: "You have been Logged in!",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position:"top",
      })
    });
  }

  //logout user
  function logout() {
    return auth.signOut().then(() => {
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthService.Provider value={value}>
      {!loading && children}
    </AuthService.Provider>
  );
}

export default AuthProvider;
