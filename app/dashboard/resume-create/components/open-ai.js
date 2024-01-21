import { OpenAI} from 'openai';

const openAi = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});


export {openAi}