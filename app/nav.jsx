'use client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dropdown, Navbar, Menu, Button } from 'react-daisyui';
import {auth} from './firebase';



const NavBar = () => {
    var [user, setUser] = useState(null);
    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user;
              setUser(uid);
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              setUser(null);
              console.log("user is logged out")
            }
          });
        
    }, [user])

    const handleSignOut = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    }
    
    
    return (  
    <Navbar className='bg-black'>
      <Navbar.Start>
        <Dropdown>
          <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </Button>
          <Dropdown.Menu tabIndex={0} className="w-52 menu-sm mt-3 z-[1]">
            <Dropdown.Item>Item 1</Dropdown.Item>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <Link href='/'>home</Link>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </Navbar.Start>
      <Navbar.Center className="hidden lg:flex">
        <Menu horizontal className="px-1">
          <Menu.Item>
            <a>Item 1</a>
          </Menu.Item>
          <Menu.Item>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <Menu.Item>
                  <a>Submenu 1</a>
                </Menu.Item>
                <Menu.Item>
                  <a>Submenu 2</a>
                </Menu.Item>
              </ul>
            </details>
          </Menu.Item>
          <Menu.Item>
            <a>Item 3</a>
          </Menu.Item>
        </Menu>
      </Navbar.Center>
      {!user ? 
      <div>
        <Navbar.End>
          <Button tag="a" href='/auth/login'>login</Button>
        </Navbar.End>
        <Navbar.End>
          <Button tag="a" href='/auth/sign-up'>Sign up</Button>
        </Navbar.End>
      </div>
      :
      (<div>
        <Navbar.End>
          <Button tag="a" onClick={() => handleSignOut()}>logout</Button>
        </Navbar.End>
      </div>)
      }
    </Navbar>

    );
}
 
export default NavBar;

/* <nav>
                {pathname == '/' ? <Link href='/dashboard'>Daashboard</Link>: ''}
            </nav> */