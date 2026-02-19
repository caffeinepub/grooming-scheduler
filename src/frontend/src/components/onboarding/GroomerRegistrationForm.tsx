import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GroomerFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
}

interface GroomerRegistrationFormProps {
  data: GroomerFormData;
  onChange: (data: GroomerFormData) => void;
}

export function GroomerRegistrationForm({ data, onChange }: GroomerRegistrationFormProps) {
  const handleChange = (field: keyof GroomerFormData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
        <CardDescription>Tell us about yourself and your business</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="focus-visible:ring-chewy border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="focus-visible:ring-chewy border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            className="focus-visible:ring-chewy border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-foreground">
            Business Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="businessName"
            type="text"
            placeholder="Your grooming business name"
            value={data.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            required
            className="focus-visible:ring-chewy border-input"
          />
        </div>
      </CardContent>
    </Card>
  );
}
