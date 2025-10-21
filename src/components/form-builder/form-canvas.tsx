'use client';

import { useDrop } from 'react-dnd';
import { ItemTypes, type FormField, forms } from '@/lib/forms-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import DroppedField from './dropped-field';
import { useRouter } from 'next/navigation';

export default function FormCanvas() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState('My New Form');
  const [formDescription, setFormDescription] = useState('A description for my new form.');
  const { toast } = useToast();
  const router = useRouter();

  const [, drop] = useDrop(() => ({
    accept: Object.values(ItemTypes),
    drop: (item: FormField, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      setFields((prevFields) => [...prevFields, { ...item, id: `${item.type}-${Date.now()}` }]);
    },
  }));

  const handleSaveForm = () => {
    if (!formTitle.trim()) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Form title is required.',
      });
      return;
    }
    if (fields.length === 0) {
        toast({
            variant: 'destructive',
            title: 'Validation Error',
            description: 'Cannot save an empty form. Please add at least one field.',
        });
        return;
    }


    const newForm = {
        id: formTitle.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
        title: formTitle,
        description: formDescription,
        fields: fields,
    };

    // In a real app, you would send this to a server.
    // Here, we're mocking it by pushing to an in-memory array.
    forms.push(newForm);

    console.log('Form Saved (Mock):', newForm);
    toast({
      title: 'Form Saved (Mock)',
      description: 'Your form has been saved for this session.',
    });

    // Redirect to the forms list page
    router.push('/forms');
  };

  const updateField = (updatedField: FormField) => {
    setFields(prev => prev.map(f => f.id === updatedField.id ? updatedField : f));
  };

  const removeField = (fieldId: string) => {
    setFields(prev => prev.filter(f => f.id !== fieldId));
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle>Form Details</CardTitle>
          <CardDescription>Give your form a title and description.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-title">Form Title</Label>
            <Input 
              id="form-title" 
              value={formTitle} 
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g., Event Registration"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-description">Form Description</Label>
            <Textarea 
              id="form-description" 
              value={formDescription} 
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="e.g., Sign up for our annual conference"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="h-full min-h-[500px] flex flex-col border-accent/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Form Preview</CardTitle>
          <Button onClick={handleSaveForm}>Save Form</Button>
        </CardHeader>
        <CardContent
          ref={drop}
          className="flex-grow bg-card/30 rounded-b-lg p-6 space-y-4 border-2 border-dashed border-border"
        >
          {fields.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Drop form elements here to build your form</p>
            </div>
          ) : (
            fields.map((field) => (
              <DroppedField 
                key={field.id} 
                field={field} 
                onUpdate={updateField}
                onRemove={removeField}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}