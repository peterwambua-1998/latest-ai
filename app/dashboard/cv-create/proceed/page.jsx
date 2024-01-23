'use client'
import { auth, db } from "@/app/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Loading } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const CvPageDesign = () => {

    const [firebase_user, loading, error] = useAuthState(auth);

    // cv data
    const [about, setAbout] = useState(null);

    console.log(firebase_user);

    async function getAbout(userId) {
        try {
            const usb = onSnapshot(doc(db, 'about', userId), doc => {
                setAbout(doc.data());
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!loading) {
            if (firebase_user) {
                
                getAbout(firebase_user.uid);
            }
        }
    }, [firebase_user, loading])

    if (loading && firebase_user == null) {
        return (<div>loading...</div>)
    }

    if (!loading && firebase_user != null) {
        if (!firebase_user) { } else {
        return (  
            <div>
                <div>
                    {firebase_user == null ? <Loading /> : (
                    <p>
                        {about.description}
                    </p>
                    )}
                </div>
            </div>
        );
                    }
    }
}
 
export default CvPageDesign;