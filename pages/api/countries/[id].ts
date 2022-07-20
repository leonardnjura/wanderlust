import type { NextApiRequest, NextApiResponse } from 'next';
import { loadFallbackData, restCountriesApi } from '../../../config';
import { ICountryDataOrCustomData } from '../../../data/types';
import { prepareExternalApiCountry } from '../../../lib/get-countries';
import { noSpacesPlease, simpleErrorPlease } from '../../../utils/preops';

import defaultCountriesClean from '../../../data/search-database-clean.json';
import defaultCountriesRaw from '../../../data/search-database-raw.json';

interface IApiRequest extends NextApiRequest {}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
) {
  const id = req.query.id as string;

  //todo: save thirdparty data in mongodb && db connect?

  //params after ? in endpoint url
  let clean = req.query.clean as string;

  if (clean) {
    clean = noSpacesPlease(clean); //bool to prepare raw object into a cleaner local one
  }

  switch (req.method) {
    case 'GET':
      return getOne(id);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getOne(id: string) {
    //todo: check if valid iso2/iso3/numericCode.. yes all allowed!

    let country: any = {};
    const prepareData = clean && clean == 'true';
    const url = `${restCountriesApi}/alpha/${id}`;

    try {
      const thirdPartyRes = await fetch(`${url}`);

      country = (await thirdPartyRes.json())[0]; //note: third party res is list for singular items

      if (thirdPartyRes.status == 200) {
        if (prepareData) {
          const rawCountry = country;
          const preparedCountry = await prepareExternalApiCountry(rawCountry);
          if (preparedCountry != null) {
            country = preparedCountry;
          }
        }

        return res.status(200).json({ message: 'all fields', data: country });
      } else {
        return res.status(thirdPartyRes.status).json({
          success: false,
          message: `Something bad happened`,
        });
      }
    } catch (e) {
      console.log(`Ayayai on fetching one country::${e}`);

      if (loadFallbackData) {
        //regexooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        const searchPattern = new RegExp(id, 'i');

        let filteredResults;

        if (prepareData) {
          filteredResults = defaultCountriesClean.filter((result) => {
            return (
              searchPattern.test(result.iso2Code) ||
              searchPattern.test(result.iso3Code)
            );
          });
        } else {
          filteredResults = defaultCountriesRaw.filter((result) => {
            return (
              searchPattern.test(result.cca2) || searchPattern.test(result.cca3)
            );
          });
        }

        //regexooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        return res.status(200).json({
          success: false,
          message: `Something bad happened [status ${500}], default data loaded`,
          data: filteredResults[0],
        });
      }

      return res.status(500).json({
        success: false,
        message: `Server says urgh on ${id}`,
        verbose: `${simpleErrorPlease(e)}`,
      });
    }
  }
}
