'use client'
import Image from 'next/image';
import { UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase';

export default function Home() {
  var [user, setUser] = useState(null);

  
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
   
    return (
      <main className='bg-white text-black'>
       <p>peter</p>
      </main>
    )
  
}
