import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import CountryCard from '../../components/cards/country/CountryCard';
import NotFound from '../../components/layouts/not-found/NotFound';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { ICountryData } from '../../data/types';
import {
  loadCountries,
  loadOneCountry,
  prepareExternalApiCountry,
} from '../../lib/get-countries';
import { NextPageWithLayout } from '../page';

export interface ICountryProps {
  countryDataApiResponse: ICountryData;
}

export const getStaticProps: GetStaticProps<ICountryProps, Params> = async (
  context
) => {
  let countryDataApiResponse: ICountryData = {} as ICountryData; //nugget: all fields initialized as null, we check [say, obj._id != null] to prevent ugly renders

  const rawCountry = await loadOneCountry(context.params!.id);
  const preparedCountry = await prepareExternalApiCountry(rawCountry);

  if (preparedCountry != null) {
    countryDataApiResponse = preparedCountry;
  }

  return {
    props: {
      countryDataApiResponse,
    },
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let items: ICountryData[] = [];

  // nugget: set fallback to 'blocking' to serve other all untraversed paths as manually requested by site users
  // nugget: deploy any needed local api routes first

  // quickie: traverse just a few known paths [using their live ids]
  // const knownIdees = ['za', 'ca', 'cn', 'pl'];
  // const paths = Array.from(knownIdees, (_, index) => ({
  //   params: {
  //     id: _,
  //   },
  // }));

  // preferred: all auto-generated paths [$ yarn build fails with errors like unexpected json token, if some needed api endpoints have not been deployed]
  let preparedItems: ICountryData[] = [];
  const rawItems = await loadCountries();

  for (let i = 0; i < rawItems.length; i++) {
    let rawCountry = rawItems[i];
    let preparedCountry = await prepareExternalApiCountry(rawCountry);

    if (preparedCountry != null) {
      preparedItems.push(preparedCountry);
      console.log(
        `#${i}. \n!!getStaticPaths traversing ${
          preparedCountry.iso2Code
        }:: ${JSON.stringify(preparedCountry)}\n`
      );
    }
  }
  items = preparedItems;
  const ids = items.map((item: ICountryData) => item.iso2Code);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

const Country: NextPageWithLayout<ICountryProps> = ({
  countryDataApiResponse,
}) => {
  return countryDataApiResponse.iso2Code == null ? (
    <NotFound customMessage="Item not found" />
  ) : (
    <section className="flex flex-col items-start gap-y-1">
      <CountryCard {...countryDataApiResponse} />
      <p className="mb-2"></p>
    </section>
  );
};

export default Country;

Country.getLayout = (page) => {
  return (
    <PrimaryLayout
      pageTitle={`${page.props['countryDataApiResponse'].name ?? 'Country'}`}
    >
      {page}
    </PrimaryLayout>
  );
};
