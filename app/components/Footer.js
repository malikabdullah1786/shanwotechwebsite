import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.column}>
            <div className={styles.logoWrapper}>
              <img 
                src="/logo.png?v=1.1" 
                alt="Shanwo Tech" 
                className={styles.logoImage}
                style={{ width: '45px', height: '45px' }}
              />
            </div>
            <p className={styles.tagline}>
              Digital transformation with technical superiority and antique elegance.
            </p>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/in/shanwo-tech-6a748a3a5/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://www.facebook.com/profile.php?id=61586054711422" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com/shanwotech/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.links}>
              <li><a href="#hero">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Case Studies</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Services</h4>
            <ul className={styles.links}>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">UI/UX Design</a></li>
              <li><a href="#services">Mobile Apps</a></li>
              <li><a href="#services">Scalable Systems</a></li>
            </ul>
          </div>

          {/* Information */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Information</h4>
            <div className={styles.infoItem}>
              <a href="https://wa.me/923094561786" target="_blank" rel="noopener noreferrer" className={styles.phoneLink}>
                <FaWhatsapp className={`${styles.icon} ${styles.waIcon}`} />
                <span>+92 309 4561786</span>
              </a>
            </div>
            <div style={{ display: 'none' }} className={styles.infoItem}>
              {/* Secondary number hidden if not needed, or just replaced */}
            </div>
            <div className={styles.infoItem}>
              <a href="tel:+923065439634" className={styles.phoneLink}>
                <FaPhoneAlt className={styles.icon} />
                <span>+92 306 5439634</span>
              </a>
            </div>
            <div className={styles.infoItem}>
              <FaEnvelope className={styles.icon} />
              <a href="mailto:shanwo.tech@gmail.com" className={styles.emailLink}>
                shanwo.tech@gmail.com
              </a>
            </div>
            <div className={styles.infoItem}>
              <a href="https://maps.google.com/?q=Lahore,Pakistan" target="_blank" rel="noopener noreferrer" className={styles.addressLink}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>Lahore, Pakistan</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Shanwo Tech. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
