'use client'
import { useEffect, useState } from 'react';
import { openAi } from './components/open-ai';

// const openAi = new OpenAI({
//     apiKey: process.env.NEXT_OPEN_AI_API_KEY
// });

// async function createResumeSummary() {
//     let summary = await openAi.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{role: 'system', content: 'hello create a 3 line resume professional summary using job description in quotes "Experienced forklift operator with 5+ years of experience optimizing loads to ensure operational efficiency, streamlining organization and logistics. Proficiency in operating technical machinery and RF scanners." I have worked with machinery for 5 years'}]
//     });

//     console.log(completion);
// }

async function createResumeSummary() {
    let summary = await openAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: 'system', content: 'hello create a 3 line resume professional summary using job description in quotes "Experienced forklift operator with 5+ years of experience optimizing loads to ensure operational efficiency, streamlining organization and logistics. Proficiency in operating technical machinery and RF scanners." I have worked with machinery for 5 years'}]
    });

    console.log(completion);
}

const CreateResume = () => {
    const [summary, setSummary] = useState(null);

    async function getSummary() {
        console.log(process.env.NEXT_OPEN_AI_API_KEY);
        await createResumeSummary();
    }

    useEffect(() => {
        getSummary();
    }, [])

    return (  
        <div>

        </div>
    );
}
 
export default CreateResume;