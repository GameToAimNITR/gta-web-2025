'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// IMPORTANT: This is a simple, insecure password check on the client-side.
// For a real application, you must implement proper authentication.
// You can replace this with a call to a server-side authentication endpoint.
const CORRECT_PASSWORD = 'password'; // TODO: Change this to a secure password, ideally from environment variables.

export default function FormBuilderLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setError('');
      // Store a token or flag in session/local storage to indicate authentication
      sessionStorage.setItem('formBuilderAuthenticated', 'true');
      toast({
        title: 'Access Granted',
        description: 'Welcome to the Form Builder.',
      });
      router.push('/form-builder');
    } else {
      setError('Incorrect password. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'The password you entered is incorrect.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md mx-auto border-primary/30 box-glow-primary">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-glow-accent">Form Builder Access</CardTitle>
          <CardDescription>
            You need clearance to access the form construction interface. Please provide the password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access code..."
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full font-bold">
              Authorize
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
