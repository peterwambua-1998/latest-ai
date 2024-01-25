'use client'
import { auth, db } from "@/app/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Divider, Loading, Button, Badge } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import profileImg from '@/app/images/profile.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCoffee } from "@fortawesome/free-solid-svg-icons";

const CvPageDesign = () => {

    const [firebase_user, loading, error] = useAuthState(auth);
    const [ab, setAb] = useState(null);

    // cv data


    async function getAbout() {
        try {
            const usb = onSnapshot(doc(db, 'about', firebase_user.uid), doc => {
                setAb(doc.data());
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(firebase_user);
        if (firebase_user != null) {
            getAbout();
        }
    }, [loading]);

    


    //     return (  
    //         <div>
    //             {console.log('user=='+firebase_user)}
    //             {firebase_user ? (<></>):<AboutMe useId={firebase_user.uid} />}
    //         </div>
    //     );
    if (!firebase_user) {
        return (<p>l</p>)
    } else {
        
        return (
            <div className="md:grid md:grid-cols-4 bg-slate-200">
                <div className="md:col-span-3 p-5">
                    <div className="bg-white p-10 border-t-4 border-blue-500">
                        {/* cv header */}
                        <div className="flex justify-between mb-4">
                            <Image src={profileImg} width={80} height={80} className="rounded-full" />
                            <div className="text-center">
                                <h3 className="md:font-bold md:text-xl mb-2">Peter Wambua Mutuku</h3>
                                <p className="text-[#808080] text-sm mb-2">senior product designer</p>
                                <div className="flex gap-4 text-sm">
                                    <p>pwambua25@gmail.com</p>
                                    <p>+254 715 100 539</p>
                                    <p>Nairobi, Kenya</p>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        {/* cv header end */}
                        {/* about me */}
                        <div>
                            <p className="mb-2 font-bold">About</p>
                            <p className="text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed ipsa optio sunt saepe. At numquam, magni officia dolore libero modi harum amet accusantium molestias laborum, repellat incidunt dolorem sint voluptatibus!</p>
                        </div>
                        <Divider></Divider>
                        {/* experience */}
                        <div>
                            <p className="mb-2 font-bold">Experience</p>
                            <div className="mb-8">
                                <p className="text-blue-600 font-bold mb-2 text-lg">Programmer, Google</p>
                                <p className="text-sm mb-2">Nairobi, Kenya (January 2022 - February 2025)</p>
                                <div className="pl-3">
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</li>
                                    </ul>
                                </div>
                                
                            </div>
                            <div>
                                <p className="text-blue-600 font-bold mb-2 text-lg">Product Designer, Dribble</p>
                                <p className="text-sm mb-2">Nairobi, Kenya (January 2022 - February 2025)</p>
                                <div className="pl-3">
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</li>
                                    </ul>
                                </div>
                                
                            </div>
                            <div className="p-2 mt-8">
                                <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Experience</Button>
                            </div>
                        </div>
                        {/* experience */}
                        <Divider></Divider>
                        {/* Education */}
                        <div>
                            <p className="mb-2 font-bold">Education</p>
                            <div className="mb-8">
                                <p className="text-blue-600 font-bold mb-2 text-lg">Bachelors, Business</p>
                                <p className="text-sm mb-2">Nairobi University (January 2022 - February 2025)</p>
                                <div className="pl-3">
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem facilis possimus dignissimos, similique ut nihil vel ducimus porro quas autem sapiente voluptatum doloribus necessitatibus quia voluptatem a impedit nemo harum!</li>
                                    </ul>
                                </div>
                                
                            </div>
                            <div className="p-2 mt-8">
                                <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Experience</Button>
                            </div>
                        </div>
                        {/* Education */}
                        <Divider></Divider>
                        {/* skills */}
                        <div>
                            <p className="mb-2 font-bold">Skills</p>
                            <div className="flex gap-4">
                                <Badge className="p-4 bg-amber-300 text-black">HTML</Badge>
                                <Badge className="p-4 bg-amber-300 text-black">CSS</Badge>
                                <Badge className="p-4 bg-amber-300 text-black">Javascript</Badge>
                                <Badge className="p-4 bg-amber-300 text-black">Nextjs</Badge>
                                <Badge className="p-4 bg-amber-300 text-black">C++</Badge>
                            </div>
                            <div className="p-2 mt-8">
                                <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Skill</Button>
                            </div>
                        </div>
                        {/* skills */}
                        <Divider></Divider>
                        {/* Links */}
                        <div>
                            <p className="mb-2 font-bold mt-8">Links</p>
                            <div className="text-sm">
                                <p><span className="font-bold pr-2">website:</span><span className="text-blue-500">peterwambua.io</span></p>
                                <p><span className="font-bold pr-2">linkedin:</span><span className="text-blue-500">linkedin.com/in/peterwambua</span></p>
                            </div>
                            <div className="p-2 mt-8">
                                <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Link</Button>
                            </div>
                        </div>
                        {/* Links */}
                        {/* Languages */}
                        <div>
                            <p className="mb-2 font-bold mt-8">Languages</p>
                            <div className="text-sm">
                                <p>Swahili (native)</p>
                                <p>English (professional)</p>
                            </div>
                            <div className="p-2 mt-8">
                                <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Link</Button>
                            </div>
                        </div>
                        {/* Languages */}
                        {/* referee */}
                        <div>
                            <p className="mb-2 font-bold mt-8">References</p>
                            <div className="md:flex md:gap-20">
                                <div>
                                    <div className="text-sm">
                                        <p className="font-bold text-blue-500">Sam Mucha</p>
                                        <p>Zulten-WS</p>
                                        <p>CEO</p>
                                        <p>sam@mail.com</p>
                                        <p>+254 715 100 539</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm">
                                        <p className="font-bold text-blue-500">Sam Mucha</p>
                                        <p>Zulten-WS</p>
                                        <p>CEO</p>
                                        <p>sam@mail.com</p>
                                        <p>+254 715 100 539</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-2 mt-8">
                                <Button className="bg-transparent w-full rounded-full border-amber-400 text-amber-800"><FontAwesomeIcon icon={faCirclePlus} /> Add Link</Button>
                            </div>
                        </div>
                        {/* referee */}
                    </div>
                </div>
                <div className="bg-white">
                    <p>peter</p>
                </div>

            </div>
        )
    }
}
 
export default CvPageDesign;

{/* {ab != null ? (<div>{ab.description}</div>) : (<p>lb</p>)} */}