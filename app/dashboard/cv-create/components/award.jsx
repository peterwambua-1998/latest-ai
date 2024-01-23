'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase";

const Award = ({userId}) => {
    console.log(userId);
    const [awards, setAwards] = useState([]);
    const [awardValue, setAwardValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

    function getAwards() {
        try {
            let awardsRef = collection(db, 'award');
            let q = query(awardsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setAwards([]);
                docs.forEach(doc => {
                    setAwards(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    async function addAward() {
        try {
            const data = {
                user_id: userId,
                award: awardValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }
            
            const collectionRef =  collection(db, 'award');
            const res = await addDoc(collectionRef, data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAwards();
    }, []);

    return (  
        <div>
            <Accordion defaultChecked className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Awards
                </Accordion.Title>
                <Accordion.Content>
                        <div className="flex gap-2 mb-2 items-center">
                            {awards.map((award, index) => (
                                <div key={index}>
                                    <Badge className="p-4">{award.award} {award.description}</Badge>
                                </div>
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add Award</span>
                            </label>
                            <div className="">
                                <Input className="bg-white text-black grow" placeholder="Ex: singing" onChange={(e) => setHobbyValue(e.target.value)} />
                                <Input className="bg-white text-black grow" placeholder="Ex: singing" onChange={(e) => setHobbyValue(e.target.value)} />
                                <Button onClick={() => {addHobby()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
 
export default Hobbies;