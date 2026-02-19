import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import type { Service } from '../../backend';

interface BookNowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groomerName: string;
  service: Service;
  onProceed: (date: string) => void;
}

const DEFAULT_SERVICE_DESCRIPTION = 'Details available at booking';

export function BookNowModal({
  open,
  onOpenChange,
  groomerName,
  service,
  onProceed,
}: BookNowModalProps) {
  const [selectedDate, setSelectedDate] = useState('');

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

  const handleProceed = () => {
    if (selectedDate) {
      onProceed(selectedDate);
      setSelectedDate('');
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setSelectedDate('');
    }
    onOpenChange(open);
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Schedule your grooming appointment with {groomerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{getServiceDescription(service)}</p>
            <p className="text-lg font-semibold text-chewy">
              {formatPrice(service.priceRange)}
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="appointment-date" className="text-base font-semibold">
              Select Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                id="appointment-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="pl-10 h-12 text-base focus-visible:ring-chewy"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
            className="border-border hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleProceed}
            disabled={!selectedDate}
            className="bg-chewy text-chewy-foreground hover:bg-chewy/90 focus-visible:ring-chewy disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
