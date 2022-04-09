import React from "react";
import { useAuth } from "../service/AuthService";
import { useRouter } from "next/router";
import { auth } from "../config/firebase";
export function withPublic(Component) {

  return function WithPublic(props) {
    const { currentUser } = useAuth();
    const router = useRouter();

    if(currentUser){
        router.replace("/")
        return <h1>Loading</h1>
    }

    return <Component auth={currentUser} {...props}/>
  };
};


export function withProtected(Component) {

    return function WithProtected(props) {
      const { currentUser } = useAuth();
      const router = useRouter();
  
      if(!currentUser){
          router.replace("/account/login")
          return <h1>Loading</h1>
      }
  
      return <Component auth={currentUser} {...props}/>
    };
  };





//export function with
