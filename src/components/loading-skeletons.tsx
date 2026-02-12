import { Skeleton } from '@/components/ui/skeleton';

export function SectionSkeleton() {
  return (
    <div className="py-24 min-h-[400px] flex items-center justify-center">
      <div className="space-y-4 w-full max-w-3xl mx-auto px-4">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6 mx-auto" />
      </div>
    </div>
  );
}
