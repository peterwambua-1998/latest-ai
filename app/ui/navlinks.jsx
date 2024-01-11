'use client'
import Link from 'next/link';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useLayoutEffect, useState } from 'react';
import { Dropdown, Navbar, Menu, Button } from 'react-daisyui';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from '../firebase';

const NavLinks = () => {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }

    var [user, setUser] = useState(null);

    const [firebase_user, loading, error] = useAuthState(auth);

    useEffect(() => {
      setUser(firebase_user);
    }, [])

    if (loading) {
        return (<div>loading</div>)
    }

    if (!user) {
        return (
            <div>
                <Navbar.End>
                    <Button tag="a" onClick={() => handleSignOut()}>logout</Button>
                </Navbar.End>
            </div>
        ) 
    }

    return (  
        <div>
            <Navbar.End>
              <Button tag="a" href='/auth/login'>login</Button>
            </Navbar.End>
            <Navbar.End>
              <Button tag="a" href='/auth/sign-up'>Sign up</Button>
            </Navbar.End>
        </div>
    );
}
 
export default NavLinks;