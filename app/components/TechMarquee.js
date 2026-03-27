'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechMarquee.module.css';

const TechMarquee = () => {
  const techs = [
    "Next.js", "Java Spring Boot", ".NET Core", "C#", "Three.js", "Framer Motion", "Nodemailer", "React", "Scalable SQL", "UI/UX", "B2B2C", "E-Commerce", "Portfolio"
  ];

  return (
    <div className={styles.marqueeContainer}>
      <motion.div 
        className={styles.marquee}
        animate={{ x: [0, -1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...techs, ...techs].map((tech, i) => (
          <span key={i} className={styles.techItem}>{tech}</span>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;
