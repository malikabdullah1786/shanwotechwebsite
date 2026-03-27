'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData) {
  const { name, email, service, description } = formData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // 1. Send notification to Shanwo Tech
    await transporter.sendMail({
      from: `"Shanwo Tech Portfolio" <${process.env.GMAIL_USER}>`,
      to: 'shanwo.tech@gmail.com',
      replyTo: email,
      subject: `New Project Inquiry: ${service} from ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #C5A059; padding: 20px;">
          <h2 style="color: #002366; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">New Lead from Shanwo Tech Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service Requested:</strong> ${service}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Project Description:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 4px;">${description}</p>
          <footer style="margin-top: 20px; font-size: 0.8rem; color: #777;">
            Sent from Shanwo Tech Agency Portfolio Website | WhatsApp: +92 309 4561786
          </footer>
        </div>
      `,
    });

    // 2. Send Auto-Reply to the Form Filler
    await transporter.sendMail({
      from: `"Shanwo Tech Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting Shanwo Tech!`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #C5A059; padding: 20px; background-color: #fcfcfc;">
          <h2 style="color: #002366; font-family: 'Playfair Display', serif;">Hi ${name},</h2>
          <p style="font-size: 1.1rem; line-height: 1.6;">
            Thank you for reaching out to <strong>Shanwo Tech</strong>. We've received your inquiry regarding <strong>${service}</strong>.
          </p>
          <p style="font-size: 1rem; line-height: 1.6;">
            Our team is reviewing your project details, and we will contact you as soon as possible to discuss how we can bring your vision to life.
          </p>
          <div style="margin: 30px 0; padding: 15px; border-left: 4px solid #C5A059; background: #fff;">
            <p style="margin: 0; font-style: italic; color: #555;">
              "Digital Transformation with Technical Superiority."
            </p>
          </div>
          <p style="font-size: 1rem;">Best regards,<br /><strong>The Shanwo Tech Team</strong></p>
          <footer style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 0.8rem; color: #999; text-align: center;">
            Lahore, Pakistan | <a href="https://wa.me/923094561786" style="color: #25D366; text-decoration: none;">Contact on WhatsApp (+92 309 4561786)</a>
          </footer>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendApplication(formData) {
  const { name, email, phone, position, linkedin, portfolio, experience, jobType, availableHours } = formData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // 1. Send Application to Shanwo Tech
    await transporter.sendMail({
      from: `"Shanwo Careers" <${process.env.GMAIL_USER}>`,
      to: 'shanwo.tech@gmail.com',
      replyTo: email,
      subject: `New Job Application: ${position} from ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #C5A059; padding: 20px;">
          <h2 style="color: #002366; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">New Job Application</h2>
          <p><strong>Applicant Name:</strong> ${name}</p>
          <p><strong>Applying for:</strong> ${position}</p>
          <p><strong>Job Type:</strong> ${jobType}</p>
          <p><strong>Weekly Availability:</strong> ${availableHours} hours</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>LinkedIn:</strong> ${linkedin || 'Not provided'}</p>
          <p><strong>Portfolio:</strong> ${portfolio || 'Not provided'}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Experience/Bio:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 4px;">${experience}</p>
          <footer style="margin-top: 20px; font-size: 0.8rem; color: #777;">
            Sent from Shanwo Tech Careers Portal | WhatsApp: +92 309 4561786
          </footer>
        </div>
      `,
    });

    // 2. Confirmation to Applicant
    await transporter.sendMail({
      from: `"Shanwo Careers" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We've received your application - ${position}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #C5A059; padding: 20px;">
          <h2 style="color: #002366;">Hi ${name},</h2>
          <p>Thank you for applying for the <strong>${position}</strong> position at Shanwo Tech!</p>
          <p>Our recruitment team will review your profile and get back to you if your skills align with our current needs.</p>
          <p>Good luck!</p>
          <footer style="margin-top: 20px; font-size: 0.8rem; color: #777;">
            The Shanwo Tech Recruitment Team | WhatsApp: +92 309 4561786
          </footer>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Application Error:', error);
    return { success: false, error: error.message };
  }
}
