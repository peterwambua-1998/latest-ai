'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import NavBar from './ui/nav';
import { AuthContextProvider } from "./context/AuthContext";
import { usePathname } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }


export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {
          pathname != '/dashboard' ? <NavBar /> : ('')
        }
            
            {children}
      </body>
    </html>
  )
}
