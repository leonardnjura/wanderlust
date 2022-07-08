import { IFooter } from './Footer';

const base: IFooter = {
  locationData: {
    ip: '1.1.1.1',
    country: 'Country Y',
    iso2: 'iso2 Y',
    city: 'Capital Y',
    timezone: 'Timezone Y',
    continent: 'Continent Y',
  },
  countryData: {
    name: '',
    officialName: '',
    nativeNames: [],
    altSpellings: [],
    iso2Code: 'yy',
    iso3Code: 'YYY',
    numericCode: 0,
    callingCode: '+00',
    tld: '.yy',
    capital: 'City Y',
    subregion: 'Subregion Y',
    region: 'Continent Y',
    population: {
      year: 1900,
      total: 100,
      source: 'Source Y',
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
      format: '#####',
      regex: '^(d{5})$',
    },
    independent: false,
    landlocked: false,
    unMember: false,
  },
};

export const mockFooterProps = {
  base,
};
