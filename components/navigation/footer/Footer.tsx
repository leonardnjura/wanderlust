import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPublicIpData } from '../../../services/location.service';

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ className, ...footerProps }) => {
  const [count, setCount] = useState(0);
  const [regionName, setRegionName] = useState('Loading region..');

  useEffect(() => {
    const fetchUserLocation = async () => {
      const locationData = await getPublicIpData();

      setRegionName(locationData.country);
    };
    fetchUserLocation();
  }, []);

  const { defaultLocale, locale, locales } = useRouter();
  // console.log(`defaultLocale:: ${defaultLocale}`);
  // console.log(`locale:: ${locale}`);
  // console.log(`locales:: ${locales}`);

  return (
    <footer
      {...footerProps}
      className={`w-full p-5 bg-gray-900 text-slate-700 ${className}`}
    >
      <div className="">
        <button onClick={() => setCount(count + 1)}>{regionName}</button>

        <Tooltip
          content={
            <Link href="/" locale={locale === 'en' ? 'pt-BR' : 'en'}>
              <a>
                <p className="text-xs">
                  Language Options:{' '}
                  <span className=" hover:text-blue-700">
                    {locale === 'en' ? 'Portugués' : 'English'}
                  </span>
                </p>
              </a>
            </Link>
          }
          placement="right"
        >
          <FontAwesomeIcon
            icon={faLanguage}
            style={{ fontSize: 20 }}
            className=" "
          />
        </Tooltip>
      </div>

      <div>
        <p className={`${count > 0 ? 'visible' : 'invisible'} text-xs`}>
          You clicked {regionName} <strong>{count} </strong>time(s)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
