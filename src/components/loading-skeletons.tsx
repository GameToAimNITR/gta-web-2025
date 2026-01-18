import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function GameCardSkeleton() {
  return (
    <Card className="h-full w-full overflow-hidden border-primary/20">
      <div className="relative w-full aspect-[4/3]">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-1" />
      </CardContent>
    </Card>
  );
}

export function AchievementCardSkeleton() {
  return (
    <Card className="overflow-hidden border-primary/20 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="mt-auto">
          <Skeleton className="h-2 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MemberCardSkeleton() {
  return (
    <div className="cyber-card-container h-full">
      <div className="cyber-card-content p-4 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-4">
          <Skeleton className="w-24 h-24 rounded-full flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}

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
