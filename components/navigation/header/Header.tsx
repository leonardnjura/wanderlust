import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthButton from '../../buttons/auth-button/AuthButton';
import Search from '../../utility/search/Search';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  return (
    <header
      {...headerProps}
      className={`w-full flex flex-row justify-between items-center ${className}`}
    >
      <div className="space-x-5 m-5 flex flex-row items-center">
        <Link href="/">
          <a>
            <Image
              src="/nextjs-logo.png"
              alt="Logo"
              width="60"
              height="60"
              priority
            />
          </a>
        </Link>

        <Link href="/">
          <a className="hover:underline hidden sm:inline">Home</a>
        </Link>
        <Link href="/about">
          <a className="hover:underline hidden sm:inline">About</a>
        </Link>
      </div>

      <div className="space-x-5 m-5">
        <Link href="#">
          <a className="">
            <FontAwesomeIcon
              icon={faBorderNone}
              style={{ fontSize: 20 }}
              className=" text-black hover:text-blue-700"
            />
          </a>
        </Link>
        <Search />

        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
