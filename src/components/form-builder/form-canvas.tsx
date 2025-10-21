'use client';

import { useDrop } from 'react-dnd';
import { ItemTypes, type FormField } from '@/lib/forms-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import DroppedField from './dropped-field';

export default function FormCanvas() {
  const [fields, setFields] = useState<FormField[]>([]);
  const { toast } = useToast();

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
    // This is where you would handle saving the form structure,
    // e.g., sending it to a server or storing it in local storage.
    console.log('Form Fields:', fields);
    toast({
      title: 'Form Saved (Mock)',
      description: 'Form structure logged to the console. Backend integration needed.',
    });
  };

  const updateField = (updatedField: FormField) => {
    setFields(prev => prev.map(f => f.id === updatedField.id ? updatedField : f));
  };

  const removeField = (fieldId: string) => {
    setFields(prev => prev.filter(f => f.id !== fieldId));
  };

  return (
    <Card className="h-full min-h-[600px] flex flex-col border-accent/30">
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
  );
}
