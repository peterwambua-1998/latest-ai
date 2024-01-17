'use client'
import SideNav from '../sidenav';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useLayoutEffect, useState } from 'react';
import {auth} from '../firebase';
import { useRouter } from 'next/navigation';
import { Navbar, Menu, Button } from 'react-daisyui'
import '@/app/globals.css';
import Link from 'next/link';

export default function Layout({ children }) {
  var [user, setUser] = useState(null);
  var [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  var [firebase_user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setUser(firebase_user);
    setIsLoading(loading)
  }, [loading, firebase_user])

  if (isLoading) {
    return (<div className='h-[100vh] text-black text-center'>loading..</div>)
  }

  if (!loading) {
    console.log(user);
    if (user) {
      return (
        <div>
          <Navbar className='my-font'>
            <Navbar.Start>
              
              <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </Navbar.Start>
            <Navbar.Center className="hidden lg:flex">
              <Menu horizontal className="px-1">
                <Menu.Item>
                  <Link href='/dashboard/curriculum-vitae'>curriculum-vitae</Link>
                </Menu.Item>
                <Menu.Item>
                  <a>Resume</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Cover letter</a>
                </Menu.Item>
              </Menu>
            </Navbar.Center>
            <Navbar.End>
              <Button tag="a">Button</Button>
            </Navbar.End>
          </Navbar>

          <div className="bg-white my-font">{children}</div>
        </div>
      )
      
    } else {
      router.replace('/')
      return (<div className='h-[100vh] text-black text-center'>loading..</div>)
    }
  }

  
 
}
