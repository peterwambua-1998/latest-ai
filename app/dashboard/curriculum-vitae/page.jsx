'use client';
import { db, auth } from "@/app/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Card, Button } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 

const CurriculumVitae = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [firebase_user, loading, error] = useAuthState(auth);
    const [user, setUser] = useState(searchParams.get('userId'));
    var [useCVS, setUserCvs] =  useState([]);
    const [err, setErr] =  useState(null);
    let [abcd, setAbcd] = useState([]);


    function getCv() {
       try {
            let cvRef =  collection(db, 'cv');
            let q =  query(cvRef, where("user_id", "==", user));
            onSnapshot(q, (doc) => {
                console.log(doc);
                setAbcd([]);
                doc.forEach((data) => {
                    setAbcd((prev) => [...prev, data.data()]);
                })
            });
            
       } catch (error) {
            console.log(error);
            setErr('system error please try again');
       } 
    }

    console.log(abcd);
   
    useEffect(() => {
        if (loading == false) {
            setUser(firebase_user.uid);
        }
    },[firebase_user, loading]);

    useEffect(() => {
        getCv();
    }, []);
    
    if (!user) {
        router.replace('/');
    }

    return (  
        <div>
            <div className="p-8 h-[40vh] my-bg-blur">
                <h1 className="text-2xl font-bold">Curriculum Vitae</h1>
            </div>
            <div className="p-8 absolute top-[30%] w-full">
                <div className="md:border md:border-slate-200 p-5 md:rounded bg-white">
                    <div className="md:grid md:grid-cols-4">
                        <div className="p-2" >
                            <Menu>
                                <Menu.Item>
                                    <a className="active">My Curriculam Vitae</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/dashboard/cv-create'>Create Cv</Link>
                                </Menu.Item>
                                {/* <Menu.Item>
                                    <a>Item 3</a>
                                </Menu.Item> */}
                            </Menu>
                        </div>
                        <div className="md:col-span-3">
                            <div className="md:grid md:grid-cols-3 gap-4">
                                {abcd.length > 0 ? (
                                    <div>
                                    <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Image src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                                    <Card.Body>
                                        <Card.Title tag="h2">Shoes!</Card.Title>
                                        <p>If a dog chews shoes whose shoes does he choose?</p>
                                        <Card.Actions className="justify-end">
                                        <Button color="primary">Buy Now</Button>
                                        </Card.Actions>
                                    </Card.Body>
                                </Card>
                                </div>

                                ) : (<div></div>)}

                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CurriculumVitae;