'use client';

import { useDrag } from 'react-dnd';
import type { FormField } from '@/lib/forms-data';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DraggableFormElementProps {
  field: FormField;
}

export default function DraggableFormElement({ field }: DraggableFormElementProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: field.type,
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="cursor-move hover:bg-card/80 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg">{field.label}</CardTitle>
          <CardDescription>{field.type}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
