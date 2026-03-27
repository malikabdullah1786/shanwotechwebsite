'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero3D from './Hero3D';
import styles from './Hero.module.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          style={{ y: y1, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className={styles.subtitle}>EST. 2021</h2>
            <h1 className={styles.title}>
              Digital Transformation <br />
              <span>with Technical Superiority</span>
            </h1>
            <p className={styles.description}>
              Modern innovation meets antique precision. We specialize in building 
              high-performance digital solutions that stand the test of time.
            </p>
            
            <div className={styles.trustIndicators}>
              <div className={styles.indicator}>
                <span className={styles.number}>3+</span>
                <span className={styles.label}>Years of Excellence</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.indicator}>
                <span className={styles.number}>10+</span>
                <span className={styles.label}>Happy Clients</span>
              </div>
            </div>
 
            <motion.a 
              href="#contact"
              className={styles.cta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.visual}
          style={{ y: y2 }}
        >
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
