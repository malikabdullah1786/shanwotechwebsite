'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './PlaceholderSection.module.css';

const BlogModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className={styles.modalContent}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onClose}>×</button>
          
          <div className={styles.modalImageWrapper}>
            <Image 
              src={post.image} 
              alt={post.title} 
              fill
              className={styles.modalImage}
              unoptimized={true}
            />
          </div>
          
          <div className={styles.modalBody}>
            <div className={styles.modalDate}>{post.date}</div>
            <h2 className={styles.modalTitle}>{post.title}</h2>
            <div className={styles.modalDivider} />
            
            <div className={styles.fullContent}>
              <p>{post.excerpt}</p>
              <br />
              <p>
                At Shanwo Tech, we believe that the intersection of mathematical precision and creative vision is where the next generation of digital excellence resides. Our engineering team, operating out of our Lahore innovation hub, is dedicated to pushing the boundaries of what is possible in enterprise-grade software development.
              </p>
              <br />
              <p>
                This particular insight delves deep into our proprietary methodologies for ensuring high availability and extreme scalability, even under the most demanding Silicon Valley standards. Stay tuned for more technical whitepapers and cultural reflections as we continue our 2026 journey of excellence.
              </p>
            </div>
            
            <div className={styles.callToActions}>
              <button className={styles.actionBtn} onClick={onClose}>Done Reading</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogModal;
