'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendApplication } from '../actions';
import styles from './PlaceholderSection.module.css';

const CareerFormModal = ({ job, onClose }) => {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    experience: '',
    position: job.title,
    jobType: 'Full-time',
    availableHours: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const result = await sendApplication(formData);
    if (result.success) {
      setStatus('success');
      setTimeout(onClose, 2000);
    } else {
      setStatus('error');
    }
  };

  return (
    <motion.div 
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className={styles.modalContent}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>Apply for {job.title}</h2>
          <p className={styles.careerDesc}>Join our elite engineering pod and build the future.</p>
          <div className={styles.modalDivider} />

          {status === 'success' ? (
            <div className={styles.successMessage}>
              <h3 style={{ color: 'var(--color-accent)' }}>Application Sent!</h3>
              <p>We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.applicationForm}>
              <div className={styles.formGrid}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <select 
                  required 
                  value={formData.jobType}
                  onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                  className={styles.formSelect}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
              <div className={styles.formGrid}>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Hours per week" 
                  required 
                  min="1"
                  max="168"
                  value={formData.availableHours}
                  onChange={(e) => setFormData({...formData, availableHours: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="url" 
                  placeholder="LinkedIn Profile URL" 
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="url" 
                  placeholder="Portfolio/GitHub URL" 
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <textarea 
                  placeholder="Tell us about your 2026 technical vision or key projects..." 
                  rows="4" 
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={styles.actionBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Transmitting...' : 'Submit Application'}
              </button>
              
              {status === 'error' && <p style={{ color: 'red', marginTop: '10px' }}>Failed to send. Please try again.</p>}
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CareerFormModal;
