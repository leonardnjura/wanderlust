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

export interface ICatData {
  _id: string;
  tags: string[];
  title: string;
  body: string;
  author: string;
  time: string;
}

export type ISearchDataOrCustomData = ISearchData[] | ISearchData | ICustomData;
export type IUserDataOrCustomData = IUserData[] | IUserData | ICustomData;
export type ILocationDataOrCustomData =
  | ILocationData[]
  | ILocationData
  | ICustomData;

// export type ISearchDataApiResponse = ISearchData[];
// export type IUserDataApiResponse = IUserData[];
// export type ILocationDataApiResponse = ILocationData;
export type ICatDataApiResponse = ICatData;
