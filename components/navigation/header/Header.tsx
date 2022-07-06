import { faBorderNone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AuthButton from '../../buttons/auth-button/AuthButton';
import Search from '../../utility/search/Search';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  const [buttStatus, setButtStatus] = useState('extinguish');

  /**Use side effects?*/
  useEffect(() => {
    //https://www.w3schools.com/react/react_useeffect.asp
    //WHAT: Side effects are usually handled in three component lifecycle methods – componentDidMount(), componentDidUpdate() and componentWillUnmount().
    //GOAL: When the component is mounted, the buttStatus is changed to 'ignite' after 1 second.
    //SIMPLE SOLUTION: useEffect(() => { setTimeout(() => setButtStatus('ignite'), 1000);})
    //SAD REALITY: This hook is run after every render (mount, updates or unmount) except further configured
    //FIX: useEffect(() => { setTimeout(() => setButtStatus('ignite'), 1000);},[])
    //EXPLANATION: Add second arg, an empty []. Add inside the state items you want to be watched eg [buttStatus, etc]
    setTimeout(() => setButtStatus('ignite'), 1000);
    console.log(`The current button status is ${buttStatus}`);
  }, []);

  return (
    <header
      {...headerProps}
      className={`w-full flex flex-row justify-between items-center ${className}`}
    >
      <div className="space-x-5 m-5 flex flex-row items-center">
        <Link href="/">
          <a
            onClick={() =>
              buttStatus === 'ignite'
                ? setButtStatus('extinguish')
                : setButtStatus('ignite')
            }
          >
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
          <a
            className={`hover:underline hidden sm:inline ${
              buttStatus === 'ignite' ? 'text-blue-700' : 'text-black'
            }`}
          >
            Home
          </a>
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
