import { useState } from 'react';
import { motion } from 'framer-motion';
import { Field } from '../ui/Field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface TransportFormProps {
  contract: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function TransportForm({ contract, onSubmit, onCancel }: TransportFormProps) {
  const [formData, setFormData] = useState({
    batchId: '',
    fromLocation: '',
    toLocation: '',
    transporterId: '',
    vehicleId: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.batchId || !formData.fromLocation || !formData.toLocation || !formData.transporterId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would call the smart contract
      // await contract.addTransportEvent(formData.batchId, formData.fromLocation, formData.toLocation, formData.transporterId);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Transport Event Added!",
        description: `Successfully recorded transport from ${formData.fromLocation} to ${formData.toLocation}`,
      });
      
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting transport event:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to add transport event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Batch ID" required>
          <Input
            placeholder="Enter batch ID"
            value={formData.batchId}
            onChange={(e) => updateFormData('batchId', e.target.value)}
          />
        </Field>

        <Field label="Transporter ID" required>
          <Input
            placeholder="Enter transporter/company ID"
            value={formData.transporterId}
            onChange={(e) => updateFormData('transporterId', e.target.value)}
          />
        </Field>

        <Field label="From Location" required>
          <Input
            placeholder="Origin location"
            value={formData.fromLocation}
            onChange={(e) => updateFormData('fromLocation', e.target.value)}
          />
        </Field>

        <Field label="To Location" required>
          <Input
            placeholder="Destination location"
            value={formData.toLocation}
            onChange={(e) => updateFormData('toLocation', e.target.value)}
          />
        </Field>

        <Field label="Vehicle ID" description="Optional vehicle identification">
          <Input
            placeholder="Enter vehicle ID/license plate"
            value={formData.vehicleId}
            onChange={(e) => updateFormData('vehicleId', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Transport Notes" description="Optional additional information">
        <Textarea
          placeholder="Enter any transport-related notes..."
          rows={4}
          value={formData.notes}
          onChange={(e) => updateFormData('notes', e.target.value)}
        />
      </Field>

      <div className="flex justify-end space-x-4 pt-6 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gradient-hero text-white min-w-[140px]"
        >
          {isSubmitting ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Add Transport Event'
          )}
        </Button>
      </div>
    </motion.form>
  );
}