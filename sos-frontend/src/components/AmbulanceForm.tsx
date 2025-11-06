import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Save, X, Ambulance as AmbulanceIcon } from 'lucide-react';
import { ambulanceApi } from '@/services/api';
import type { Ambulance } from '@/services/api';

const ambulanceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  location: z.string().min(1, 'Location is required').max(200, 'Location must be less than 200 characters'),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type AmbulanceFormData = z.infer<typeof ambulanceSchema>;

interface AmbulanceFormProps {
  ambulance?: Ambulance;
  onSave?: (ambulance: Ambulance) => void;
  onCancel?: () => void;
}

export default function AmbulanceForm({ ambulance, onSave, onCancel }: AmbulanceFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!ambulance;

  const form = useForm<AmbulanceFormData>({
    resolver: zodResolver(ambulanceSchema),
    defaultValues: {
      title: ambulance?.title || '',
      description: ambulance?.description || '',
      location: ambulance?.location || '',
      image: ambulance?.image || '',
    },
  });

  useEffect(() => {
    if (ambulance) {
      form.reset({
        title: ambulance.title,
        description: ambulance.description,
        location: ambulance.location,
        image: ambulance.image || '',
      });
    }
  }, [ambulance, form]);

  const onSubmit = async (data: AmbulanceFormData) => {
    try {
      setLoading(true);
      setError(null);

      const ambulanceData = {
        ...data,
        image: data.image || undefined,
      };

      let savedAmbulance: Ambulance;

      if (isEdit && ambulance) {
        savedAmbulance = await ambulanceApi.update(ambulance.id, ambulanceData);
      } else {
        savedAmbulance = await ambulanceApi.create(ambulanceData);
      }

      if (onSave) {
        onSave(savedAmbulance);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save ambulance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AmbulanceIcon className="h-6 w-6" />
          {isEdit ? 'Edit Ambulance' : 'Add New Ambulance'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., City Hospital Ambulance #1" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Provide details about the ambulance, equipment, and services..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 123 Hospital St, City, State 12345" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/ambulance-image.jpg" 
                      type="url"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Preview */}
            {form.watch('image') && (
              <div className="space-y-2">
                <Label>Image Preview</Label>
                <div className="border rounded-lg p-4 bg-muted/50">
                  <img 
                    src={form.watch('image')} 
                    alt="Preview" 
                    className="max-h-32 rounded-md object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="w-full sm:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : (isEdit ? 'Update Ambulance' : 'Add Ambulance')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}