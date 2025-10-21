
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { forms, submissions, type Form } from '@/lib/forms-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FormResponsesPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId as string;

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('formBuilderAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.replace('/form-builder/login');
    }
  }, [router]);

  const form = forms.find(f => f.id === formId);
  const formSubmissions = submissions.filter(s => s.formId === formId);

  if (!form) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-destructive">Form not found</h1>
      </div>
    );
  }

  const headers = form.fields.map(field => field.label);

  return (
    <div className="container mx-auto py-12">
      <Card className="border-accent/30 box-glow-accent">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-glow-primary">Responses for: {form.title}</CardTitle>
          <CardDescription>
            A total of {formSubmissions.length} response(s) have been recorded for this form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formSubmissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submitted At</TableHead>
                  {headers.map(header => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {formSubmissions.map((submission, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {submission.submittedAt.toLocaleString()}
                    </TableCell>
                    {form.fields.map(field => (
                      <TableCell key={field.id}>
                        {String(submission.data[field.id] ?? '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
              <h2 className="text-2xl font-bold">No Responses Yet</h2>
              <p className="text-muted-foreground mt-2">
                Share your form to start collecting responses.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
