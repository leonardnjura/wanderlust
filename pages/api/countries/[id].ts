import type { NextApiRequest, NextApiResponse } from 'next';
import { restCountriesApi } from '../../../config';
import { ICountryDataOrCustomData } from '../../../data/types';

interface IApiRequest extends NextApiRequest {}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
) {
  const id = req.query.id as string;

  //todo: save thirdparty data in mongodb && db connect?

  switch (req.method) {
    case 'GET':
      return getOne(id);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getOne(id: string) {
    //todo: check if valid iso2/iso3/numericCode.. yes all allowed!

    let country;
    const thirdPartyRes = await fetch(`${restCountriesApi}/alpha/${id}`);
    if (thirdPartyRes.status == 200) {
      country = (await thirdPartyRes.json())[0];
    }

    if (country) {
      // stub: enable to catch some preparation errors per iso2
      // const preparedCountry = await prepareExternalApiCountry(country);
      // console.log(`!!rusty country cleaned in my api:: ${preparedCountry}`);

      return res.status(200).json({ message: 'all fields', data: country });
    } else {
      return res.status(404).json({
        success: false,
        message: `Country of code ${id} not found`,
      });
    }
  }
}
