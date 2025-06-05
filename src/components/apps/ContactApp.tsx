
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // Kept subject field as it was in original app
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);
  
    try {
      const response = await fetch('https://formspree.io/f/xanepngl', { // Your Formspree endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Recommended by Formspree
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (formRef.current) {
            formRef.current.reset();
        }
        setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5s
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors?.map((err: any) => err.message).join(', ') || 'Submission failed. Please try again.';
        setSubmitError(errorMessage);
        console.error('Submission failed:', errorData);
      }
    } catch (error) {
      setSubmitError('An error occurred while submitting the form. Please check your connection and try again.');
      console.error('Error submitting form', error);
    }
  
    setIsSubmitting(false);
  };

  const inputStyles = "mt-1 bg-card border-border text-foreground placeholder:text-muted-foreground rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary";

  return (
    <div className="h-full flex flex-col bg-transparent text-foreground">
      <header className="p-0 mb-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
            Let's Connect
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Have a project in mind or want to discuss opportunities? Reach out and let's create something amazing together.
        </p>
      </header>
      <ScrollArea className="flex-grow pr-1">
        <div className="max-w-lg mx-auto p-1">
          {submitSuccess && (
            <div
              className="mb-4 p-3 bg-green-100 dark:bg-green-700/30 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-200 rounded-md text-sm"
            >
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {submitError && (
            <div
              className="mb-4 p-3 bg-red-100 dark:bg-red-700/30 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-200 rounded-md text-sm"
            >
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Full Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className={inputStyles}
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john.doe@example.com"
                className={inputStyles}
              />
            </div>
             <div>
              <Label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                Subject
              </Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project Inquiry"
                className={inputStyles}
              />
            </div>

            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                className={cn(inputStyles, "min-h-[120px]")}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactApp;
