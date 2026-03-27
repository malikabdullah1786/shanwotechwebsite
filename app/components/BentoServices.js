'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './BentoServices.module.css';

const BentoServices = () => {
  const services = [
    {
      title: "Full-Stack Web Development",
      description: "Enterprise-grade web applications engineered with Next.js, Java Spring Boot, and .NET Core for peak performance and scalability.",
      size: "large",
      icon: "🌐",
      tags: ["Next.js", "Java", ".NET", "C#", "JavaScript", "HTML/CSS"]
    },
    {
      title: "UI/UX Design",
      description: "Antique elegance meets modern usability for professional, high-fidelity interfaces.",
      size: "small",
      icon: "🎨"
    },
    {
      title: "App Development",
      description: "Premium mobile and desktop applications built for performance and platform-native experience.",
      size: "small",
      icon: "📱"
    },
    {
      title: "SEO & Growth",
      description: "Data-driven SEO strategies to boost your online visibility and drive high-ticket leads.",
      size: "small",
      icon: "📈"
    },
    {
      title: "Scalable Systems",
      description: "Robust B2B2C solutions designed for high-load marketplaces and complex filtering.",
      size: "small",
      icon: "⚙️"
    },
    {
      title: "Cybersecurity",
      description: "Web security specialist ensuring your digital assets are protected against modern threats.",
      size: "medium",
      icon: "🛡️",
      highlight: true
    },
    {
      title: "Automation",
      description: "Automate daily workflows using n8n, Python, and Make.com to save time and resources.",
      size: "small",
      icon: "🤖"
    },
    {
      title: "Cloud & DevSecOps",
      description: "Architecting resilient AWS and Azure infrastructures with automated CI/CD pipelines and zero-trust security.",
      size: "small",
      icon: "☁️"
    },
    {
      title: "Digital Transformation",
      description: "Move to paperless work with seamless digital systems and optimized workflows.",
      size: "medium",
      icon: "📄"
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>Innovative <span>Specializations</span></h2>
          <p className={styles.subtitleTitle}>Technical Superiority Across the Full Spectrum</p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`${styles.card} ${styles[service.size]} ${service.highlight ? styles.highlightCard : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              whileHover={{ 
                y: -10, 
                rotateX: 5, 
                rotateY: -5,
                transition: { duration: 0.3 } 
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={styles.cardHeader} style={{ transform: "translateZ(30px)" }}>
                <div className={styles.iconBox}>{service.icon}</div>
                {service.highlight && <span className={styles.specialistBadge}>Specialist</span>}
              </div>
              <div className={styles.cardBody} style={{ transform: "translateZ(20px)" }}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.descriptionText}>{service.description}</p>
                {service.tags && (
                  <div className={styles.tags}>
                    {service.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                  </div>
                )}
              </div>
              {service.size === 'large' && (
                <div className={styles.bgDecoration}>
                  <div className={styles.circle1} />
                  <div className={styles.circle2} />
                  <div className={styles.gridOverlay} />
                </div>
              )}
              <div className={styles.glowEffect} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoServices;
