'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { sendEmail } from '../actions';
import { servicesData } from '../data/services';
import styles from './Contact.module.css';

const schema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  service: z.string().min(1, { message: "Please select a service" }),
  description: z.string().min(10, { message: "Please provide a brief description (min 10 chars)" }),
});

const Contact = () => {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get('service');
  const [status, setStatus] = React.useState('idle');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      service: selectedService || ''
    }
  });

  useEffect(() => {
    if (selectedService) {
      setValue('service', selectedService);
    }
  }, [selectedService, setValue]);

  const onSubmit = async (data) => {
    setStatus('sending');
    const result = await sendEmail(data);
    
    if (result.success) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
      console.error(result.error);
    }
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.info}>
          <motion.h2 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            GET IN TOUCH
          </motion.h2>
          <motion.h3 
            className={styles.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Start Your <br /><span>Next Big Project?</span>
          </motion.h3>
          <p className={styles.description}>
            Whether you have a fully drafted PRD or just a spark of an idea, 
            let's collaborate to build something exceptional.
          </p>
          
          <div className={styles.contactDetails}>
            <div className={styles.detail}>
              <strong>Email:</strong> <a href="mailto:shanwo.tech@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>shanwo.tech@gmail.com</a>
            </div>
            <div className={styles.detail}>
              <strong>Location:</strong> Lahore, Pakistan
            </div>
          </div>
        </div>

        <motion.div 
          className={styles.formWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {status === 'success' ? (
            <div className={styles.successMessage}>
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successText}>
                Thank you for reaching out. Our team will review your inquiry and get back to you shortly.
              </p>
              <button 
                onClick={() => setStatus('idle')} 
                className={styles.submitBtn}
                style={{ marginTop: '30px', padding: '12px 30px', fontSize: '1rem' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              {status === 'error' && (
                <div className={styles.errorFeedback}>
                  Oops! Something went wrong. Please try again or email us directly at shanwo.tech@gmail.com
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                    {...register('name')} 
                    type="text" 
                    placeholder="John Doe" 
                    className={errors.name ? styles.errorInput : ''}
                  />
                  {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    {...register('email')} 
                    type="email" 
                    placeholder="john@example.com"
                    className={errors.email ? styles.errorInput : ''}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="service">Service Required</label>
                  <select {...register('service')} className={errors.service ? styles.errorInput : ''}>
                    <option value="">Select a service</option>
                    {servicesData.map(service => (
                      <option key={service.slug} value={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && <span className={styles.errorMessage}>{errors.service.message}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="description">Project Description</label>
                  <textarea 
                    {...register('description')} 
                    placeholder="Tell us about your project goals..."
                    className={errors.description ? styles.errorInput : ''}
                  />
                  {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
                </div>

                <button type="submit" disabled={status === 'sending'} className={styles.submitBtn}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </>
          )}
          <div className={styles.formDecoration} />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
