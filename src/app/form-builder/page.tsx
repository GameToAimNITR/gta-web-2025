'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormCanvas from '@/components/form-builder/form-canvas';
import FormElementSidebar from '@/components/form-builder/form-element-sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from '@/components/ui/toaster';

export default function FormBuilderPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('formBuilderAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.replace('/form-builder/login');
    }
  }, [router]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full">
        <h1 className="text-3xl font-bold mb-6 text-glow-primary">Create New Form</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow items-start">
          <div className="lg:col-span-2">
            <FormCanvas />
          </div>
          <div>
            <FormElementSidebar />
          </div>
        </div>
      </div>
      <Toaster />
    </DndProvider>
  );
}