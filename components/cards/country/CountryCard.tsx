import { Tooltip } from '@nextui-org/react';
import { server } from '../../../config';
import { ICountryData } from '../../../data/types';
import { thousandsOfCommas, titleCasePlease } from '../../../utils/preops';

const CountryCard: React.FC<ICountryData> = ({
  name,
  officialName,
  nativeNames,
  altSpellings,
  iso2Code,
  iso3Code,
  numericCode,
  callingCode,
  tld,
  capital,
  subregion,
  region,
  population,
  latlng,
  capitalLatLng,
  area,
  googleMaps,
  ginis,
  demonyms,
  timezones,
  continents,
  borders,
  flag,
  coatOfArms,
  currencies,
  languages,
  startOfWeek,
  drivingSide,
  postalCode,
  independent,
  landlocked,
  unMember,
}) => {
  const independentState = independent
    ? 'Independent State'
    : 'Non-Self-Governing Territory?';
  const landlockedState = landlocked ? 'landlocked ' : '';
  const unitedNationMembershipState = unMember
    ? 'a member of the UN'
    : 'has no UN membership';

  return (
    <div className="w-80 sm:w-128 text-sm">
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">
        {name}
      </h2>
      <p className="text-gray-700 text-base mt-4 mb-4">
        <span className="">{officialName} </span>is{' '}
        <a
          href={googleMaps}
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-blue-600 hover:underline"
        >
          a {landlockedState}country in {subregion ? subregion : region}
        </a>
        {capital ? (
          <span>
            . Its capital is <span className="font-semibold">{capital}</span>
          </span>
        ) : (
          <></>
        )}
      </p>

      <div className="p-4 bg-white sm:p-6 dark:bg-gray-900">
        <div className="md:flex md:justify-between">
          <div className="grid grid-cols-4 gap-8 sm:gap-6 sm:grid-cols-5">
            <div className="col-span-4">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Territory Wanderfacts
              </h2>
              <div className="px-6 pt-4  pb-2 mb-5 bg-gradient-to-r from-slate-50 to-slate-50 shadow-sm rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-md">
                <img
                  className="mb-3 w-20 h-auto rounded-sm shadow-sm"
                  src={flag}
                  alt="flag__image"
                />
                <p>
                  Population{' '}
                  {population.total == 0
                    ? '-'
                    : thousandsOfCommas(population.total)}
                </p>
                {currencies[0] !== undefined ? (
                  <p className="mt-4 mb-4">
                    Currency used is the {currencies[0].name} {'('}
                    <span className="text-xs">{currencies[0].code}</span>
                    {')'}
                    {currencies[0].symbol ? (
                      <span className="mt-4 mb-4">
                        <br />
                        Symbol {currencies[0].symbol}
                      </span>
                    ) : (
                      <span>
                        <br />
                        Symbol -
                      </span>
                    )}{' '}
                  </p>
                ) : (
                  <></>
                )}{' '}
                {ginis[0] !== undefined ? (
                  <p className="mt-4 mb-4">
                    Gini index in {name} was reported at {ginis[0].index} in{' '}
                    {ginis[0].year}
                  </p>
                ) : (
                  <></>
                )}
                {demonyms[0] !== undefined ? (
                  <p className="mt-4 mb-4">
                    A person from this country is referred to as {demonyms[0].m}
                  </p>
                ) : (
                  <></>
                )}{' '}
                <p className="pb-4 text-sm">
                  Languages spoken include{' '}
                  {languages?.map((lang, idx) => (
                    <span
                      key={idx}
                      className=" inline-block bg-purple-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {lang.name}
                    </span>
                  ))}
                </p>
              </div>

              <div className="px-6 pt-4  pb-2 mb-5 bg-gradient-to-r from-slate-50 to-slate-50 shadow-sm rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-md">
                <p className="mt-4 mb-4 ">
                  Area{' '}
                  {population.total == 0
                    ? '-'
                    : `${thousandsOfCommas(area)} km²`}
                </p>

                <p className="mt-4 mb-4">
                  Drive on the {drivingSide} if you hire a car in this country
                </p>
                <p className="mt-4 mb-4">
                  {titleCasePlease(startOfWeek)} is the first day of the week
                </p>

                <p className="mt-4 mb-4 ">Calling code {callingCode}</p>

                <p className="mt-4 mb-4 ">Iso2 code {iso2Code}</p>
                <p className="mt-4 mb-4 ">Iso3 code {iso3Code}</p>
                <p className="mt-4 mb-4 ">Numeric code {numericCode}</p>

                <p className="mt-4 mb-4 ">Top-Level Domain {tld}</p>

                {timezones && timezones.length > 0 ? (
                  <p className="text-sm">
                    Timezones{' '}
                    {timezones?.map((tz, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {tz}
                      </span>
                    ))}
                  </p>
                ) : (
                  <></>
                )}

                {continents && continents.length > 0 ? (
                  <p className="text-sm">
                    Continents{' '}
                    {continents?.map((continent, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {continent}
                      </span>
                    ))}
                  </p>
                ) : (
                  <></>
                )}

                <hr className="mt-4 mb-4 " />

                <p className="mt-4 mb-4 ">Translations</p>
                {nativeNames?.map((item, idx) => (
                  <Tooltip
                    key={idx}
                    content={`Officially: ${item.officialName}`}
                    color="invert"
                    placement="bottomStart"
                  >
                    <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                      {item.languageName}? Call it {item.commonName}
                    </span>
                  </Tooltip>
                ))}

                <hr className="mt-4 mb-4 " />
                <p className="mt-4 mb-4 ">
                  {name} is {unitedNationMembershipState}
                </p>
              </div>
              <div className="px-6 pt-4  pb-2 mb-5 bg-gradient-to-r from-white-50 to-white-50 rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-md">
                <p className="mb-8">
                  <img
                    src={flag}
                    className="max-w-full h-auto rounded-md mx-auto shadow-lg"
                    alt=""
                  />
                </p>

                <div className="text-xs text-center">
                  <hr className="mx-16" />
                  <br />
                  <img
                    src={coatOfArms}
                    className="w-6 h-auto rounded-md mx-auto pb-2"
                    alt=""
                  />
                  <a
                    href={
                      independent
                        ? `https://www.quora.com/What-does-a-countrys-independence-really-mean`
                        : `https://www.un.org/dppa/decolonization/en/nsgt`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className={`text-gray-600 ${
                      independent ? 'hover:text-blue-600' : 'hover:text-red-600'
                    }`}
                  >
                    {independentState}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Neighbours
              </h2>

              {borders && borders.length > 0 ? (
                <ul className="text-gray-600 dark:text-gray-400 w-80 sm:w-40">
                  {borders?.map((country, idx) => (
                    <li key={idx} className="mb-4 ml-2">
                      <a
                        href={`${server}/country/${country.iso3Code}`}
                        className="hover:underline text-xs"
                      >
                        {country.commonName}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
