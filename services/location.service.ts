import publicIp from 'public-ip';
import { restCountriesApi } from '../config';
import { ICountry, ICurrency, ILanguage, ILocationData } from '../data/types';

const iplocate = require('node-iplocate');

export interface ILocationPkgRaw {
  ip: string;
  country: string;
  country_code: string;
  city: string;
  continent: string;
  latitude: string;
  longitude: string;
  time_zone: string;
  postal_code: string;
  org: string;
  asn: string;
  subdivision: string;
  subdivision2: string;
}

export async function detectUserIp(req?: any) {
  //detect..
  //notes: just detecting with publicIp.v4() is not enough.. locally it works but in production[vercel only?] it returns the us as the region detected; so we try another way to help it
  let detectedIp: string;
  if (req != null) {
    if (req.headers['x-forwarded-for']) {
      detectedIp = (req.headers['x-forwarded-for'] as string).split(',')[0];
    } else if (req.headers['x-real-ip']) {
      detectedIp = req.connection.remoteAddress as string;
    } else {
      detectedIp = req.connection.remoteAddress as string;
    }
    detectedIp =
      detectedIp == '::1' || detectedIp == '127.0.0.1'
        ? await publicIp.v4()
        : detectedIp;
  } else {
    const res = await fetch('https://geolocation-db.com/json/');
    return (await res.json()).IPv4;
  }

  return detectedIp;
}

export async function getPublicIpData(inputIp?: string) {
  const ip = inputIp != null ? inputIp : await detectUserIp();

  const rawInfo: ILocationPkgRaw = await iplocate(ip);

  const cleanedInfo: ILocationData = {
    ip: rawInfo.ip,
    country: rawInfo.country,
    iso2: rawInfo.country_code?.toLowerCase(),
    city: rawInfo.city,
    timezone: rawInfo.time_zone?.toLowerCase(),
    continent: rawInfo.continent,
  };

  // console.log('!!raw ipinfo:: ' + JSON.stringify(rawInfo, null, 2));

  return cleanedInfo;
}

export async function getRestCountriesWorldParams(param: string) {
  const thirdPartyRes = await fetch(`${restCountriesApi}/all`);
  const countries = await thirdPartyRes.json();

  let countriesOfTheWorldSimple: any[] = [];

  let capitalsOfTheWorld: any[] = [];
  let currenciesOfTheWorld: any[] = [];
  let languagesOfTheWorld: any[] = [];
  let regionsOfTheWorld: any[] = [];
  let subregionsOfTheWorld: any[] = [];

  for (let i = 0; i < countries.length; i++) {
    let country = countries[i];

    var capitals = country['capital'];
    if (capitals) {
      capitalsOfTheWorld = capitalsOfTheWorld.concat(capitals);
    }
    var currencies = country['currencies']; //obj

    var currenciesList = [];
    for (let key in currencies) {
      var currencyCode = key;
      var currencySymbol = currencies[key].symbol;
      var currencyName = currencies[key].name;
      //lets create a cleaner object than what we got from free api, :)
      let my_object: ICurrency = {
        code: currencyCode,
        name: currencyName,
        symbol: currencySymbol,
      };

      currenciesList.push(my_object);
    }
    currenciesOfTheWorld = currenciesOfTheWorld.concat(currenciesList);

    var languages = country['languages']; //obj
    var languagesList = [];
    for (let key in languages) {
      var languageCode = key;
      var languageName = languages[key];
      //lets create a cleaner object than what we got from free api, :)
      let my_object: ILanguage = { code: languageCode, name: languageName };
      languagesList.push(my_object);
    }
    languagesOfTheWorld = languagesOfTheWorld.concat(languagesList);

    var region = country['region'];
    if (region) {
      regionsOfTheWorld.push(region);
    }
    var subregion = country['subregion'];
    if (subregion) {
      subregionsOfTheWorld.push(subregion);
    }

    // Lets re-create countries in a simple list for easy-on-the-eye endpoint that will double to decode iso3code elsewhere ********
    var countryNameOfficial = country['name']['official'];
    var countryNameCommon = country['name']['common'];
    var iso3Code = country['cca3'];

    let my_simple_country_object: ICountry = {
      iso3Code: iso3Code,
      commonName: countryNameCommon,
    };
    countriesOfTheWorldSimple.push(my_simple_country_object);
  }
  capitalsOfTheWorld = Array.from(new Set(capitalsOfTheWorld));
  currenciesOfTheWorld = Array.from(new Set(currenciesOfTheWorld));
  languagesOfTheWorld = Array.from(new Set(languagesOfTheWorld));
  regionsOfTheWorld = Array.from(new Set(regionsOfTheWorld));
  subregionsOfTheWorld = Array.from(new Set(subregionsOfTheWorld));

  var ans;
  switch (param) {
    case 'countries':
      ans = countriesOfTheWorldSimple;
      break;
    case 'capitals':
      ans = capitalsOfTheWorld;
      break;
    case 'currencies':
      ans = currenciesOfTheWorld;
      break;
    case 'languages':
      ans = languagesOfTheWorld;
      break;
    case 'regions':
      ans = regionsOfTheWorld;
      break;
    case 'subregions':
      ans = subregionsOfTheWorld;
      break;
    default:
      ans = 'param unknown';
  }

  return ans;
}
