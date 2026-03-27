'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './Portfolio.module.css';

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={styles.projectCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={project.image} 
          alt={project.title} 
          width={600} 
          height={400} 
          className={styles.projectImage}
          priority
          unoptimized={true}
        />
        <div className={styles.overlay}>
          <div className={styles.badge}>{project.year}</div>
        </div>
      </div>
      
      <div className={styles.details} style={{ transform: 'translateZ(50px)' }}>
        <h4 className={styles.projectTitle}>{project.title}</h4>
        <p className={styles.projectCategory}>{project.category}</p>
        <p className={styles.projectContext}>{project.context}</p>
        
        <div className={styles.highlight}>
          <strong>Key Highlight:</strong> {project.highlight}
        </div>
        
        <div className={styles.testimonial}>
          <blockquote>"{project.testimonial.text}"</blockquote>
          <cite>— {project.testimonial.author}</cite>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: 'Partcify.com',
      category: 'Automobile E-Commerce',
      year: '2023',
      context: 'A dedicated e-commerce platform for Bilal Gunj’s complex auto parts market, connecting vendors to customers seamlessly.',
      highlight: 'Advanced database architecture for deep filtering by Make, Model, and Year.',
      image: '/images/partcify_laptop.png',
      testimonial: {
        text: 'Shanwo Tech transformed our physical shop into a digital giant. The filtering system is flawless.',
        author: 'Lead Vendor, Bilal Gunj'
      }
    },
    {
      title: 'Tarzify.com',
      category: 'Multi-Vendor Marketplace',
      year: '2022',
      context: 'A لاہور-based multi-vendor mall with a scalable B2B2C architecture where independent vendors manage digital stores.',
      highlight: 'High-scale multi-vendor management system with robust vendor dashboards.',
      image: '/images/tarzify_laptop.png',
      testimonial: {
        text: 'The best marketplace development team in Lahore. Our vendors love the ease of management.',
        author: 'Founder, Tarzify'
      }
    }
  ];

  return (
    <section className={styles.portfolio}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.subtitle}>PORTFOLIO</h2>
          <h3 className={styles.title}>Proof of Mathematical Precision</h3>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
