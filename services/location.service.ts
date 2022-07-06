import publicIp from 'public-ip';
import { ILocationData } from '../data/types';

const iplocate = require('node-iplocate');

export interface ILocationPkgRaw {
  ip: string;
  country: string;
  country_code: string;
  city: string;
  continent: string;
  latitude: string;
  longitude: string;
  time_zone: string;
  postal_code: string;
  org: string;
  asn: string;
  subdivision: string;
  subdivision2: string;
}

export async function detectUserIp(req?: any) {
  //detect..
  //notes: just detecting with publicIp.v4() is not enough.. locally it works but in production[vercel only?] it returns the us as the region detected; so we try another way to help it
  let detectedIp: string;
  if (req != null) {
    if (req.headers['x-forwarded-for']) {
      detectedIp = (req.headers['x-forwarded-for'] as string).split(',')[0];
    } else if (req.headers['x-real-ip']) {
      detectedIp = req.connection.remoteAddress as string;
    } else {
      detectedIp = req.connection.remoteAddress as string;
    }
    detectedIp =
      detectedIp == '::1' || detectedIp == '127.0.0.1'
        ? await publicIp.v4()
        : detectedIp;
  } else {
    const res = await fetch('https://geolocation-db.com/json/');
    return (await res.json()).IPv4;
  }

  return detectedIp;
}

export async function getPublicIpData(inputIp?: string) {
  const ip = inputIp != null ? inputIp : await detectUserIp();

  const rawInfo: ILocationPkgRaw = await iplocate(ip);

  const cleanedInfo: ILocationData = {
    ip: rawInfo.ip,
    country: rawInfo.country,
    iso2: rawInfo.country_code?.toLowerCase(),
    city: rawInfo.city,
    timezone: rawInfo.time_zone?.toLowerCase(),
    continent: rawInfo.continent,
  };

  // console.log('!!raw ipinfo:: ' + JSON.stringify(rawInfo, null, 2));

  return cleanedInfo;
}
