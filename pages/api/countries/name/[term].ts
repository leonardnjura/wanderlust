import type { NextApiRequest, NextApiResponse } from 'next';
import { restCountriesApi } from '../../../../config';
import { ICountryDataOrCustomData } from '../../../../data/types';

interface IApiRequest extends NextApiRequest {}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
) {
  //todo: save thirdparty data in mongodb && db connect?

  const capital = req.query.term as string;

  switch (req.method) {
    case 'GET':
      return getCountriesByName();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCountriesByName() {
    let countries;
    const thirdPartyRes = await fetch(`${restCountriesApi}/name/${capital}`);
    if (thirdPartyRes.status == 200) {
      //**This is a search endpoint, so we expect a list */
      countries = await thirdPartyRes.json();
    }

    if (countries) {
      return res.status(200).json({
        message: 'all fields',
        data: countries,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Countries of name term ${capital} not found`,
      });
    }
  }
}
