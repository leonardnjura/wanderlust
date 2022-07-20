import { server } from '../config';
import { stripFields } from '../data/my-schemas';
import {
  ICountry,
  ICountryData,
  ICurrency,
  IDemonym,
  IGini,
  ILanguage,
  INativeName,
  IPostalCode,
} from '../data/types';
import { isEmpty } from '../utils/preops';

export async function loadCountries(excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadOneCountry(id: string, excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries/${id}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadOneCountryClean(
  id: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields
   * Returns a cleaner endpoint following local object
   */
  const res = await fetch(`${server}/api/countries/${id}?clean=true`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadPassedCountries(
  commaSeparatedStr: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields
   */
  const res = await fetch(`${server}/api/countries?codes=${commaSeparatedStr}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

//**Search */
export async function searchCountriesByName(
  term: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries/name/${term}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function searchCountriesByCapital(
  term: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries/capital/${term}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function searchCountriesByLanguage(
  term: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries/lang/${term}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function searchCountriesByRegion(
  term: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries/region/${term}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function searchCountriesBySubregion(
  term: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries/subregion/${term}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function searchCountriesByCurrency(
  term: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/countries/currency/${term}`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

//**Load world params */
export async function loadWorldCountries(excludeFields?: string[]) {
  /**Lighter version of loadCountries() but not in theory as it pre-processes the same output, lol*/
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/world/countries`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadWorldCapitals(excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/world/capitals`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadWorldCurrencies(excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/world/currencies`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadWorldLanguages(excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/world/languages`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadWorldRegions(excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/world/regions`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

export async function loadWorldSubregions(excludeFields?: string[]) {
  /**Set exclude list to strip off some nasty or sensitive fields*/
  const res = await fetch(`${server}/api/world/subregions`);
  let data = (await res.json())['data'];

  if (excludeFields != null) {
    data = JSON.parse(stripFields(data, excludeFields));
  }
  return data;
}

//**Prepare */

export async function prepareExternalApiCountry(
  rawCountry: any,
  maNchi?: ICountry[],
  maLugha?: ILanguage[]
) {
  /// returns a locally-compliant object

  //^^^^^^^^^^^helpers^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const worldCountries: ICountry[] = maNchi
    ? maNchi
    : await loadWorldCountries();
  const worldLanguages: ILanguage[] = maLugha
    ? maLugha
    : await loadWorldLanguages();
  //^^^^^^^^^^^helpers^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  if (rawCountry == null) {
    return;
  }

  let countryData: ICountryData = {} as ICountryData;
  countryData.name = rawCountry.name?.common;
  countryData.officialName = rawCountry.name?.official;

  //better set these defaults for missing fields^^^^^^^^^^^^
  countryData.capital = null;
  countryData.region = null;
  countryData.subregion = null;
  countryData.callingCode = null;
  countryData.drivingSide = null;
  countryData.numericCode = null;
  countryData.tld = null;

  countryData.independent = false;
  countryData.landlocked = false;
  countryData.unMember = false;
  countryData.postalCode = {} as IPostalCode;
  countryData.coatOfArms = '';
  countryData.capitalLatLng = [];
  //better set these defaults for missing fields^^^^^^^^^^^^

  var nativeNames = rawCountry.name.nativeName; //obj list
  var nativeNameList: INativeName[] = [];
  for (let key in nativeNames) {
    let languageCode = key;
    let officialName = nativeNames[key].official;
    let commonName = nativeNames[key].common;
    let languageName = '';

    for (let i = 0; i < worldLanguages.length; i++) {
      let item = worldLanguages[i];
      if (item.code == languageCode) {
        languageName = item.name;
        break;
      }
    }

    //lets create a cleaner object than what we got from free api, :)
    let my_object: INativeName = {
      languageCode,
      languageName,
      officialName,
      commonName,
    };

    nativeNameList.push(my_object);
  }
  // special addendums =========================================================
  if (rawCountry.translations) {
    var translations = rawCountry.translations; //obj list, focused
    for (let key in translations) {
      if (key == 'por') {
        let languageCode = key;
        let officialName = translations[key].official;
        let commonName = translations[key].common;
        let languageName = '';

        for (let i = 0; i < worldLanguages.length; i++) {
          let item = worldLanguages[i];
          if (item.code == languageCode) {
            languageName = item.name;
            break;
          }
        }

        let my_porto_object: INativeName = {
          languageCode,
          languageName,
          officialName,
          commonName,
        };

        let element = nativeNameList.find((s) => s.languageCode == key);
        if (!element) {
          nativeNameList.push(my_porto_object);
        }
      }
      if (key == 'rus') {
        let languageCode = key;
        let officialName = translations[key].official;
        let commonName = translations[key].common;
        let languageName = '';

        for (let i = 0; i < worldLanguages.length; i++) {
          let item = worldLanguages[i];
          if (item.code == languageCode) {
            languageName = item.name;
            break;
          }
        }

        let my_russki_object: INativeName = {
          languageCode,
          languageName,
          officialName,
          commonName,
        };

        let element = nativeNameList.find((s) => s.languageCode == key);
        if (!element) {
          nativeNameList.push(my_russki_object);
        }
      }
    }
    //todo: why not settifying?? nativeNameList = Array.from(new Set(nativeNameList));
  }
  // special addendums =========================================================
  countryData.nativeNames = nativeNameList;

  if (rawCountry.altSpellings) {
    countryData.altSpellings = rawCountry.altSpellings;
  }
  if (rawCountry.cca2) {
    countryData.iso2Code = rawCountry.cca2;
  }
  if (rawCountry.cca3) {
    countryData.iso3Code = rawCountry.cca3;
  }
  if (rawCountry.ccn3) {
    countryData.numericCode = parseInt(rawCountry.ccn3);
  }
  if (rawCountry.idd && !isEmpty(rawCountry.idd)) {
    countryData.callingCode = rawCountry.idd.root + rawCountry.idd.suffixes[0];
  }
  if (rawCountry.tld) {
    countryData.tld = rawCountry.tld[0];
  }
  if (rawCountry.capital) {
    countryData.capital = rawCountry.capital[0];
  }
  if (rawCountry.region) {
    countryData.region = rawCountry.region;
  }

  if (rawCountry.subregion) {
    countryData.subregion = rawCountry.subregion;
  }

  countryData.population = {
    year: 2020,
    total: rawCountry.population,
    source: 'World Bank',
  }; //2020 at time of googling, todo: look out for world bank next update, :)

  countryData.latlng = rawCountry.latlng;

  if (rawCountry.capitalInfo && !isEmpty(rawCountry.capitalInfo)) {
    countryData.capitalLatLng = rawCountry.capitalInfo.latlng;
  }
  countryData.area = rawCountry.area;
  if (rawCountry.maps && !isEmpty(rawCountry.maps)) {
    countryData.googleMaps = rawCountry.maps.googleMaps;
  }

  var ginis = rawCountry.gini; //obj list
  var ginisList: IGini[] = [];
  for (let key in ginis) {
    let year = key;
    let index = ginis[key];

    let my_object: IGini = {
      year: parseInt(year),
      index: index,
    };

    ginisList.push(my_object);
  }
  countryData.ginis = ginisList;

  var demonyms = rawCountry.demonyms; //obj list
  var demonymsList: IDemonym[] = [];
  for (let key in demonyms) {
    let languageCode = key;
    let languageName = '';
    let m = demonyms[key].m;
    let f = demonyms[key].f;

    for (let i = 0; i < worldLanguages.length; i++) {
      let item = worldLanguages[i];
      if (item.code == languageCode) {
        languageName = item.name;
        break;
      }
    }

    //lets create a cleaner object than what we got from free api, :)
    let my_object: IDemonym = {
      languageCode,
      languageName,
      m,
      f,
    };

    demonymsList.push(my_object);
  }
  countryData.demonyms = demonymsList;

  if (rawCountry.timezones) {
    countryData.timezones = rawCountry.timezones;
  }

  if (rawCountry.continents) {
    countryData.continents = rawCountry.continents;
  }

  var borders = rawCountry.borders; //obj list
  let bordersList: ICountry[] = [];
  for (let key in borders) {
    let iso3Code = borders[key];
    let borderingCountryName = '';

    for (let i = 0; i < worldCountries.length; i++) {
      let item = worldCountries[i];
      if (item.iso3Code == iso3Code) {
        borderingCountryName = item.commonName;
        break;
      }
    }

    //lets create a cleaner object than what we got from free api, :)
    let my_border_country_object: ICountry = {
      iso3Code,
      commonName: borderingCountryName,
    };

    bordersList.push(my_border_country_object);
  }
  countryData.borders = bordersList;

  if (rawCountry.flags) {
    countryData.flag = rawCountry.flags.svg;
  }

  if (rawCountry.coatOfArms && !isEmpty(rawCountry.coatOfArms)) {
    countryData.coatOfArms = rawCountry.coatOfArms.svg;
  }

  var currencies = rawCountry.currencies; //obj list
  var currenciesList: ICurrency[] = [];
  for (let key in currencies) {
    let currencyCode = key;
    let currencySymbol = currencies[key].symbol ? currencies[key].symbol : null;
    let currencyName = currencies[key].name;

    //lets create a cleaner object than what we got from free api, :)
    let my_object: ICurrency = {
      code: currencyCode,
      symbol: currencySymbol,
      name: currencyName,
    };

    currenciesList.push(my_object);
  }
  countryData.currencies = currenciesList;

  var languages = rawCountry.languages; //obj list
  var languagesList: ILanguage[] = [];
  for (let key in languages) {
    let languageCode = key;
    let languageName = languages[key];

    //lets create a cleaner object than what we got from free api, :)
    let my_object: ILanguage = {
      code: languageCode,
      name: languageName,
    };

    languagesList.push(my_object);
  }
  countryData.languages = languagesList;

  if (rawCountry.startOfWeek) {
    countryData.startOfWeek = rawCountry.startOfWeek;
  }

  if (rawCountry.car) {
    countryData.drivingSide = rawCountry.car.side;
  }

  if (rawCountry.postalCode) {
    //some countries aint got this field entry, :/ todo: try all fields
    countryData.postalCode = {
      format: rawCountry.postalCode.format,
      regex: rawCountry.postalCode.regex ? rawCountry.postalCode.regex : '',
    };
  }

  if (rawCountry.independent) {
    countryData.independent = rawCountry.independent;
  }

  if (rawCountry.landlocked) {
    countryData.landlocked = rawCountry.landlocked;
  }
  if (rawCountry.unMember) {
    countryData.unMember = rawCountry.unMember;
  }

  //console.log(`!!country stringified:: ${JSON.stringify(countryData)}`);

  return countryData;
}
export async function prepareExternalApiCountrySimple(rawCountry: any) {
  // returns a locally-compliant object - simple with just country name and an iso code

  if (rawCountry == null) {
    return;
  }

  let countrySimple: ICountry = {} as ICountry;
  countrySimple.commonName = rawCountry.name.common;

  if (rawCountry.cca3) {
    countrySimple.iso3Code = rawCountry.cca3;
  }
  if (rawCountry.cca2) {
    countrySimple.iso2Code = rawCountry.cca2;
  }

  //console.log(`!!simple country stringified:: ${JSON.stringify(countrySimple)}`);

  return countrySimple;
}
