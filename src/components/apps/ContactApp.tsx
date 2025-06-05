"use client";

import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, type ContactFormState } from '@/app/contact/actions';
import { Send, Loader2 } from 'lucide-react';

const initialState: ContactFormState = {
  message: "",
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Message
    </Button>
  );
}

const ContactApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.isSuccess ? "Success!" : "Error",
        description: state.message,
        variant: state.isSuccess ? "default" : "destructive",
      });
      if (state.isSuccess && formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <header className="p-4 border-b">
        <h1 className="text-xl font-semibold">Get In Touch</h1>
        <p className="text-sm text-muted-foreground">I'd love to hear from you! Drop me a message below.</p>
      </header>
      <ScrollArea className="flex-grow p-6">
        <form action={formAction} ref={formRef} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" required className="mt-1 bg-card/80 dark:bg-card/80"/>
            {state.issues && state.issues.find(issue => issue.toLowerCase().includes('name')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('name'))}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="mt-1 bg-card/80 dark:bg-card/80"/>
             {state.issues && state.issues.find(issue => issue.toLowerCase().includes('email')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('email'))}</p>
            )}
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" type="text" placeholder="Project Inquiry" required className="mt-1 bg-card/80 dark:bg-card/80"/>
            {state.issues && state.issues.find(issue => issue.toLowerCase().includes('subject')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('subject'))}</p>
            )}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required className="mt-1 bg-card/80 dark:bg-card/80"/>
            {state.issues && state.issues.find(issue => issue.toLowerCase().includes('message')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('message'))}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </ScrollArea>
    </div>
  );
};

export default ContactApp;
