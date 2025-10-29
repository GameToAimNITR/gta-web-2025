'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formFields, ItemTypes, type FormField } from '@/lib/forms-data';
import DraggableFormElement from './draggable-form-element';

export default function FormElementSidebar() {
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle>Form Elements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {formFields.map((field) => (
          <DraggableFormElement key={field.type} field={field} />
        ))}
      </CardContent>
    </Card>
  );
}
