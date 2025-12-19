'use server';

import { config } from 'dotenv';
config();

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  honeypot: z.string().optional(),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  // Validate form fields
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    honeypot: formData.get('company'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors and try again.',
      isSuccess: false,
    };
  }

  // Honeypot check for bots
  if (validatedFields.data.honeypot) {
    console.log('Honeypot field filled, likely a bot. Silently succeeding.');
    return {
      message: 'Thank you for your message! We will get back to you soon.',
      errors: undefined,
      isSuccess: true,
    };
  }

  // Check for RESEND_API_KEY
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API Key is missing.');
    return {
      message: 'Email service is not configured. Please contact support.',
      errors: undefined,
      isSuccess: false,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = validatedFields.data;

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Safe, default "from" address
      to: 'info@fxvds.com',
      reply_to: email, // Set the user's email as the reply-to address
      subject: `New message from FXVDS contact form: ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br/>
        <p><em>Timestamp: ${new Date().toISOString()}</em></p>
      `,
    });

    return { 
        message: 'Message sent. We’ll get back to you shortly.',
        errors: undefined,
        isSuccess: true,
    };

  } catch (error) {
    console.error("Resend error:", error); // Log the detailed error to the server console
    return {
      errors: undefined,
      message: 'Message failed to send. Please try again or email info@fxvds.com.',
      isSuccess: false,
    };
  }
}
