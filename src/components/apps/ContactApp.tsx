
"use client";

import React, { useEffect } from 'react';
import { useActionState } from 'react'; // Updated from useFormState
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, type ContactFormState } from '@/app/contact/actions';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Added import for cn

const initialState: ContactFormState = {
  message: "",
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useActionState(async () => {}, null); // useActionState requires an async action, using a no-op here to get pending state
  // User CSS: .submit-btn
  return (
    <Button type="submit" disabled={pending} className="w-full submit-btn bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Message
    </Button>
  );
}

const ContactApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.isSuccess ? "Success!" : "Error",
        description: state.message,
        variant: state.isSuccess ? "default" : "destructive",
        // className: state.isSuccess ? "notification success" : "notification destructive" // For custom notification style
      });
      if (state.isSuccess && formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state, toast]);

  // User CSS: .contact-form, .form-group, input/textarea styles
  // input/textarea: width: 100%; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; background-color: rgba(255,255,255,0.05); color: white;
  // This maps to: dark:border-white/10 dark:bg-black/5 dark:text-white. Light theme will use defaults or need explicit light version.
  const inputStyles = "mt-1 bg-white/5 dark:bg-black/10 border-black/10 dark:border-white/10 text-foreground placeholder:text-muted-foreground rounded focus:border-primary";

  return (
    <div className="h-full flex flex-col bg-transparent text-foreground"> {/* Window itself has padding now */}
      <header className="p-0 mb-4">
        <h1 className="text-xl font-semibold">Get In Touch</h1>
        <p className="text-sm text-muted-foreground">I'd love to hear from you! Drop me a message below.</p>
      </header>
      <ScrollArea className="flex-grow pr-1">
        {/* User CSS: grid grid-cols-2 gap-15px */}
        <form action={formAction} ref={formRef} className="space-y-4 contact-form md:grid md:grid-cols-2 md:gap-x-[15px] md:gap-y-0 md:space-y-0">
          <div className="form-group md:mb-[15px]"> {/* Matched class for potential global styles */}
            <Label htmlFor="name" className="block mb-1 text-sm">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" required className={inputStyles}/>
            {state.issues && state.issues.find(issue => issue.toLowerCase().includes('name')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('name'))}</p>
            )}
          </div>
          <div className="form-group md:mb-[15px]">
            <Label htmlFor="email" className="block mb-1 text-sm">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className={inputStyles}/>
             {state.issues && state.issues.find(issue => issue.toLowerCase().includes('email')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('email'))}</p>
            )}
          </div>
          <div className="form-group full-width md:col-span-2 md:mb-[15px]">
            <Label htmlFor="subject" className="block mb-1 text-sm">Subject</Label>
            <Input id="subject" name="subject" type="text" placeholder="Project Inquiry" required className={inputStyles}/>
            {state.issues && state.issues.find(issue => issue.toLowerCase().includes('subject')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('subject'))}</p>
            )}
          </div>
          <div className="form-group full-width md:col-span-2 md:mb-[15px]">
            <Label htmlFor="message" className="block mb-1 text-sm">Message</Label>
            <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required className={cn(inputStyles, "min-h-[100px]")}/>
            {state.issues && state.issues.find(issue => issue.toLowerCase().includes('message')) && (
              <p className="text-xs text-destructive mt-1">{state.issues.find(issue => issue.toLowerCase().includes('message'))}</p>
            )}
          </div>
          <div className="full-width md:col-span-2">
            <SubmitButton />
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default ContactApp;
