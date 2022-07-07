const dev = process.env.NODE_ENV !== 'production';

export const server = dev
  ? 'http://localhost:3000'
  : 'https://wanderlust-one.vercel.app';

export const restCountriesApi = 'https://restcountries.com/v3.1/';
