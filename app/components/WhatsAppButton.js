'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const phoneNumber = '923065439634';
  const message = encodeURIComponent('Hi Shanwo Tech, I am interested in starting a project with you.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.wrapper}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className={styles.pulse}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className={styles.button}>
        <FaWhatsapp className={styles.icon} />
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
