'use client';
import { useEffect, useState } from 'react';
import { FacebookAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';
import loginImg from '@/app/images/login-u.svg'
import Image from 'next/image';
import { auth } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [err, setErr] = useState(null)
    const router = useRouter();
    var [isLoading, setIsLoading] = useState(true);
    var [user, setUser] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);

    const mSignUp = async () => {
        try {
           await createUserWithEmailAndPassword(auth, email, password);
           router.replace('/auth/more-information');
        } catch (error) {
            setErr(err);
        }
    };

    const mSighUpWithFacebook = async () => {
        try {
            let fbProv = FacebookAuthProvider();
            await signInWithPopup(auth, fbProv);
        } catch (error) {
            setErr
        }
    }



    useEffect(() => {
      setUser(firebase_user);
      setIsLoading(loading);
    }, [loading])

    if (isLoading) {
        return (<div className="h-[100vh] w-[90vw] text-black bg-white text-center ">loading</div>)
    }

    if (!isLoading) {
        if (user) {
            return router.replace('/dashboard');
        } else {
            return (  
                <main>
                    <div className="">
                        {/* hero section */}
                        <div className="p-[5%]">
                            <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 md:gap-4 grid-cols-1 my-bg">
                                <div>
                                    <p className='mb-3 text-center w-[70%] font-bold'>Create your account</p>
                                    <form action="">
                                        <div class="relative mb-5">
                                            <input onChange={(e) => setEmail(e.target.value)} required type="email" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter email" />
                                            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                                <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                            </div>
                                        </div>
        
                                        <div class="relative mb-5">
                                            <input onChange={(e) => setPassword(e.target.value)} required type="password" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter password" />
                                            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                                <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
                                            </div>
                                        </div>
        
                                        <div class="relative mb-5">
                                            <input onChange={(e) => setPasswordAgain(e.target.value)} required type="password" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter password again" />
                                            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                                <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
                                            </div>
                                        </div>
        
                                        <button onClick={() => mSignUp()} disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)} type="button" class="py-3 px-4  gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-[#F59E0B] text-white hover:bg-[#b78734] disabled:opacity-50 disabled:pointer-events-none w-[100%] md:w-[70%] lg:w-[70%] text-center">
                                            Sign Up
                                        </button>
                                        <div className='w-[100%] md:w-[70%] lg:w-[70%] mt-2'>
                                            <p className='text-xs text-center'>or sign up with</p>
                                        </div>
                                        
                                    </form>
                                    {err != null ? <div className="text-center text-lg text-red-600">{err}</div> : ''}
                                    <div className='w-[100%] md:w-[70%] lg:w-[70%] mt-2'>
                                        <button onClick={() => mSighUpWithFacebook()} type="button" className="mt-5 py-3 px-4 w-full text-center gap-x-2 text-sm font-semibold rounded-full border border-[#0077B5] text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none ">
                                        <FontAwesomeIcon icon={faCoffee} />Linked In
                                        </button>
                                        <button type="button" className="mt-5 py-3 px-4 w-full text-center gap-x-2 text-sm font-semibold rounded-full border border-[#1DA1F2] text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none ">
                                            Twitter
                                        </button>
                                    </div>
                                </div>
                                <div className='hidden md:block lg:block text-right md:pl-[10%]'>
                                    <Image src={loginImg} height={380} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            );
        }
    }

    
}
 
export default SignUp;