import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ICountryData, IDemonym, ILocationData } from '../../../data/types';

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {
  locationData: ILocationData;
  countryData: ICountryData;
}

const Footer: React.FC<IFooter> = ({
  className,
  locationData,
  countryData,
  ...footerProps
}) => {
  const [count, setCount] = useState(0);

  const { defaultLocale, locale, locales } = useRouter();
  // console.log(`defaultLocale:: ${defaultLocale}`);
  // console.log(`locale:: ${locale}`);
  // console.log(`locales:: ${locales}`);

  let demonyms: IDemonym[] = [];
  if (Array.isArray(countryData.demonyms)) {
    demonyms = countryData.demonyms;
  }

  return (
    <footer
      {...footerProps}
      className={`w-full p-5 bg-gray-900 dark:bg-gray-800 text-slate-700 dark:text-slate-600 ${className}`}
    >
      <div className="">
        <button onClick={() => setCount(count + 1)}>
          {locationData.country}
        </button>

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
          Smashing the {demonyms[0] !== undefined ? demonyms[0].f : ''} thing{' '}
          <strong>{count}</strong> time(s)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
