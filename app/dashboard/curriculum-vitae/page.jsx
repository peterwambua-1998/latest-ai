'use client';
import { Menu } from "react-daisyui";

const CurriculumVitae = () => {
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
                                    <a>Item 1</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a className="active">Item 2</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a>Item 3</a>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className="md:col-span-3">
                            <div className="p-2">
                                2
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CurriculumVitae;