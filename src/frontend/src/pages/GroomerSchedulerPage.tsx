import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { GroomerSelectList } from '@/components/scheduler/GroomerSelectList';
import { ServiceList } from '@/components/scheduler/ServiceList';
import { useGroomers, type EnrichedGroomer } from '@/hooks/useGroomers';
import { useGroomerServices } from '@/hooks/useGroomerServices';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, PawPrint, Info, UserPlus } from 'lucide-react';

export function GroomerSchedulerPage() {
  const navigate = useNavigate();
  const [selectedGroomer, setSelectedGroomer] = useState<EnrichedGroomer | null>(null);
  const { 
    data: groomers, 
    isLoading: groomersLoading, 
    error: groomersError, 
    refetch: refetchGroomers,
    isSampleFallback,
    fallbackReason
  } = useGroomers();
  const { 
    data: services, 
    isLoading: servicesLoading, 
    error: servicesError, 
    refetch: refetchServices 
  } = useGroomerServices(selectedGroomer?.id);

  const handleGroomerSelect = (groomer: EnrichedGroomer) => {
    setSelectedGroomer(groomer);
  };

  const handleBackToGroomers = () => {
    setSelectedGroomer(null);
  };

  const showFallbackNotice = isSampleFallback && fallbackReason === 'backend-error';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-chewy-soft">
                <PawPrint className="w-5 h-5 md:w-6 md:h-6 text-chewy" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Pet Grooming Scheduler</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">Find the perfect groomer for your pet</p>
              </div>
            </div>
            <Button
              onClick={() => navigate({ to: '/groomer-onboard' })}
              size="sm"
              className="bg-chewy hover:bg-chewy/90 text-chewy-foreground focus-visible:ring-chewy gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Become a Groomer</span>
              <span className="sm:hidden">Join</span>
            </Button>
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
              
              {/* Non-blocking fallback notice */}
              {showFallbackNotice && (
                <Alert className="border-chewy/30 bg-chewy-soft/20">
                  <Info className="h-4 w-4 text-chewy" />
                  <AlertDescription className="text-sm">
                    Showing sample groomers. We're having trouble connecting to the server.{' '}
                    <button
                      onClick={() => refetchGroomers()}
                      className="underline font-medium text-chewy hover:text-chewy/80 transition-colors"
                    >
                      Try again
                    </button>
                  </AlertDescription>
                </Alert>
              )}

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
                  className="gap-2 text-chewy hover:bg-chewy-soft hover:text-chewy focus-visible:ring-chewy"
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
              Built with <span className="text-chewy">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'grooming-scheduler'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-chewy transition-colors underline"
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
