'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PlaceholderSection.module.css';
import BlogCard from './BlogCard';
import LifeCard from './LifeCard';
import BlogModal from './BlogModal';
import CareerCard from './CareerCard';
import CareerFormModal from './CareerFormModal';

const PlaceholderSection = ({ title, id, type = "default", items = [], category = "default" }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <section id={id} className={`${styles.section} ${styles[type]}`}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.content}
        >
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.divider} />
          
          {items.length > 0 ? (
            <div className={styles.grid}>
              {items.map((item, index) => (
                category === 'blog' ? (
                  <BlogCard key={index} post={item} onReadMore={(post) => setSelectedBlog(post)} />
                ) : category === 'life' ? (
                  <LifeCard key={index} item={item} />
                ) : category === 'career' ? (
                  <CareerCard key={index} job={item} onApply={(job) => setSelectedJob(job)} />
                ) : (
                  <div key={index} className={styles.genericCard}>
                    <h4 className={styles.genericTitle}>{item.title}</h4>
                    <p className={styles.genericDesc}>{item.description}</p>
                  </div>
                )
              ))}
            </div>
          ) : (
            <>
              <p className={styles.tagline}>Innovation in Progress</p>
              <p className={styles.description}>
                We're currently documenting our latest insights and growth. Stay tuned for deeper technical dives and cultural highlights.
              </p>
              <div className={styles.skeletonGrid}>
                {[1, 2, 3].map(i => (
                  <div key={i} className={styles.skeletonCard} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedBlog && (
          <BlogModal 
            post={selectedBlog} 
            onClose={() => setSelectedBlog(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedJob && (
          <CareerFormModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PlaceholderSection;
