import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import type { Service } from '../../backend';

interface ServiceManagementSectionProps {
  services: Service[];
  onChange: (services: Service[]) => void;
}

interface ServiceFormData {
  title: string;
  description: string;
  minPrice: string;
  maxPrice: string;
}

export function ServiceManagementSection({ services, onChange }: ServiceManagementSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    minPrice: '',
    maxPrice: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  const handleAdd = () => {
    setIsAdding(true);
    resetForm();
  };

  const handleEdit = (index: number) => {
    const service = services[index];
    setEditingIndex(index);
    setFormData({
      title: service.title,
      description: service.description,
      minPrice: service.priceRange[0].toString(),
      maxPrice: service.priceRange[1].toString(),
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.minPrice || !formData.maxPrice) {
      return;
    }

    const newService: Service = {
      title: formData.title,
      description: formData.description,
      priceRange: [BigInt(formData.minPrice), BigInt(formData.maxPrice)],
    };

    if (editingIndex !== null) {
      const updatedServices = [...services];
      updatedServices[editingIndex] = newService;
      onChange(updatedServices);
      setEditingIndex(null);
    } else {
      onChange([...services, newService]);
      setIsAdding(false);
    }

    resetForm();
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingIndex(null);
    resetForm();
  };

  const handleDelete = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    onChange(updatedServices);
  };

  const isFormValid = formData.title && formData.description && formData.minPrice && formData.maxPrice &&
    Number(formData.minPrice) > 0 && Number(formData.maxPrice) >= Number(formData.minPrice);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Services</CardTitle>
            <CardDescription>Add the grooming services you offer</CardDescription>
          </div>
          {!isAdding && editingIndex === null && (
            <Button
              onClick={handleAdd}
              size="sm"
              className="bg-chewy hover:bg-chewy/90 text-chewy-foreground focus-visible:ring-chewy"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.length === 0 && !isAdding && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No services added yet. Click "Add Service" to get started.</p>
          </div>
        )}

        {services.map((service, index) => (
          editingIndex === index ? (
            <Card key={index} className="border-chewy/30 bg-chewy-soft/10">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`edit-title-${index}`}>Service Title <span className="text-destructive">*</span></Label>
                  <Input
                    id={`edit-title-${index}`}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Full Grooming Package"
                    className="focus-visible:ring-chewy"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`edit-description-${index}`}>Description <span className="text-destructive">*</span></Label>
                  <Textarea
                    id={`edit-description-${index}`}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what's included in this service"
                    rows={3}
                    className="focus-visible:ring-chewy resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edit-minPrice-${index}`}>Min Price ($) <span className="text-destructive">*</span></Label>
                    <Input
                      id={`edit-minPrice-${index}`}
                      type="number"
                      min="0"
                      value={formData.minPrice}
                      onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                      placeholder="50"
                      className="focus-visible:ring-chewy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edit-maxPrice-${index}`}>Max Price ($) <span className="text-destructive">*</span></Label>
                    <Input
                      id={`edit-maxPrice-${index}`}
                      type="number"
                      min="0"
                      value={formData.maxPrice}
                      onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                      placeholder="100"
                      className="focus-visible:ring-chewy"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="border-chewy/30"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={!isFormValid}
                    className="bg-chewy hover:bg-chewy/90 text-chewy-foreground focus-visible:ring-chewy"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card key={index} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-foreground">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <p className="text-sm font-medium text-chewy">
                      ${service.priceRange[0].toString()} - ${service.priceRange[1].toString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(index)}
                      className="text-chewy hover:bg-chewy-soft hover:text-chewy"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(index)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        ))}

        {isAdding && (
          <Card className="border-chewy/30 bg-chewy-soft/10">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-title">Service Title <span className="text-destructive">*</span></Label>
                <Input
                  id="new-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Full Grooming Package"
                  className="focus-visible:ring-chewy"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-description">Description <span className="text-destructive">*</span></Label>
                <Textarea
                  id="new-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what's included in this service"
                  rows={3}
                  className="focus-visible:ring-chewy resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-minPrice">Min Price ($) <span className="text-destructive">*</span></Label>
                  <Input
                    id="new-minPrice"
                    type="number"
                    min="0"
                    value={formData.minPrice}
                    onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    placeholder="50"
                    className="focus-visible:ring-chewy"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-maxPrice">Max Price ($) <span className="text-destructive">*</span></Label>
                  <Input
                    id="new-maxPrice"
                    type="number"
                    min="0"
                    value={formData.maxPrice}
                    onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    placeholder="100"
                    className="focus-visible:ring-chewy"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="border-chewy/30"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!isFormValid}
                  className="bg-chewy hover:bg-chewy/90 text-chewy-foreground focus-visible:ring-chewy"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
