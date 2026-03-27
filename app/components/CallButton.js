'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import styles from './CallButton.module.css';

const CallButton = () => {
  const phoneNumber = '+923094561786';
  const callUrl = `tel:${phoneNumber}`;

  return (
    <motion.a
      href={callUrl}
      className={styles.wrapper}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <motion.div
        className={styles.pulse}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className={styles.button}>
        <FaPhoneAlt className={styles.icon} />
      </div>
    </motion.a>
  );
};

export default CallButton;
