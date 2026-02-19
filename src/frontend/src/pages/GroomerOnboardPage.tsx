import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { GroomerRegistrationForm } from '@/components/onboarding/GroomerRegistrationForm';
import { ServiceManagementSection } from '@/components/onboarding/ServiceManagementSection';
import { useRegisterGroomer } from '@/hooks/useRegisterGroomer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PawPrint, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Service } from '../backend';

interface GroomerFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
}

export function GroomerOnboardPage() {
  const navigate = useNavigate();
  const [groomerData, setGroomerData] = useState<GroomerFormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: registerGroomer, isPending, error } = useRegisterGroomer();

  const handleFormChange = (data: GroomerFormData) => {
    setGroomerData(data);
  };

  const handleServicesChange = (updatedServices: Service[]) => {
    setServices(updatedServices);
  };

  const handleSubmit = () => {
    if (!groomerData.name || services.length === 0) {
      return;
    }

    registerGroomer(
      { name: groomerData.name, services },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  };

  const isFormValid = groomerData.name && groomerData.email && groomerData.phone && groomerData.businessName && services.length > 0;

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-chewy-soft">
                <PawPrint className="w-5 h-5 md:w-6 md:h-6 text-chewy" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Groomer Onboarding</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">Join our network of trusted professionals</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-chewy/30 bg-chewy-soft/10">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-chewy-soft">
                    <CheckCircle2 className="w-8 h-8 text-chewy" />
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl">Registration Complete!</CardTitle>
                <CardDescription className="text-base">
                  Welcome to our grooming network, {groomerData.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Your profile has been successfully created with {services.length} service{services.length !== 1 ? 's' : ''}.
                  You can now start accepting appointments from pet owners.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button
                    onClick={() => navigate({ to: '/' })}
                    className="bg-chewy hover:bg-chewy/90 text-chewy-foreground focus-visible:ring-chewy"
                  >
                    View Scheduler
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSuccess(false);
                      setGroomerData({ name: '', email: '', phone: '', businessName: '' });
                      setServices([]);
                    }}
                    className="border-chewy/30 text-chewy hover:bg-chewy-soft focus-visible:ring-chewy"
                  >
                    Register Another Groomer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-chewy-soft">
              <PawPrint className="w-5 h-5 md:w-6 md:h-6 text-chewy" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Groomer Onboarding</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Join our network of trusted professionals</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/' })}
              className="gap-2 text-chewy hover:bg-chewy-soft hover:text-chewy focus-visible:ring-chewy"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Scheduler
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Register as a Groomer</h2>
              <p className="text-muted-foreground">
                Complete your profile and list your services to start accepting appointments
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to register groomer. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <GroomerRegistrationForm
              data={groomerData}
              onChange={handleFormChange}
            />

            <ServiceManagementSection
              services={services}
              onChange={handleServicesChange}
            />

            <Card className="border-chewy/30 bg-chewy-soft/10">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => navigate({ to: '/' })}
                    disabled={isPending}
                    className="border-chewy/30 text-chewy hover:bg-chewy-soft focus-visible:ring-chewy"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid || isPending}
                    className="bg-chewy hover:bg-chewy/90 text-chewy-foreground focus-visible:ring-chewy"
                  >
                    {isPending ? 'Registering...' : 'Complete Registration'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

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
