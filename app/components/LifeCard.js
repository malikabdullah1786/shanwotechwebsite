'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PlaceholderSection.module.css';

const LifeCard = ({ item }) => {
  return (
    <motion.div 
      className={styles.lifeCard}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={item.image} 
          alt={item.caption} 
          width={400} 
          height={300} 
          className={styles.cardImage}
          unoptimized={true}
        />
        <div className={styles.captionOverlay}>
          <p className={styles.caption}>{item.caption}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LifeCard;
