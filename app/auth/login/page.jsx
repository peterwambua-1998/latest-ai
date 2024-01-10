'use client'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { UserAuth } from "../../context/AuthContext";
import {auth} from '../../firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const Login = () => {
    const router = useRouter();
    // // const user = UserAuth();
    // // const signInEmailPass = UserAuth();
    // // const logOut = UserAuth();
    // var {user, signInEmailPass, logOut} = UserAuth();
    // console.log(user);
    // const handleSignIn = async () => {
    //     try {
    //         await signInEmailPass('pwambua25@gmail.com', '12345678');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const handleSignOut = async () => {
    //     try {
    //         await logOut();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, 'pwambua25@gmail.com', '12345678');
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              router.replace('/dashboard');
            } else {
              // User is signed out
              // ...
              router.replace('/auth/login');
              console.log("user is logged out")
            }
          });
    }, [])


    return (  
        <main>
            {/* {!user ? (
            <div>
                <button className="text-black" onClick={()=> handleSignIn()}>login</button>
            </div>) : 
            (<div>
                <button className="text-black" onClick={()=> handleSignOut()}>logout</button>
            </div>)} */}
            <p>peter</p>
            <button className="text-black" onClick={()=> handleSignIn()}>login</button>
        </main>
    );
}
 
export default Login;