'use client'
import SideNav from '../sidenav';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useLayoutEffect, useState } from 'react';
import {auth} from '../firebase';
import { useRouter } from 'next/navigation';
import { Navbar, Menu, Button } from 'react-daisyui'
import '@/app/globals.css';
import Link from 'next/link';
import { UserProvider } from '../context/UserContext';
import NavLinks from '../ui/navlinks';

export default function Layout({ children }) {
  var [user, setUser] = useState(null);
  var [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  var [firebase_user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setUser(firebase_user);
    setIsLoading(loading)
  }, [loading, firebase_user])


  return (
    <div>
      <Navbar className='my-font'>
        <Navbar.Start>
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </Navbar.Start>
        <Navbar.Center className="hidden lg:flex">
            
            <Menu horizontal className="px-1">
                  <Menu.Item>
                    <Link href={{
                      pathname: '/dashboard/curriculum-vitae',
                    }}>Curriculum-vitae</Link>
                  </Menu.Item>
                  <Menu.Item>
                  <Link href='/dashboard/resume'>Resume</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <a>Cover letter</a>
                  </Menu.Item>
            </Menu>
              
            
        </Navbar.Center>
        
        <NavLinks />
      </Navbar>

      <div className="bg-white my-font">{children}</div>
    </div>
  )
      
   
  }

  
 
