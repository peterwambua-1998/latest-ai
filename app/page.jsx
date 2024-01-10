'use client'
import Image from 'next/image';
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase';

export default function Home() {
  // const [isMounted, setIsMounted] = useState(false);
  // const router = useRouter();
  // var {user} = UserAuth();
  // const [loading, setLoading] = useState(true);
  // const [mUser, setMUser] = useState(user);
  
  // useEffect(() => {
  //   setIsMounted(true);
  //   return () => {
  //     setIsMounted(false);
  //   };
  // }, [])
  
  // if (!isMounted) {
  //   return <p>Loading...</p>; // or any other loading indicator
  // }

  // if (isMounted) {
  //   console.log(user);
  //   if (!user) {
  //     router.replace('/auth/login')
  //   }
  //   return (
  //     <main className='bg-white text-black'>
  //       {loading ? (<p>loading</p>) : (<p>peter</p>)}
  //     </main>
  //   )
  // }
    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
        
    }, [])

    return (
      <main className='bg-white text-black'>
       <p>peter</p>
      </main>
    )
  
}
