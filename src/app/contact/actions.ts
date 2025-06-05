
"use server";

// This file is no longer used for the primary contact form submission
// as it's now handled client-side via Formspree in ContactApp.tsx.
// You can keep this file for other potential server actions related to contacts
// or remove it if it's completely unused.

// Example of what might have been here (now removed):
/*
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
  // ... old logic ...
  return { message: "This server action is no longer active.", isSuccess: false };
}
*/

// If you have no other server actions for contacts, this file can be deleted.
// For now, I'm leaving it with comments indicating its status.
// If you need new server actions related to contacts in the future, you can add them here.
