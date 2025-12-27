
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { getDictionary } from './get-dictionary';
import { Locale } from '@/i18n.config';

export async function submitContactForm(prevState: any, formData: FormData) {
  const lang = (formData.get('lang') || 'en') as Locale;
  const dictionary = await getDictionary(lang);
  const validationMessages = dictionary.contact.form.validation;

  const contactSchema = z.object({
    name: z.string().min(2, validationMessages.name),
    email: z.string().email(validationMessages.email),
    message: z.string().min(10, validationMessages.message),
    honeypot: z.string().optional(),
  });

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
      message: validationMessages.error,
      isSuccess: false,
    };
  }

  // Honeypot check for bots
  if (validatedFields.data.honeypot) {
    console.log('Honeypot field filled, likely a bot. Silently succeeding.');
    return {
      message: validationMessages.success,
      errors: undefined,
      isSuccess: true,
    };
  }

  // Check for RESEND_API_KEY
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API Key is missing.');
    return {
      message: validationMessages.notConfigured,
      errors: undefined,
      isSuccess: false,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = validatedFields.data;

    const data = await resend.emails.send({
      from: 'no-reply@fxvds.com',
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

    console.log("Resend success response:", data);
    return { 
        message: validationMessages.success,
        errors: undefined,
        isSuccess: true,
    };

  } catch (error) {
    console.error("Resend error:", error); // Log the detailed error to the server console
    return {
      errors: undefined,
      message: validationMessages.failure,
      isSuccess: false,
    };
  }
}
