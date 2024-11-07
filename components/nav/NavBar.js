'use client';

import { useState, useEffect } from 'react';
import Logo from '@/assets/Logo';
import hamburger from '../../assets/icon-hamburger.svg';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.nav animate={{ y: [-100, 0] }} className="navbar">
      <Logo color="#596EA6" />
      {isMobile && (
        <Link href={'?navModal=true'}>
          <Image src={hamburger} alt="ham" />
        </Link>
      )}
      {!isMobile && (
        <ul className='navbar__navList'>
          <li>
            <Link className='navbar__navList__item' href={'/Login'}>Login</Link>
          </li>
        </ul>
      )}
    </motion.nav>
  );
}
