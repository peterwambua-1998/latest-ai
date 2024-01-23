import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Textarea, Accordion, Card } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase";

const ExperienceWidget = ({user_id}) => {
    const [visible, setVisible] = useState(false);
    var [experienceData, setExperienceData] = useState([]);
    var [companyName, setCompanyName] = useState(null);
    var [currentEmployment, setCurrentEmployment] = useState(null);
    var [employmentType, setEmploymentType] = useState(null);
    var [startMonthExp, setStartMonthExp] = useState(null);
    var [startYearExp, setStartYearExp] = useState(null);
    var [endMonthExp, setEndMonthExp] = useState(null);
    var [endYearExp, setEndYearExp] = useState(null);
    var [uTitle, setUTitle] = useState(null);
    var [uDescription, setUDescription] = useState(null);
    var [location, setLocation] = useState(null);
    var [locationType, setLocationType] = useState(null);

    const toggleVisibleEdu = () => {
        setVisible(!visible);
    };

    // error handling
    var [companyNameError, setCompanyNameError] = useState(null);
    var [currentEmploymentError, setCurrentEmploymentError] = useState(null);
    var [employmentTypeError, setEmploymentTypeError] = useState(null);
    var [startMonthExpError, setStartMonthExpError] = useState(null);
    var [startYearExpError, setStartYearExpError] = useState(null);
    var [endDateExpError, setEndDateExpError] = useState(null);
    var [endYearExpError, setEndYearExpError] = useState(null);
    var [uTitleError, setUTitleError] = useState(null);
    var [uDescriptionError, setUDescriptionError] = useState(null);
    var [locationError, setLocationError] = useState(null);
    var [locationTypeError, setLocationTypeError] = useState(null);

    

    async function checkExperience(userId) {
        console.log(user_id);
        let experienceRef =  collection(db, 'experience');
        let q =  query(experienceRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setExperienceData([]);
            doc.forEach((data) => {
                console.log(data);
                setExperienceData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function addExperience() {
        if (uTitle == null || !uTitle) {
            setUTitleError('field required');
            return;
        } else {
            setUTitleError(null);
        }


        if (employmentType == 'Pick one' || !employmentType) {
            setEmploymentTypeError('field required');
            return;
        } else {
            setEmploymentTypeError(null);
        }

        if (!companyName || companyName == null) {
            setCompanyNameError('field required');
            return;
        } else {
            setCompanyNameError(null);
        }

        if (!location || location == null) {
            setLocationError('field required');
            return;
        } else {
            setLocationError(null);
        }

        if (!locationType || locationType == null) {
            setLocationTypeError('field required');
            return;
        } else {
            setLocationTypeError(null);
        }

        if (!startMonthExp || startMonthExp == null) {
            setStartMonthExpError('field required');
            return;
        } else {
            setStartMonthExpError(null);
        }
        if (!startYearExp || startYearExp == null) {
            setStartYearExpError('field required');
            return;
        } else {
            setStartYearExpError(null);
        }

        if (!endMonthExp || endMonthExp == null) {
            setEndDateExpError('field required');
            return;
        } else {
            setEndDateExpError(null);
        }

        if (!endYearExp || endYearExp == null) {
            setEndYearExpError('field required');
            return;
        } else {
            setEndYearExpError(null);
        }

        if (!uDescription || uDescription == null) {
            setUDescriptionError('field required');
            return;
        } else {
            setUDescriptionError(null);
        }


        try {
            let experienceRef =  collection(db, 'experience');
            await addDoc(experienceRef, {
                title: uTitle,
                employmentType: employmentType,
                companyName: companyName,
                location: location,
                locationType: locationType,
                startMonth: startMonthExp,
                startYear: startYearExp,
                endMonth: endMonthExp,
                endYear: endYearExp,
                description: uDescription,
                user_id: user_id
            });
        } catch (error) {
            setErr('system error please try again');
        }
    }

    useEffect(() => {
        checkExperience(user_id);
    }, [])

    
    return (  
        <main>
            <Accordion className="bg-black text-white">
                <Accordion.Title className="text-xl font-medium text-white">
                    Expireince
                </Accordion.Title>
                <Accordion.Content>
                        <div className="md:grid md:grid-cols-2 gap-2 mb-2 items-center">
                            {experienceData.map((exp, index) => (
                                <div key={index}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title tag="h2">{exp.companyName}</Card.Title>
                                            <p>{exp.title}</p>
                                            <p>{exp.location}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                                
                            ))}
                        </div>
                        
                        <div className="form-control w-full grow">
                            <div className="">
                                <Button onClick={toggleVisibleEdu}>Add Experience</Button>
                            </div>
                        </div>
                </Accordion.Content>
            </Accordion>



            <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Experience</Modal.Header>
                    <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Job Title</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="title" onChange={(e) => setUTitle(e.target.value)} />
                                        <div className="text-red-600 text-sm">{uTitleError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Pick the best fantasy franchise</span>
                                        </label>
                                        <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setEmploymentType(e.target.value)} >
                                            <option value={'default'} disabled>
                                                Pick one
                                            </option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Self-employed">Self-employed</option>
                                            <option value="Freelance">Freelance</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Apprenticeship">Apprenticeship</option>
                                            <option value="Seasonal">Seasonal</option>
                                        </Select>
                                        <div className="text-red-600 text-sm">{employmentTypeError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Company name</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: google" onChange={(e) => setCompanyName(e.target.value)} />
                                        <div className="text-red-600 text-sm">{companyNameError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Location</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: united states" onChange={(e) => setLocation(e.target.value)} />
                                        <div className="text-red-600 text-sm">{locationError}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-start gap-2 ">
                                <div className="form-control w-full">
                                    <label className="label ">
                                        <span className="label-text text-black">Location type</span>
                                    </label>
                                    <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setLocationType(e.target.value)} >
                                        <option value={'default'} disabled>
                                            Pick one
                                        </option>
                                        <option value="On-site">On-site</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Remote">Remote</option>
                                    </Select>
                                    <div className="text-red-600 text-sm">{locationTypeError}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Start date</span>
                                        </label>
                                        <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setStartMonthExp(e.target.value)} >
                                            <option value={'default'} disabled>
                                                Month
                                            </option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </Select>
                                        <div className="text-red-600 text-sm">{startMonthExpError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Year</span>
                                        </label>
                                        <Input type="month" className="bg-white text-black" placeholder="school" onChange={(e) => setStartYearExp(e.target.value)} />
                                        <div className="text-red-600 text-sm">{startYearExpError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">End Date</span>
                                        </label>
                                        <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setEndMonthExp(e.target.value)} >
                                            <option value={'default'} disabled>
                                                Month
                                            </option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </Select>
                                        <div className="text-red-600 text-sm">{endDateExpError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Year</span>
                                        </label>
                                        <Input type="month" className="bg-white text-black"  onChange={(e) => setEndYearExp(e.target.value)} />
                                        <div className="text-red-600 text-sm">{endYearExpError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full items-center justify-end gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Describe what you did</span>
                                    </label>
                                    <Textarea className="bg-white text-black" onChange={(e) => setUDescription(e.target.value)} />
                                    <div className="text-red-600 text-sm">{uDescriptionError}</div>
                                </div>
                            </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addExperience()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </main>
    );
}
 
export default ExperienceWidget;