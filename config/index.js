export const isDevMode = process.env.NODE_ENV !== 'production';
export const isStorybookMode = process.env.STORYBOOK === 'on'; //$ STORYBOOK=on yarn storybook
export const isTestMode = process.env.NODE_ENV === 'test';

// we want mocked data either on Storybook or tests
export const isMockedEnvironment = isStorybookMode || isTestMode;

export const server = isDevMode
  ? 'http://localhost:3000'
  : 'https://wanderlust-one.vercel.app';

export const restCountriesApi = 'https://restcountries.com/v3.1';
