import Link from 'next/link';
import { ICountryData } from '../../../data/types';

export type ISearchResult = ICountryData &
  React.ComponentPropsWithoutRef<'div'>;

const SearchResult: React.FC<ISearchResult> = ({
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
  //compo==↓
  className,
  ...divProps
}) => {
  return (
    <div {...divProps} className={`my-page ${className}`}>
      <Link href={googleMaps}>
        <a
          className="cursor:pointer hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{googleMaps}</p>
          <p className="text-blue-600 text-xl">{officialName}</p>
        </a>
      </Link>

      <p className="pb-8">
        <a href={`/country/${iso3Code}`}>{name}</a>
      </p>
    </div>
  );
};

export default SearchResult;
