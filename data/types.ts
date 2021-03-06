import { Schema } from './my-schemas';

/*ISearchData*/
export interface ISearchData {
  url: string;
  title: string;
  text: string;
}

export interface ICustomData {
  success?: boolean;
  message: string;
  verbose?: any;
  data?: any;
}

/*IUserData*/
export interface IUserData {
  _id: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  address?: IAddress;
  hashtags?: string[];
  favMovies?: IMovie[];
  notes?: string;
  gender?: string;
  status?: number;
  dateCreated?: string;
  dateUpdated?: string;
}

export const IUserDataSchema: Schema = {
  fields: {
    _id: 'string',
    email: 'string',
    password: 'string',
    firstName: 'string',
    lastName: 'string',
    avatar: 'string',
    address: 'object',
    hashtags: 'object',
    favMovies: 'object',
    notes: 'string',
    gender: 'string',
    status: 'number',
    dateCreated: 'string',
    dateUpdated: 'string',
  },
  required: ['email', 'password'],
};

/*ICountryData*/

export interface ICountryData {
  name: string;
  officialName: string;
  nativeNames: INativeName[];
  altSpellings: string[];
  iso2Code: string;
  iso3Code: string;
  numericCode: number;
  callingCode: string;
  tld: string;
  capital: string;
  subregion: string;
  region: string;
  population: IPopulation;
  latlng: string[];
  capitalLatLng: string[];
  area: number;
  googleMaps: string;
  ginis: IGini[];
  demonyms: IDemonym[];
  timezones: string[];
  continents: string[];
  borders: ICountry[];
  flag: string;
  coatOfArms: string;
  currencies: ICurrency[];
  languages: ILanguage[];
  startOfWeek: string;
  drivingSide: string;
  postalCode: IPostalCode;
  independent: boolean;
  landlocked: boolean;
  unMember: boolean;
}

export interface ICountry {
  iso3Code: string;
  commonName: string;
}

/*Others*/
export interface IMovie {
  title: string;
  year: number;
  notes?: string;
}

export interface IAddress {
  city: string;
  street: string;
  houseNumber: string;
  postalCode: string;
}

export interface ILocationData {
  ip: string;
  country: string;
  iso2: string;
  city: string;
  timezone: string;
  continent: string;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface ILanguage {
  code: string;
  name: string;
}

export interface INativeName {
  languageCode: string;
  languageName: string;
  officialName: string;
  commonName: string;
}

export interface IDemonym {
  languageCode: string;
  languageName: string;
  m: string;
  f: string;
}

export interface IGini {
  year: number;
  index: number;
}

export interface IPopulation {
  year: number;
  total: number;
  source: string;
}

export interface IPostalCode {
  format: string;
  regex: string;
}

export type ISearchDataOrCustomData = ISearchData[] | ISearchData | ICustomData;
export type IUserDataOrCustomData = IUserData[] | IUserData | ICustomData;
export type ILocationDataOrCustomData =
  | ILocationData[]
  | ILocationData
  | ICustomData;

export type ICountryDataOrCustomData =
  | ICountryData[]
  | ICountryData
  | ICustomData;
