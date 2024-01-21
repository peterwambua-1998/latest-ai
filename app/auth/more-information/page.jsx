'use client';
import { auth, db } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal, Button, Input, Select, Textarea } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import ExperienceWidget from "./components/experience";
import EducationWidget from "./components/education";
import SkillWidget from "./components/skill";

const MoreInformation = () => {
    const router = useRouter();
    var [isLoading, setIsLoading] = useState(true);
    var [user, setUser] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [err, setErr] = useState(null);
    const [educationData, setEducationData] = useState([]);
    const [skillData, setSkiData] = useState([]);
    const [expData, setExpData] = useState([]);


    // form input states
    // end of form input
  
    async function checkEdu(userId) {
        let eduRef =  collection(db, 'education');
        let q =  query(eduRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setEducationData([]);
            doc.forEach((data) => {
                setEducationData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function checkExperience(userId) {
        let experienceRef =  collection(db, 'experience');
        let q =  query(experienceRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setExpData([]);
            doc.forEach((data) => {
                setExpData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function checkSkill(userId) {
        let skillRef =  collection(db, 'skill');
        let q =  query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkiData([]);
            doc.forEach((data) => {
                setSkiData((prev) => [...prev, data.data()]);
            })
        })
    }

    function goToDashboard() {
        router.push('/dashboard');
    }


    useEffect(() => {
        setUser(firebase_user);
        setIsLoading(loading);
    }, [firebase_user, loading])
   

    if (isLoading) {
        //console.log(loading);
        return (<div className="h-[100vh] w-[90vw] text-black bg-white text-center ">loading</div>)
    }
   
    
    if (!isLoading) {
        if (!user) {
            router.replace('/');
        } else {
            checkEdu(user.uid);
            checkExperience(user.uid);
            checkSkill(user.uid);
            return (  
                <main>
                    <div className="pl-[5%] pr-[5%] pt-2 w-full text-center">
                        <p className="font-bold text-[#1E3A8A] md:text-2xl lg:text-2xl">Lets Know more about you</p>
                        {
                            (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div><p>You can proceed to your dashboard</p><Button color="accent" onClick={() => goToDashboard()}>Proceed</Button></div>) : ''
                        }
                    </div>

                    <ExperienceWidget user_id={user.uid} />

                    <EducationWidget user_id={user.uid} />

                    <SkillWidget user_id={user.uid} />
                    <div className="text-center">
                    {
                            (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div className="pb-5"><p>You can proceed to your dashboard</p><Button onClick={() => goToDashboard()}>Proceed</Button></div>) : ''
                    }
                    </div>
                </main>
            );
        }
    }
}
 
export default MoreInformation;