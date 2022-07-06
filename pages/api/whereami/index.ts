// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import publicIp from 'public-ip';
import { ILocationDataOrCustomData } from '../../../data/types';
import {
  detectUserIp,
  getPublicIpData,
} from '../../../services/location.service';

interface IApiRequest extends NextApiRequest {
  body: {
    ip: string;
  };
}

export type IResponseData = ILocationDataOrCustomData;

export default function handler(
  req: IApiRequest,
  res: NextApiResponse<IResponseData>
) {
  const {
    body: { ip },
  } = req;

  switch (req.method) {
    case 'GET':
      return getIpInfo();
    case 'POST':
      return getIpInfo();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getIpInfo() {
    let ipToQuery: any;
    if (req.method === 'POST' && ip && ip.length > 0) {
      //todo: validate ip string better
      ipToQuery = ip;
    } else {
      ipToQuery = await detectUserIp(req);
    }

    const info = await getPublicIpData(ipToQuery);

    return res.status(200).json({
      message: 'ip info',
      data: info,
    });
  }
}
