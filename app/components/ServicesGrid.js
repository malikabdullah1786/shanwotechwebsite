'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/services';
import ServiceCard from './ServiceCard';
import styles from './ServicesGrid.module.css';

const ServicesGrid = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show only 2 rows initially (8 items for 4 col layout, 6 for 3 col, etc.)
  // We'll use a standard 8 items as the "View Less" limit.
  const displayedServices = isExpanded ? servicesData : servicesData.slice(0, 8);

  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>Our <span>Specializations</span></h2>
          <p className={styles.subtitle}>Engineering Excellence Across the Full Digital Spectrum</p>
        </motion.div>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </AnimatePresence>
        </div>

        <div className={styles.controls}>
          <button 
            className={styles.viewMoreBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'View Less' : 'View More Services'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
