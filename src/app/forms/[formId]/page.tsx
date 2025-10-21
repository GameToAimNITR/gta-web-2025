'use client';

import { useParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { forms, type FormField as FormFieldType } from '@/lib/forms-data';
import { submitForm, type FormState } from '@/app/actions';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function RenderField({ field }: { field: FormFieldType }) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input id={field.id} name={field.id} type={field.type} placeholder={field.placeholder} required={field.required} />
        </div>
      );
    case 'textarea':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Textarea id={field.id} name={field.id} placeholder={field.placeholder} required={field.required} />
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox id={field.id} name={field.id} />
          <Label htmlFor={field.id}>{field.label}</Label>
        </div>
      );
    case 'radio':
      return (
        <div className="space-y-2">
          <Label>{field.label}</Label>
          <RadioGroup id={field.id} name={field.id}>
            {field.options?.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    case 'select':
        return (
            <div className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Select name={field.id}>
                    <SelectTrigger id={field.id}>
                        <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {field.options?.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )
    default:
      return null;
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full font-bold" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : 'Submit'}
    </Button>
  );
}


export default function FormPage() {
  const params = useParams();
  const formId = params.formId as string;
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const form = forms.find(f => f.id === formId);

  const initialState: FormState = { message: '', status: 'idle' };
  const [state, formAction] = useFormState(submitForm, initialState);

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Form Submitted!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: "Submission Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  if (!form) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-destructive">Form not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
        <Card className="max-w-2xl mx-auto border-accent/30 box-glow-accent">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-glow-primary">{form.title}</CardTitle>
                <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={formAction} className="space-y-6">
                    <input type="hidden" name="formId" value={formId} />
                    {form.fields.map(field => (
                        <RenderField key={field.id} field={field} />
                    ))}
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
