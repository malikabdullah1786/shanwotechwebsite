'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Magnetic from './Magnetic';
import styles from './Header.module.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Careers', href: '#careers' },
    { name: 'Life at Shanwo', href: '#life' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <motion.div 
          className={styles.logoWrapper}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img 
            src="/logo.png?v=1.1" 
            alt="Shanwo Tech Logo" 
            className={styles.logoImage}
            style={{ width: '45px', height: '45px' }}
          />
        </motion.div>

        <nav className={styles.nav}>
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={styles.navLink}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        <Magnetic>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              href={slug ? `/?service=${slug}#contact` : '/#contact'}
              className={styles.quoteBtn}
            >
              Get a Quote
            </Link>
          </motion.div>
        </Magnetic>
      </div>
    </header>
  );
};

export default Header;
