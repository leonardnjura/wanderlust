import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export interface ISearch {}

const Search: React.FC<ISearch> = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  return (
    <>
      <Link href="#">
        <a className="hover:bg-bl ">
          <FontAwesomeIcon
            icon={faSearch}
            style={{ fontSize: 20 }}
            className=" text-black hover:text-blue-700"
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
        className=""
      >
        <Modal.Header>
          <p className="text-black text-lg font-bold pt-4">
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
              className="rounded-full border-2 w-96 sm:w-128 h-10 px-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <button type="submit" className="btn-primary rounded-full">
              Search
            </button> */}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
