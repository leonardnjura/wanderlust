import type { NextApiRequest, NextApiResponse } from 'next';
import { ICountryDataOrCustomData } from '../../../data/types';
import { getRestCountriesWorldParams } from '../../../services/location.service';

interface IApiRequest extends NextApiRequest {}

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<ICountryDataOrCustomData>
) {
  //todo: save thirdparty data in mongodb && db connect?

  switch (req.method) {
    case 'GET':
      return getSubregionsOfTheWorld();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getSubregionsOfTheWorld() {
    const data = await getRestCountriesWorldParams('subregions');

    return res.status(200).json({
      message: 'all fields',
      data,
    });
  }
}
