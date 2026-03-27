'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PlaceholderSection.module.css';

const BlogCard = ({ post, onReadMore }) => {
  return (
    <motion.div 
      className={styles.blogCard}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={post.image} 
          alt={post.title} 
          width={400} 
          height={250} 
          className={styles.cardImage}
          unoptimized={true}
        />
        <div className={styles.dateBadge}>{post.date}</div>
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{post.title}</h4>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <span className={styles.readMore} onClick={() => onReadMore(post)}>Read Insight →</span>
      </div>
    </motion.div>
  );
};

export default BlogCard;
