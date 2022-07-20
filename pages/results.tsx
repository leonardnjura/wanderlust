import { GetServerSideProps } from 'next';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SearchResult from '../components/utility/search-result/SearchResult';
import { ICountryData } from '../data/types';
import { loadSearchResults } from '../lib/get-search-results';
import { NextPageWithLayout } from './page';

export interface IResultsProps {
  searchDataApiResponse: ICountryData[];
  q: string;
}

export const getServerSideProps: GetServerSideProps<IResultsProps> = async ({
  query,
}) => {
  let searchDataApiResponse: ICountryData[] = [];

  const q = query.q as string;

  if (q && q.length > 0) {
    //adDed notes::
    //https://nextjs.org/docs/basic-features/data-fetching/get-static-props
    //todo: move to lib for sharing hence performance if getStaticProps() is ideal
    //in the api routes, you can then just load()
    //https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#getserversideprops-or-api-routes
    //Call api directly in getServerSideProps() if user-specific or private data like dashboard, where we need no seo
    //Parts of the page can be pre-rendered using Static Generation. You can show loading states for missing data
    //todo: use caching headers (Cache-Control) inside getServerSideProps to cache dynamic responses

    const res = await loadSearchResults(q);
    const data: ICountryData = res;

    if (Array.isArray(data)) {
      searchDataApiResponse = data;
    }
  }

  return {
    props: {
      searchDataApiResponse,
      q,
    },
  };
};

const Results: NextPageWithLayout<IResultsProps> = ({
  searchDataApiResponse,
  q,
}) => {
  const hasResults = searchDataApiResponse.length > 0;
  const plural =
    searchDataApiResponse.length > 1 || searchDataApiResponse.length == 0
      ? 's'
      : '';

  return (
    <>
      {hasResults ? (
        <div>
          <p className="my-text-high-contrast">
            Showing {searchDataApiResponse.length} result{plural} for:
          </p>
          <h2 className="my-text-high-contrast-lg font-bold  pb-4">{q}</h2>

          <div className={`flex flex-col space-y-8 pb-5`}>
            {searchDataApiResponse.map((result, idx) => {
              return <SearchResult key={idx} {...result} />;
            })}
          </div>
          <hr className="my-rule pb-2" />
          <p className="my-text-high-contrast text-right pb-8">
            {searchDataApiResponse.length} result{plural}
          </p>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </>
  );
};

export default Results;

Results.getLayout = (page) => {
  return (
    //todo: inject results count
    <PrimaryLayout justify="items-center" titleBar={`Search Results`}>
      {page}
    </PrimaryLayout>
  );
};
