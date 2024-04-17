import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default openai;
