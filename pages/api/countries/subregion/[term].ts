import type { NextApiRequest, NextApiResponse } from 'next';
import { loadFallbackData, restCountriesApi } from '../../../../config';
import { ICountryDataOrCustomData } from '../../../../data/types';
import { simpleErrorPlease } from '../../../../utils/preops';

import defaultCountriesRaw from '../../../../data/search-database-raw.json';

interface IApiRequest extends NextApiRequest {}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
) {
  //todo: save thirdparty data in mongodb && db connect?

  const subregion = req.query.term as string;

  switch (req.method) {
    case 'GET':
      return getCountriesBySubregion();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCountriesBySubregion() {
    let countries: any[] = [];
    let url = `${restCountriesApi}/subregion/${subregion}`;

    try {
      const thirdPartyRes = await fetch(`${url}`);

      countries = await thirdPartyRes.json();

      if (thirdPartyRes.status == 200) {
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
      console.log(`Ayayai on getCountriesBySubregion::${e}`);

      if (loadFallbackData) {
        //regexooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        const searchPattern = new RegExp(subregion, 'i');

        let filteredResults = defaultCountriesRaw.filter((result) => {
          if (result.subregion) {
            return searchPattern.test(result.subregion);
          }
        });

        //regexooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        return res.status(200).json({
          success: false,
          message: `Something bad happened [status ${500}], default data loaded`,
          data: filteredResults,
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
