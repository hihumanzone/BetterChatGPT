import { v4 as uuidv4 } from 'uuid';
import { ChatInterface, ConfigInterface, ModelOptions } from '@type/chat';
import useStore from '@store/store';

const date = new Date();
const dateString =
  date.getFullYear() +
  '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + date.getDate()).slice(-2);

// default system message obtained using the following method: https://twitter.com/DeminDimin/status/1619935545144279040
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

export const modelMaxToken = {
  'claude-instant-1.2': 16384,
  'claude-2.1': 16384,
  'codellama-34b-instruct': 16384,
  'gpt-3.5-turbo': 16384,
  'gpt-3.5-turbo-0301': 16384,
  'gpt-3.5-turbo-0613': 16384,
  'gpt-3.5-turbo-1106': 16384,
  'gpt-3.5-turbo-16k': 16384,
  'gpt-4': 16384,
  'gpt-4-0314': 16384,
  'gpt-4-0613': 16384,
  'gpt-4-turbo': 16384,
  'gpt-4-browsing': 16384,
  'gpt-4-turbo-vision-preview': 16384,
  'llama-2-13b-instruct': 16384,
  'llama-2-7b-instruct': 16384,
  'llama-2-70b-instruct': 16384,
  'mistral-7b-instruct': 16384,
  'mistral-8x7b-instruct': 16384
};

export const modelCost = {
  'claude-instant-1.2': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'claude-2.1': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'codellama-34b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo-0301': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo-0613': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo-1106': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-3.5-turbo-16k': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-4': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-4-0314': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-4-0613': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-4-turbo': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-4-browsing': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'gpt-4-turbo-vision-preview': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'llama-2-13b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'llama-2-7b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'llama-2-70b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'mistral-7b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  },
  'mistral-8x7b-instruct': {
    prompt: { price: 0.0015, unit: 1000 },
    completion: { price: 0.002, unit: 1000 },
  }
};

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
  title: title ? title : 'New Chat',
  messages:
    useStore.getState().defaultSystemMessage.length > 0
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
