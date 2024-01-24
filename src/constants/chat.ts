import { v4 as uuidv4 } from 'uuid';
import { ChatInterface, ConfigInterface, ModelOptions } from '@type/chat';
import useStore from '@store/store';

const date = new Date();
const dateString =
  `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;

export const _defaultSystemMessage =
  import.meta.env.VITE_DEFAULT_SYSTEM_MESSAGE ??
  `You are ChatGPT, a large language model trained by OpenAI.
Carefully heed the user's instructions. 
Respond using Markdown.`;

export const modelOptions: ModelOptions[] = [
  'claude-instant-1.2',
  'claude-2.1',
  'codellama-34b-instruct',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-0301',
  'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo-1106',
  'gpt-3.5-turbo-16k',
  'gpt-4',
  'gpt-4-0314',
  'gpt-4-0613',
  'gpt-4-turbo',
  'gpt-4-browsing',
  'gpt-4-turbo-vision-preview',
  'llama-2-13b-instruct',
  'llama-2-7b-instruct',
  'llama-2-70b-instruct',
  'mistral-7b-instruct',
  'mistral-8x7b-instruct'
];

export const defaultModel = 'gpt-3.5-turbo';

const sixteenK = 16384;

export const modelMaxToken = modelOptions.reduce((acc, modelId) => {
  acc[modelId] = sixteenK; // Assuming all models have the same max tokens for simplicity
  return acc;
}, {});

export const modelCost = modelOptions.reduce((acc, modelId) => {
  acc[modelId] = { // Assuming all models have the same cost for simplicity
    prompt: { price: 0.002, unit: 1000 },
    completion: { price: 0.002, unit: 1000 } 
  };
  return acc;
}, {});

export const defaultUserMaxToken = 4000;

export const _defaultChatConfig: ConfigInterface = {
  model: defaultModel,
  max_tokens: defaultUserMaxToken,
  temperature: 1,
  presence_penalty: 0,
  top_p: 1,
  frequency_penalty: 0,
};

export const generateDefaultChat = (
  title?: string,
  folder?: string
): ChatInterface => ({
  id: uuidv4(),
  title: title || 'New Chat',
  messages: useStore.getState().defaultSystemMessage.length > 0
    ? [{ role: 'system', content: useStore.getState().defaultSystemMessage }]
    : [],
  config: { ...useStore.getState().defaultChatConfig },
  titleSet: false,
  folder,
});

export const codeLanguageSubset = [
  'python',
  'javascript',
  'java',
  'go',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'graphql',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'plaintext',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];
