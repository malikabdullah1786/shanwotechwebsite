'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PlaceholderSection.module.css';

const CareerCard = ({ job, onApply }) => {
  return (
    <motion.div 
      className={styles.careerCard}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={job.image} 
          alt={job.title} 
          width={400} 
          height={250} 
          className={styles.cardImage}
          unoptimized={true}
        />
        <motion.div 
          className={styles.applyBadge} 
          onClick={() => onApply(job)}
          animate={{
            boxShadow: [
              "0 4px 15px rgba(197, 160, 89, 0.3)",
              "0 4px 25px rgba(197, 160, 89, 0.6)",
              "0 4px 15px rgba(197, 160, 89, 0.3)"
            ],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Apply Now
        </motion.div>
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.careerTitle}>{job.title}</h4>
        <p className={styles.careerDesc}>{job.description}</p>
        <div className={styles.careerFooter}>
          <span className={styles.jobType}>Full-Time / Part-Time</span>
          <span className={styles.jobLocation}>Lahore / Remote</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCard;
