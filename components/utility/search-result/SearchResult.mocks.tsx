import { ISearchResult } from './SearchResult';

const base: ISearchResult = {
  name: '',
  officialName: '',
  nativeNames: [],
  altSpellings: [],
  iso2Code: 'ZZ',
  iso3Code: 'ZZZ',
  numericCode: 0,
  callingCode: '+00',
  tld: '.zz',
  capital: 'City Z',
  subregion: 'Subregion Z',
  region: 'Continent Z',
  population: {
    year: 1900,
    total: 100,
    source: 'Source Z',
  },
  latlng: [],
  capitalLatLng: [],
  area: 0,
  googleMaps: '',
  ginis: [],
  demonyms: [],
  timezones: [],
  continents: [],
  borders: [],
  flag: '',
  coatOfArms: '',
  currencies: [],
  languages: [],
  startOfWeek: '',
  drivingSide: '',
  postalCode: {
    format: '####',
    regex: '^(d{4})$',
  },
  independent: false,
  landlocked: false,
  unMember: false,
};

export const mockSearchResultProps = {
  base,
};
