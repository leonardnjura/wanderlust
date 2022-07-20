import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ICountryData, ILocationData } from '../../../data/types';
import {
  loadOneCountry,
  prepareExternalApiCountry,
} from '../../../lib/get-countries';
import { getPublicIpData } from '../../../services/location.service';
import Footer from '../../navigation/footer/Footer';
import Header from '../../navigation/header/Header';

export interface IPrimaryLayout {
  children: React.ReactNode;
  justify?: 'items-start' | 'items-center' | 'items-end';
  titleBar: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  justify = 'items-center',
  titleBar: pageTitle,
}) => {
  const defaultLocationData: ILocationData = {} as ILocationData;
  defaultLocationData.country = 'Loading Region..';
  defaultLocationData.continent = '..';

  const defaultCountryData: ICountryData = {} as ICountryData;

  const [locationData, setLocationData] = useState(defaultLocationData);
  const [countryData, setCountryData] = useState(defaultCountryData);

  //**Disable effect data: when running storybook..  rats!~~~~~~~~~~~~~*/
  useEffect(() => {
    const fetchUserLocation = async () => {
      const detectedIpData = await getPublicIpData();
      const rawCountry = await loadOneCountry(detectedIpData.iso2);

      const preparedCountry = await prepareExternalApiCountry(rawCountry);

      setLocationData(detectedIpData);

      if (preparedCountry != null) {
        setCountryData(preparedCountry);
      }
    };
    fetchUserLocation();
  }, []);
  //**Disable effect data: when running storybook.. rats!~~~~~~~~~~~~~*/

  return (
    <>
      <Head>
        <title>{pageTitle} | Wanderlust</title>
      </Head>
      <div
        className={`min-h-screen flex flex-col ${justify}  dark:bg-gray-900 dark:text-white`}
      >
        <Header />
        <main className="px-5">{children}</main>
        <div className="m-auto" />

        <Footer locationData={locationData} countryData={countryData} />
      </div>
    </>
  );
};

export default PrimaryLayout;
