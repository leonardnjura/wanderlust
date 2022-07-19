import { ICountryData } from '../../../data/types';

const base: ICountryData = {
  name: '',
  officialName: '',
  nativeNames: [],
  altSpellings: [],
  iso2Code: 'xx',
  iso3Code: 'XXX',
  numericCode: 0,
  callingCode: '+00',
  tld: '.xx',
  capital: 'City X',
  subregion: 'Subregion X',
  region: 'Continent X',
  population: {
    year: 1900,
    total: 100,
    source: 'Source X',
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

export const mockCountryCardProps = {
  base,
};
