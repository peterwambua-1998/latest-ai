'use client'
import { useEffect, useState } from "react";
import { Input,Textarea, Accordion, Badge, Button, Card } from "react-daisyui";
import { collection, query, where, getDoc, getDocs, onSnapshot, Timestamp,doc, addDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase";

const Projects = ({userId}) => {
    const [projects, setProjects] = useState([]);
    const [projectValue, setProjectValue] = useState(null);
    const [descriptionValue, setDescriptionValue] = useState(null);

    function getProjects() {
        try {
            let awardsRef = collection(db, 'project');
            let q = query(awardsRef, where('user_id', '==', userId));
            onSnapshot(q, (docs) => {
                setProjects([]);
                docs.forEach(doc => {
                    setProjects(prev => [...prev, doc.data()]);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }


    async function addProject() {
        try {
            const data = {
                user_id: userId,
                title: projectValue,
                description: descriptionValue,
                created_at: Timestamp.now()
            }
            
            const collectionRef =  collection(db, 'project');
            const res = await addDoc(collectionRef, data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (  
        <div>
            <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Projects
                </Accordion.Title>
                <Accordion.Content>
                        <div className="md:grid md:grid-cols-2 gap-2 mb-2 items-center">
                            {projects.map((project, index) => (
                                <div key={index}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title tag="h2">{project.title}</Card.Title>
                                            <p>{project.description}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                                
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <label className="label">
                                <span className="label-text">Add Project</span>
                            </label>
                            <div className="flex gap-4">
                                <Input className="bg-white text-black grow" placeholder="Title" onChange={(e) => setProjectValue(e.target.value)} />
                                <Input className="bg-white text-black grow" placeholder="Description" onChange={(e) => setDescriptionValue(e.target.value)} />
                                <Button onClick={() => {addProject()}}>Save</Button>
                            </div>
                        </div>
                        
                </Accordion.Content>
            </Accordion>
        </div>
    );
}
 
export default Projects;