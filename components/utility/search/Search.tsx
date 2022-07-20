import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ICountry } from '../../../data/types';
import { prepareExternalApiCountrySimple } from '../../../lib/get-countries';

const algoliasearch = require('algoliasearch');

const client = algoliasearch(
  process.env.algoliaApplicationId,
  process.env.algoliaApiKey
);
const index = client.initIndex('countries');

export interface ISearch {}

const Search: React.FC<ISearch> = () => {
  const router = useRouter();

  const defaultSearchTerm: string = '';
  const defaultAlgoliaSearchResults: ICountry[] = [];

  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [visible, setVisible] = useState(false);

  let [resetAlgoliaSearchResults, setAlgoliaSearchResults] = useState(
    defaultAlgoliaSearchResults
  );

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  useEffect(() => {
    const checkStatusOfThings = async () => {
      //do search preemptive stuff, :)
    };
    checkStatusOfThings();
  }, []);

  const searchAlgolia = async (searchTerm: string) => {
    //0. add more..
    // var rpt0 = await index.saveObjects(itemsToIndex);
    // console.log(rpt0);

    //1. set searcheable attributes..
    // var rpt1 = index.setSettings({
    //   searchableAttributes: [
    //     'field1',
    //     'field2',
    //   ],
    // });
    // console.log(rpt1);

    //2. search..
    var hits = (await index.search(`${searchTerm}`)).hits;
    console.log(`!!total search results:: ${hits.length}`);

    //did we index raw json on algolia? if yes prepare it*************
    let searchResults: ICountry[] = [];
    const rawItems = hits;

    for (let i = 0; i < rawItems.length; i++) {
      let rawCountry = rawItems[i];
      let preparedCountry = await prepareExternalApiCountrySimple(rawCountry);

      if (preparedCountry != null) {
        searchResults.push(preparedCountry);
      }
    }
    setAlgoliaSearchResults(searchResults);
    //did we index raw json on algolia? if yes prepare it*************
  };

  return (
    <>
      <Link href="#">
        <a className="hover:bg-bl ">
          <FontAwesomeIcon
            icon={faSearch}
            style={{ fontSize: 20 }}
            className="my-link-nav"
            onClick={handler}
          />
        </a>
      </Link>

      <Modal
        //closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        className="m-2"
      >
        <Modal.Header>
          <p className="text-black text-lg font-bold pt-4 ">
            Search<span className="text-gray-400 font-thin">Sh_t</span>
          </p>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-row items-center gap-x-5"
            onSubmit={(e) => {
              e.preventDefault();
              closeHandler();
              console.log(searchTerm);
              console.log(router.asPath);

              router.push(`/results?q=${searchTerm}`);
            }}
          >
            <input
              autoFocus
              type="text"
              className="rounded-full border-2 w-80 sm:w-128 h-10 px-3"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);

                //display inline?

                searchAlgolia(searchTerm);
              }}
            />
            {/* <button type="submit" className="btn-primary rounded-full">
              Search
            </button> */}
          </form>
          <p>
            {resetAlgoliaSearchResults?.map((item, idx) => (
              //   <button key={idx} onClick={() => setSearchTerm(item.iso3Code)}>
              //   {item.commonName}
              // </button>
              <a
                key={idx}
                className="my-popsicle dark:text-slate-400 hover:text-slate-200"
                onClick={() => {
                  closeHandler();
                  router.push(`/country/${item.iso3Code}`);
                }}
              >
                {item.commonName}
              </a>
            ))}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
