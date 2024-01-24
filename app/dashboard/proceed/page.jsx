'use client'
import { auth, db } from "@/app/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Divider, Loading } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import SkillWidget from "../cv-create/components/skills";
import Hobbies from "../cv-create/components/hobbies";

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
        
        return (<div>
            {ab != null ? (<div>{ab.description}</div>) : (<p>lb</p>)}
            {firebase_user.uid}
            <Hobbies userId={firebase_user.uid} />
        </div>)
    }
}
 
export default CvPageDesign;