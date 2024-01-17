import { useState, useEffect } from "react";
import { Modal, Button, Input, Select, Textarea } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp } from "firebase/firestore"; 
import { auth, db } from "@/app/firebase";



const EducationWidget = ({user_id}) => {
    const [visibleEdu, setVisibleEdu] = useState(false);
    var [eduData, setEduData] = useState([]);
    var [school, setSchool] = useState(null);
    var [degree, setDegree] = useState(null);
    var [fieldStudy, setFieldStudy] = useState(null);
    var [startMonthEdu, setStartMonthEdu] = useState(null);
    var [startYearEdu, setStartYearEdu] = useState(null);
    var [endMonthEdu, setEndMonthEdu] = useState(null);
    var [endYearEdu, setEndYearEdu] = useState(null);
    var [grade, setGrade] = useState(null);
    var [descriptionEdu, setDescriptionEdu] = useState(null);
   

    var [schoolError, setSchoolError] = useState(null);
    var [degreeError, setDegreeError] = useState(null);
    var [fieldStudyError, setFieldStudyError] = useState(null);
    var [startMonthEduError, setStartMonthEduError] = useState(null);
    var [startYearEduError, setStartYearEduError] = useState(null);
    var [endDateEduError, setEndDateEduError] = useState(null);
    var [endYearEduError, setEndYearEduError] = useState(null);
    var [gradeError, setGradeError] = useState(null);
    var [descriptionEduError, setDescriptionEduError] = useState(null);

    const toggleVisibleEdu = () => {
        setVisibleEdu(!visibleEdu);
    };

    async function checkEdu(userId) {
        let eduRef =  collection(db, 'education');
        let q =  query(eduRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setEduData([]);
            doc.forEach((data) => {
                setEduData((prev) => [...prev, data.data()]);
            })
        })
    }


    async function addEdu() {
        if (school == null || !school) {
            setSchoolError('field required');
            return;
        } else {
            setSchoolError(null);
        }


        if (degree == null || !degree) {
            setDegreeError('field required');
            return;
        } else {
            setDegreeError(null);
        }


        if (fieldStudy == null || !fieldStudy) {
            setFieldStudyError('field required');
            return;
        } else {
            setFieldStudyError(null);
        }

        if (startMonthEdu == null || !startMonthEdu) {
            setStartMonthEduError('field required');
            return;
        } else {
            setStartMonthEduError(null);
        }

        if (startYearEdu == null || !startYearEdu) {
            setStartYearEduError('field required');
            return;
        } else {
            setStartYearEduError(null);
        }

        if (endMonthEdu == null || !endMonthEdu) {
            setEndDateEduError('field required');
            return;
        } else {
            setEndDateEduError(null);
        }

        if (endYearEdu == null || !endYearEdu) {
            setEndYearEduError('field required');
            return;
        } else {
            setEndYearEduError(null);
        }

        if (grade == null || !grade) {
            setGradeError('field required');
            return;
        } else {
            setGradeError(null);
        }


        if (descriptionEdu == null || !descriptionEdu) {
            setDescriptionEduError('field required');
            return;
        } else {
            setDescriptionEduError(null);
        }

        try {
            let eduRef =  collection(db, 'education');
            await addDoc(eduRef, {
                school: school,
                degree: degree,
                fieldStudy: fieldStudy,
                startMonthEdu: startMonthEdu,
                startYearEdu: startYearEdu,
                endMonthEdu: endMonthEdu,
                endYearEdu: endYearEdu,
                grade: grade,
                descriptionEdu: descriptionEdu,
                user_id: user_id
            });
        } catch (error) {
            console.log('system error please try again');
        }
    }

    useEffect(() => {
        checkEdu(user_id);
    }, [])
   
    return (  
        <div>
            <div className="pl-[5%] pr-[5%] pt-[5%]  pb-[5%] md:pl-[15%] md:pr-[15%] md:pt-[2%] md:pb-[2%] lg:pl-[15%] lg:pr-[15%]">
                <div className="p-2 md:p-5 lg:p-5 bg-amber-200 w-full rounded-md">
                    <div className="flex justify-between">
                        <p className="text-sm md:text-lg font-bold">Education</p>
                        <p className="text-sm md:text-lg font-bold" onClick={toggleVisibleEdu}>+</p>
                    </div>
                    <div className="mt-3 text-xs md:text-base lg:text-base">
                        <p>Add Education to boost your resume</p>
                    </div>
                    { 
                        eduData != null ? 
                        (<div>
                            {eduData.map((edu, index) => (
                                <div className="text-black" key={index}>
                                    {edu.school}
                                </div>
                            ))}
                        </div>) 
                        : 
                        (<div></div>)
                    }
                </div>
            </div>

           <Modal.Legacy open={visibleEdu} className="bg-white max-w-5xl">
                <form>
                    <Modal.Header className="font-bold">Eduction</Modal.Header>
                    <Modal.Body className="p-0">
                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">School</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="school" onChange={(e) => setSchool(e.target.value)} />
                                        <div className="text-red-600 text-sm">{schoolError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Degree</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: Bachelors" onChange={(e) => setDegree(e.target.value)} />
                                        <div className="text-red-600 text-sm">{degreeError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Field of study</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Ex: Business" onChange={(e) => setFieldStudy(e.target.value)} />
                                        <div className="text-red-600 text-sm">{fieldStudyError}</div>
                                    </div>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Start date</span>
                                        </label>
                                        <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setStartMonthEdu(e.target.value)} >
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
                                        <div className="text-red-600 text-sm">{startMonthEduError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Year</span>
                                        </label>
                                        <Input type="month" className="bg-white text-black" placeholder="school" onChange={(e) => setStartYearEdu(e.target.value)} />
                                        <div className="text-red-600 text-sm">{startYearEduError}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full">
                                        <label className="label ">
                                            <span className="label-text text-black">Month</span>
                                        </label>
                                        <Select className="bg-white text-black" defaultValue={'default'} onChange={(e) => setEndMonthEdu(e.target.value)} >
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
                                        <div className="text-red-600 text-sm">{endDateEduError}</div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Year</span>
                                        </label>
                                        <Input type="month" className="bg-white text-black"  onChange={(e) => setEndYearEdu(e.target.value)} />
                                        <div className="text-red-600 text-sm">{endYearEduError}</div>
                                    </div>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Grade</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="school" onChange={(e) => setGrade(e.target.value)} />
                                        <div className="text-red-600 text-sm">{gradeError}</div>
                                    </div>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                                <div className="flex w-full items-center justify-start gap-2 mb-3">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text text-black">Description</span>
                                        </label>
                                        <Input className="bg-white text-black" placeholder="Description" onChange={(e) => setDescriptionEdu(e.target.value)} />
                                        <div className="text-red-600 text-sm">{descriptionEduError}</div>
                                    </div>
                                </div>
                            </div>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisibleEdu} >Close</Button>
                        <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={() => addEdu()}>Save</Button>
                    </Modal.Actions>
                </form>
            </Modal.Legacy>
        </div>
    );
}
 
export default EducationWidget;