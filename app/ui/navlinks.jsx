'use client'
import Link from 'next/link';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from 'react';
import { Navbar, Button, Loading } from "react-daisyui";

import {auth} from '../firebase';
import { signOut } from 'firebase/auth';

function NavLinks () {
    var [isLoading, setIsLoading] = useState(true);
    var [user, setUser] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const handleSignOut = async () => {
        try {

            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
      setUser(firebase_user);
      setIsLoading(loading);
    }, [loading, firebase_user])

    if (loading) {
        return (<div><Loading  /></div>)
    }

    if (!loading) {
        if (!user) {
            console.log('peter');
            return (
                <div className='hidden lg:flex w-[25%]'>
                    <Navbar.End className='text-center'>
                        <Link href='/auth/login' className='text-[#1E3A8A] font-bold'>login</Link>
                    </Navbar.End>
                    <Navbar.End>
                        <Link  href='/auth/sign-up' className='w-[100%] bg-[#1E3A8A] text-white pl-5 pr-5 pt-3 pb-3 rounded-md'>Sign up</Link>
                    </Navbar.End>
                </div>
            ) 
        } else {
            return (  
                <div className='hidden lg:flex gap-4 w-[25%]'>
                    <Navbar.End className='text-center'>
                        <Link href='/dashboard' >My Dashboard</Link>
                    </Navbar.End>
                    <Navbar.End>
                        <Button  onClick={() => handleSignOut()}>logout</Button>
                    </Navbar.End>
                </div>
            );
        }
    }


   

   
}
 
export default NavLinks;