import { GetServerSideProps } from 'next';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SearchResult from '../components/utility/search-result/SearchResult';
import { ISearchData } from '../data/types';
import { loadSearchResults } from '../lib/get-search-results';
import { NextPageWithLayout } from './page';

export interface IResultsProps {
  searchDataApiResponse: ISearchData[];
}

export const getServerSideProps: GetServerSideProps<IResultsProps> = async ({
  query,
}) => {
  let searchDataApiResponse: ISearchData[] = [];

  const { q } = query;

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
    const data: ISearchData = res;

    if (Array.isArray(data)) {
      searchDataApiResponse = data;
    }
  }

  return {
    props: {
      searchDataApiResponse: searchDataApiResponse,
    },
  };
};

const Results: NextPageWithLayout<IResultsProps> = ({
  searchDataApiResponse,
}) => {
  const hasResults = searchDataApiResponse.length > 0;

  return (
    <>
      <section className="flex flex-col items-center gap-y-5">
        {hasResults ? (
          <div className={`flex flex-col space-y-8 pb-5`}>
            {searchDataApiResponse.map((result, idx) => {
              return <SearchResult key={idx} {...result} />;
            })}
            <p>{searchDataApiResponse.length} result(s)</p>
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </section>
    </>
  );
};

export default Results;

Results.getLayout = (page) => {
  return (
    //todo: inject results count
    <PrimaryLayout justify="items-start" pageTitle={`Search Results`}>
      {page}
    </PrimaryLayout>
  );
};
