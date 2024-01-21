'use client'
import { Input,Textarea } from "react-daisyui";


const CreateCv = () => {
    return (  
        <div className="p-0 h-[100vh] resume-bg bg-slate-200">
            <div className="">
                
            </div>
            <div className="p-10">
                <p className="pt-10">peter</p>
                <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-0 md:gap-5 lg:gap-8">
                    <div className="flex w-full items-center justify-start gap-2 mb-3">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-black">Hobbies</span>
                            </label>
                            <Input className="bg-white text-black" placeholder="Ex: google" onChange={(e) => setCompanyName(e.target.value)} />
                            {/* <div className="text-red-600 text-sm">{companyNameError}</div> */}
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-start gap-2 mb-3">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-black">Location</span>
                            </label>
                            <Input className="bg-white text-black" placeholder="Ex: united states" onChange={(e) => setLocation(e.target.value)} />
                            {/* <div className="text-red-600 text-sm">{locationError}</div> */}
                        </div>
                    </div>
                </div>
                <div className="w-full items-center justify-end gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Describe what you did</span>
                        </label>
                        <Textarea className="bg-white text-black" onChange={(e) => setUDescription(e.target.value)} />
                        {/* <div className="text-red-600 text-sm">{uDescriptionError}</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CreateCv;