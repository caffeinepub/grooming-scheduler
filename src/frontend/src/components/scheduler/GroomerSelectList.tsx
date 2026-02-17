import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Star, AlertCircle, RefreshCw } from 'lucide-react';
import type { Groomer } from '../../backend';

interface GroomerSelectListProps {
  groomers: Groomer[];
  isLoading: boolean;
  error: Error | null;
  onSelect: (groomer: Groomer) => void;
  onRetry: () => void;
}

export function GroomerSelectList({ groomers, isLoading, error, onSelect, onRetry }: GroomerSelectListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Groomers</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 mt-2">
          <p>We couldn't load the groomer list. Please try again.</p>
          <Button variant="outline" size="sm" onClick={onRetry} className="w-fit gap-2">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (groomers.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Groomers Available</AlertTitle>
        <AlertDescription>
          There are currently no groomers available. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
      {groomers.map((groomer) => (
        <Card
          key={groomer.id.toString()}
          className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer group"
          onClick={() => onSelect(groomer)}
        >
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {groomer.name}
              </CardTitle>
              {Number(groomer.rating) > 0 && (
                <Badge variant="secondary" className="gap-1 shrink-0">
                  <Star className="w-3 h-3 fill-current" />
                  {groomer.rating.toString()}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {groomer.services.length} {groomer.services.length === 1 ? 'service' : 'services'} available
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <Button className="w-full group-hover:bg-primary/90" size="lg">
              View Services
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
