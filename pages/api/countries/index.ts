import type { NextApiRequest, NextApiResponse } from 'next';
import { restCountriesApi } from '../../../config';
import { ICountryDataOrCustomData } from '../../../data/types';

interface IApiRequest extends NextApiRequest {}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
) {
  //todo: save thirdparty data in mongodb && db connect?

  let codes = req.query.codes as string;
  codes = codes.replace(/\s/g, '');

  switch (req.method) {
    case 'GET':
      return codes ? getSelectedCountries() : getCountries();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCountries() {
    const thirdPartyRes = await fetch(`${restCountriesApi}/all`);
    const countries = await thirdPartyRes.json();

    return res.status(200).json({
      message: 'all fields',
      data: countries,
    });
  }
  async function getSelectedCountries() {
    const thirdPartyRes = await fetch(
      `${restCountriesApi}/alpha?codes=${codes}`
    );
    const countries = await thirdPartyRes.json();

    if (thirdPartyRes.status == 200) {
      return res.status(200).json({
        message: 'all fields',
        data: countries,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Ensure your list is comma separated with iso2|iso3|numeric codes`,
      });
    }
  }
}
