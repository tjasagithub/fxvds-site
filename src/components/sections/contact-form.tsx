
"use client"

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/lib/actions';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['contact']['form'];

type Props = {
  dictionary: Dictionary;
  lang: string;
}

const initialState = {
  message: "",
  errors: {},
  isSuccess: false,
};

function SubmitButton({dictionary}: {dictionary: Dictionary}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {dictionary.button}
    </Button>
  );
}

export function ContactForm({ dictionary, lang }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.isSuccess) {
      formRef.current?.reset();
    }
  }, [state.isSuccess]);

  return (
    <form ref={formRef} action={(formData) => {
        formData.append('lang', lang);
        formAction(formData);
    }} className="space-y-4">
      <div className="space-y-4">
        <div>
          <Input type="text" id="name" name="name" placeholder={dictionary.namePlaceholder} required />
          {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
        </div>
        <div>
          <Input type="email" id="email" name="email" placeholder={dictionary.emailPlaceholder} required />
          {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
        </div>
        <div>
          <Textarea id="message" name="message" placeholder={dictionary.messagePlaceholder} required />
          {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
        </div>
        {/* Honeypot field */}
        <div className="absolute w-0 h-0 overflow-hidden">
            <label htmlFor="company">Do not fill this out if you are human:</label>
            <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <SubmitButton dictionary={dictionary} />
       {state.message && !isPending && (
        <div className={cn(
          "flex items-center gap-2 text-sm mt-2",
          state.isSuccess ? "text-green-400" : "text-destructive"
        )}>
          {state.isSuccess ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <p>{state.message}</p>
        </div>
      )}
    </form>
  );
}
