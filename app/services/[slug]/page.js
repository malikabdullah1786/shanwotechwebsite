'use client';

import React, { use } from 'react';
import { servicesData } from '../../data/services';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ServiceDetail.module.css';

export default function ServicePage({ params }) {
  // Use React.use() to unwrap the params promise in a Client Component
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <main className={styles.main}>
        <Header />
        <div className={styles.notFound}>
          <h1>Service Not Found</h1>
          <p>The requested service "{slug}" could not be located.</p>
          <Link href="/#services" className={styles.backBtn}>Return to Services</Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Get 3 recommended services (different from current one)
  const recommended = servicesData
    .filter(s => s.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <main className={styles.main}>
      <CustomCursor />
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Link href="/#services" className={styles.backLink}>
              ← Back to Services
            </Link>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {service.title}
            </motion.h1>
            <p className={styles.descriptionText}>{service.description}</p>
            
            <div className={styles.detailsBox}>
              <h3>Technical Overview</h3>
              <p>{service.details}</p>
              
              {service.features && (
                <div className={styles.features}>
                  <h4>Key Specializations:</h4>
                  <ul>
                    {service.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <Link href={`/?service=${service.slug}#contact`} className={styles.ctaBtn}>
              Apply for this Service
            </Link>
          </div>
          
          <div className={styles.imageBox}>
            <Image 
              src={service.image} 
              alt={service.title}
              width={800}
              height={800}
              className={styles.detailImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* Recommended Services Section */}
      <section className={styles.recommended}>
        <div className={styles.recContainer}>
          <h2 className={styles.recTitle}>Recommended <span>Services</span></h2>
          <div className={styles.recGrid}>
            {recommended.map((rec) => (
              <Link key={rec.slug} href={`/services/${rec.slug}`} className={styles.recCard}>
                <div className={styles.recImageWrapper}>
                  <Image src={rec.image} alt={rec.title} fill className={styles.recImage} />
                  <div className={styles.recOverlay} />
                </div>
                <div className={styles.recContent}>
                  <h3>{rec.title}</h3>
                  <p>{rec.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
