import { useState } from 'react';
import { GroomerSelectList } from '@/components/scheduler/GroomerSelectList';
import { ServiceList } from '@/components/scheduler/ServiceList';
import { useGroomers } from '@/hooks/useGroomers';
import { useGroomerServices } from '@/hooks/useGroomerServices';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PawPrint } from 'lucide-react';
import type { Groomer } from '../backend';

export function GroomerSchedulerPage() {
  const [selectedGroomer, setSelectedGroomer] = useState<Groomer | null>(null);
  const { data: groomers, isLoading: groomersLoading, error: groomersError, refetch: refetchGroomers } = useGroomers();
  const { 
    data: services, 
    isLoading: servicesLoading, 
    error: servicesError, 
    refetch: refetchServices 
  } = useGroomerServices(selectedGroomer?.id);

  const handleGroomerSelect = (groomer: Groomer) => {
    setSelectedGroomer(groomer);
  };

  const handleBackToGroomers = () => {
    setSelectedGroomer(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10">
              <PawPrint className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Pet Grooming Scheduler</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Find the perfect groomer for your pet</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {!selectedGroomer ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Select a Groomer</h2>
                <p className="text-muted-foreground">Choose from our trusted pet grooming professionals</p>
              </div>
              <GroomerSelectList
                groomers={groomers || []}
                isLoading={groomersLoading}
                error={groomersError}
                onSelect={handleGroomerSelect}
                onRetry={refetchGroomers}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToGroomers}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Groomers
                </Button>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{selectedGroomer.name}</h2>
                <p className="text-muted-foreground">Browse available grooming services</p>
              </div>
              <ServiceList
                groomerName={selectedGroomer.name}
                services={services || []}
                isLoading={servicesLoading}
                error={servicesError}
                onRetry={refetchServices}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Pet Grooming Scheduler. All rights reserved.</p>
            <p>
              Built with <span className="text-primary">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'grooming-scheduler'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
