import { useEffect, useState } from 'react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { ICountry, ICountryData } from '../data/types';
import {
  loadOneCountry,
  prepareExternalApiCountry,
} from '../lib/get-countries';
import { getPublicIpData } from '../services/location.service';
import { NextPageWithLayout } from './page';

export interface IAboutProps {
  worldCountries: ICountry[];
  featuredCountry: ICountryData;
}

const About: NextPageWithLayout<IAboutProps> = () => {
  const defaultCountryData: ICountryData = {} as ICountryData;

  const [countryData, setCountryData] = useState(defaultCountryData);

  //**Disable effect data: when running storybook..  rats!~~~~~~~~~~~~~*/
  useEffect(() => {
    const fetchUserLocation = async () => {
      const detectedIpData = await getPublicIpData();
      const rawCountry = await loadOneCountry(detectedIpData.iso2);

      const preparedCountry = await prepareExternalApiCountry(rawCountry);

      console.log(
        `!!detected country hook is ${JSON.stringify(preparedCountry)}`
      );

      if (preparedCountry != null) {
        setCountryData(preparedCountry);
      }
    };
    fetchUserLocation();
  }, []);
  //**Disable effect data: when running storybook.. rats!~~~~~~~~~~~~~*/

  const ok2RenderRegionData = countryData.iso2Code != null;
  return (
    <section className="my-page">
      <h2 className="my-page-title">About</h2>
      <p>
        This site is dedicated to all people who find joy wandering about the
        world. The ordinary surfer sees what he sees, the tourist sees what he
        has come to see.
      </p>

      {ok2RenderRegionData ? (
        <p className="">
          Start by exploring&nbsp;
          <a href={`/country/${countryData.iso2Code}`} className="my-link">{`${
            countryData.subregion ? countryData.subregion : countryData.region
          }`}</a>
          .
        </p>
      ) : (
        <></>
      )}

      {ok2RenderRegionData ? (
        <div className="flex flex-row pt-4 pb-2">
          {countryData.languages?.map((item, idx) => (
            <span key={idx} className="my-popsicle">
              #{item.name}
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default About;

About.getLayout = (page) => {
  return <PrimaryLayout titleBar="About">{page}</PrimaryLayout>;
};
