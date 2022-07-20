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

  const capital = req.query.term as string;

  switch (req.method) {
    case 'GET':
      return getCountriesByCapital();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCountriesByCapital() {
    let countries: any[] = [];
    let url = `${restCountriesApi}/capital/${capital}`;

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
      console.log(`Ayayai on getCountriesByCapital::${e}`);

      if (loadFallbackData) {
        //regexooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        const searchPattern = new RegExp(capital, 'i');

        let filteredResults = defaultCountriesRaw.filter((result) => {
          if (result.capital) {
            return (
              searchPattern.test(result.capital[0]) ||
              searchPattern.test(result.name.common)
            );
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
