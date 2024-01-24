import { db } from "@/app/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const AboutMe = ({useId}) => {
    const [abouts, setAbouts] = useState(null);
    console.log(useId);
    
    useEffect(() => {
        getAbouts()
    },[]);


    function getAbouts(userId) {
            try {
               onSnapshot(doc(db, 'about', userId), doc => {
                    setAbouts(doc.data());
                });
            } catch (error) {
                console.log(error.message());
            }
        }


    
    return (  
        <div>
            {console.log(abouts)}
        </div>
    );
}
 
export default AboutMe;