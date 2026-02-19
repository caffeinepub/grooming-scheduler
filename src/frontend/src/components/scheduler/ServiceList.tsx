import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, RefreshCw, Scissors, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { BookNowModal } from './BookNowModal';
import type { Service } from '../../backend';

interface ServiceListProps {
  groomerName: string;
  services: Service[];
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
}

const DEFAULT_SERVICE_DESCRIPTION = 'Details available at booking';

export function ServiceList({ groomerName, services, isLoading, error, onRetry }: ServiceListProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (priceRange: [bigint, bigint]) => {
    const min = Number(priceRange[0]);
    const max = Number(priceRange[1]);
    if (min === max) {
      return `$${min}`;
    }
    return `$${min} - $${max}`;
  };

  const getServiceDescription = (service: Service): string => {
    return service.description && service.description.trim() !== '' 
      ? service.description 
      : DEFAULT_SERVICE_DESCRIPTION;
  };

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleProceed = (date: string) => {
    if (selectedService) {
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      toast.success('Appointment Scheduled!', {
        description: `${selectedService.title} with ${groomerName} on ${formattedDate}`,
        duration: 5000,
      });

      setIsModalOpen(false);
      setSelectedService(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/4" />
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
        <AlertTitle>Error Loading Services</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 mt-2">
          <p>We couldn't load the services for {groomerName}. Please try again.</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry} 
            className="w-fit gap-2 border-chewy text-chewy hover:bg-chewy-soft focus-visible:ring-chewy"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (services.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Services Available</AlertTitle>
        <AlertDescription>
          {groomerName} doesn't have any services listed at the moment. Please check back later or select a different groomer.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {services.map((service, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-primary shrink-0" />
                    <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {getServiceDescription(service)}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-base font-semibold shrink-0">
                  {formatPrice(service.priceRange)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <Button
                onClick={() => handleBookNow(service)}
                className="w-full sm:w-auto bg-chewy text-chewy-foreground hover:bg-chewy/90 focus-visible:ring-chewy gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Button>
            </CardContent>
            {index < services.length - 1 && (
              <CardContent className="pt-0 pb-0">
                <Separator />
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {selectedService && (
        <BookNowModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          groomerName={groomerName}
          service={selectedService}
          onProceed={handleProceed}
        />
      )}
    </>
  );
}
