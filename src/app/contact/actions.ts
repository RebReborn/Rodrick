"use server";

import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  isSuccess?: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const validatedFields = ContactFormSchema.safeParse({
    name,
    email,
    subject,
    message,
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: "Validation failed. Please check your input.",
      fields: { name, email, subject, message },
      issues,
      isSuccess: false,
    };
  }

  // Simulate form submission (e.g., send email, save to database)
  console.log("Contact form submitted:", validatedFields.data);
  
  // In a real app, you would integrate with an email service or backend API here.
  // For now, we'll just simulate success.
  await new Promise(resolve => setTimeout(resolve, 1000));


  return {
    message: "Thank you for your message! I'll get back to you soon.",
    isSuccess: true,
  };
}
