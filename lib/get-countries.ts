import { server } from '../config';
import { stripFields } from '../data/my-schemas';

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

export async function loadPassedCountries(
  commaSeparatedStr: string,
  excludeFields?: string[]
) {
  /**Set exclude list to strip off some nasty or sensitive fields
   * Api does cleaning of params, don't repeat here.
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
