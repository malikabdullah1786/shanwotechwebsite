'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush, FaServer } from 'react-icons/fa';
import styles from './Services.module.css';

const services = [
  {
    title: 'Web Development',
    description: 'High-performance, scalable web applications built with modern frameworks and antique precision.',
    icon: <FaCode />,
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric interfaces that combine premium aesthetics with seamless functionality.',
    icon: <FaPaintBrush />,
  },
  {
    title: 'Scalable Systems',
    description: 'Deep architecture solutions designed to handle growth and complex data requirements.',
    icon: <FaServer />,
  },
];

const Services = () => {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.subtitle}>OUR EXPERTISE</h2>
          <h3 className={styles.title}>Premium Solutions for Modern Brands</h3>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                borderColor: 'var(--color-accent)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div className={styles.icon}>{service.icon}</div>
              <h4 className={styles.cardTitle}>{service.title}</h4>
              <p className={styles.cardDescription}>{service.description}</p>
              <div className={styles.borderEffect} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
