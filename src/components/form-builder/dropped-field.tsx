'use client';

import { useState } from 'react';
import type { FormField } from '@/lib/forms-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Save, PlusCircle, XCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface DroppedFieldProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onRemove: (id: string) => void;
}

export default function DroppedField({ field, onUpdate, onRemove }: DroppedFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableField, setEditableField] = useState(field);

  const handleSave = () => {
    onUpdate(editableField);
    setIsEditing(false);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(editableField.options || [])];
    newOptions[index] = value;
    setEditableField(prev => ({...prev, options: newOptions}));
  };

  const addOption = () => {
    setEditableField(prev => ({...prev, options: [...(prev.options || []), `Option ${ (prev.options?.length || 0) + 1}`]}));
  };

  const removeOption = (index: number) => {
    const newOptions = [...(editableField.options || [])];
    newOptions.splice(index, 1);
    setEditableField(prev => ({...prev, options: newOptions}));
  };


  return (
    <Card className="bg-background/50 relative group">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
            <h4 className="font-semibold">{field.label}</h4>
            <p className="text-xs text-muted-foreground">{field.type}</p>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4" />
            </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onRemove(field.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      {isEditing && (
        <CardContent className="space-y-4 border-t border-border pt-4">
            <div>
                <Label htmlFor={`label-${field.id}`}>Label</Label>
                <Input id={`label-${field.id}`} value={editableField.label} onChange={e => setEditableField({...editableField, label: e.target.value})} />
            </div>
             <div>
                <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
                <Input id={`placeholder-${field.id}`} value={editableField.placeholder} onChange={e => setEditableField({...editableField, placeholder: e.target.value})} />
            </div>
            <div className="flex items-center space-x-2">
                <Switch id={`required-${field.id}`} checked={editableField.required} onCheckedChange={checked => setEditableField({...editableField, required: checked})} />
                <Label htmlFor={`required-${field.id}`}>Required</Label>
            </div>
            
            {(field.type === 'radio' || field.type === 'select') && (
              <div className="space-y-2">
                <Label>Options</Label>
                {editableField.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                    <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeOption(index)}>
                        <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addOption}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Option
                </Button>
              </div>
            )}

            <div className="flex justify-end">
                <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Save</Button>
            </div>
        </CardContent>
      )}
    </Card>
  );
}
