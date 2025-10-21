
'use client';

import { forms } from '@/lib/forms-data';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Table } from 'lucide-react';

export default function FormsListPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-glow-primary">Available Forms</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Here is a list of all the forms that have been created. Click on any form to view and fill it out.
        </p>
      </div>

      {forms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.map(form => (
            <Card key={form.id} className="group border-primary/20 hover:border-primary transition-all duration-300 hover:box-glow-primary flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-2xl font-bold group-hover:text-accent transition-colors">{form.title}</CardTitle>
                    <FileText className="w-8 h-8 text-primary/50 group-hover:text-accent transition-colors" />
                </div>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Link href={`/forms/${form.id}`}>
                    Open Form <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`/form-builder/responses/${form.id}`}>
                    View Responses <Table className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold">No Forms Yet</h2>
            <p className="text-muted-foreground mt-2">Go to the form builder to create your first form.</p>
            <Button asChild className="mt-6">
                <Link href="/form-builder">Create Form</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
