
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { models } from '@/lib/modelInfo';
import type { ModelInfo } from '@/lib/modelInfo';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Code, ArrowLeft, ArrowRight } from 'lucide-react';

const ModelViewer = dynamic(() => import('@/components/model-viewer'), {
  loading: () => <Skeleton className="w-full h-[500px] rounded-lg border-2 border-primary/30 bg-card box-glow-primary" />,
  ssr: false,
});

const ITEMS_PER_PAGE = 4;

export default function ShowcaseSection() {
  const [selectedModel, setSelectedModel] = useState<ModelInfo>(models[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPages = Math.ceil(models.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentModels = models.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
    }, 300); // Animation duration
  };

  const getIcon = (geometry: ModelInfo['fallback']['geometry']) => {
    switch (geometry) {
      case 'box':
        return <Code className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <section id="showcase" className="py-16 md:py-24 parallax-section">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">3D Asset Showcase</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Disassemble. Discover. Decode. These are the core assets powering our digital realms.          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <ModelViewer key={selectedModel.id} model={selectedModel} />
          </div>

          <div className="flex flex-col gap-4">
             <h3 className="text-2xl font-bold text-primary">Select Asset</h3>
            <div className="relative h-[450px] overflow-hidden">
                <div
                    className={cn(
                        "transition-all duration-300 ease-in-out space-y-4",
                        isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                    )}
                >
                    {currentModels.map((model) => (
                    <Button
                        key={model.id}
                        variant="outline"
                        className={cn(
                        "w-full justify-start text-left h-auto py-3 border-accent/30 hover:bg-accent/20",
                        selectedModel.id === model.id && 'bg-accent/10 border-accent box-glow-accent'
                        )}
                        onClick={() => setSelectedModel(model)}
                    >
                        <div className="flex items-start gap-4">
                        <div className="p-2 bg-card rounded-md mt-1">
                            {getIcon(model.fallback.geometry)}
                        </div>
                        <div>
                            <p className="font-bold text-lg text-accent">{model.name}</p>
                            <p className="text-muted-foreground whitespace-normal text-sm">{model.description}</p>
                        </div>
                        </div>
                    </Button>
                    ))}
                </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0 || isAnimating}
                className="border-accent/30 hover:bg-accent/20 disabled:opacity-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span className="font-code text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1 || isAnimating}
                className="border-accent/30 hover:bg-accent/20 disabled:opacity-50"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
