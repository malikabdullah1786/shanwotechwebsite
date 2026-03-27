'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        delay: (index % 4) * 0.1,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      <Link href={`/services/${service.slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image 
            src={service.image} 
            alt={service.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.overlay} />
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{service.title}</h3>
          <p className={styles.description}>{service.description}</p>
          <div className={styles.arrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
        
        <motion.div 
          className={styles.borderEffect}
          whileHover={{ opacity: 1 }}
        />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
