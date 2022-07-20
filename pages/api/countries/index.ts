import type { NextApiRequest, NextApiResponse } from 'next';
import { loadFallbackData, restCountriesApi } from '../../../config';
import defaultCountriesClean from '../../../data/search-database-clean.json';
import defaultCountriesRaw from '../../../data/search-database-raw.json';
import {
  ICountry,
  ICountryData,
  ICountryDataOrCustomData,
  ILanguage,
} from '../../../data/types';
import {
  loadWorldCountries,
  loadWorldLanguages,
  prepareExternalApiCountry,
} from '../../../lib/get-countries';
import { noSpacesPlease, simpleErrorPlease } from '../../../utils/preops';

interface IApiRequest extends NextApiRequest {}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
) {
  //todo: save thirdparty data in mongodb && db connect?

  //params after ? in endpoint url
  let codes = req.query.codes as string;
  let clean = req.query.clean as string;

  if (codes) {
    codes = noSpacesPlease(codes);
  }

  if (clean) {
    clean = noSpacesPlease(clean); //bool to prepare raw object into a cleaner local one
  }

  switch (req.method) {
    case 'GET':
      return getCountries();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCountries() {
    let countries: any[] = [];
    const prepareData = clean && clean == 'true';
    let url = `${restCountriesApi}/all`;

    if (codes) {
      url = `${restCountriesApi}/alpha?codes=${codes}`;
    }

    try {
      const thirdPartyRes = await fetch(`${url}`);

      countries = await thirdPartyRes.json();

      if (thirdPartyRes.status == 200) {
        if (prepareData) {
          let preparedItems: ICountryData[] = [];
          const rawItems = countries;

          //^^^^^^^^^^^run once preferred for if we gonna loop such helpers^^^^^^^^^^^^^^^^^^^^^^^
          const worldCountries: ICountry[] = await loadWorldCountries();
          const worldLanguages: ILanguage[] = await loadWorldLanguages();
          //^^^^^^^^^^^run once preferred for if we gonna loop such helpers^^^^^^^^^^^^^^^^^^^^^^^

          for (let i = 0; i < rawItems.length; i++) {
            let rawCountry = rawItems[i];
            let preparedCountry = await prepareExternalApiCountry(
              rawCountry,
              worldCountries,
              worldLanguages
            );

            if (preparedCountry != null) {
              preparedItems.push(preparedCountry);
            }
          }

          countries = preparedItems;
        }

        return res.status(200).json({
          message: 'all fields',
          data: countries,
        });
      } else {
        return res.status(thirdPartyRes.status).json({
          success: false,
          message: `Something bad happened`,
        });
      }
    } catch (e) {
      console.log(`Ayayai on fetching all countries::${e}`);

      if (loadFallbackData && !codes) {
        return res.status(200).json({
          success: false,
          message: `Something bad happened [status ${500}], default data loaded`,
          data: prepareData ? defaultCountriesClean : defaultCountriesRaw,
        });
      }

      return res.status(500).json({
        success: false,
        message: `Server says urgh`,
        verbose: `${simpleErrorPlease(e)}`,
      });
    }
  }
}
