import { useState } from 'react';
import { motion } from 'framer-motion';
import { Field } from '../ui/Field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface ProcessingFormProps {
  contract: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProcessingForm({ contract, onSubmit, onCancel }: ProcessingFormProps) {
  const [formData, setFormData] = useState({
    batchId: '',
    stepType: '',
    processor: '',
    description: '',
    temperature: '',
    duration: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const processingTypes = [
    'Extraction',
    'Drying',
    'Grinding',
    'Sieving',
    'Standardization',
    'Encapsulation',
    'Tableting',
    'Packaging',
    'Quality Control',
    'Sterilization',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.batchId || !formData.stepType || !formData.processor || !formData.description) {
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
      // await contract.addProcessingStep(formData.batchId, formData.stepType, formData.processor, formData.description);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Processing Step Added!",
        description: `Successfully recorded ${formData.stepType} for batch ${formData.batchId}`,
      });
      
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting processing step:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to add processing step. Please try again.",
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

        <Field label="Processing Step" required>
          <Select onValueChange={(value) => updateFormData('stepType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select processing step" />
            </SelectTrigger>
            <SelectContent>
              {processingTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Processor/Company" required>
          <Input
            placeholder="Enter processor name"
            value={formData.processor}
            onChange={(e) => updateFormData('processor', e.target.value)}
          />
        </Field>

        <Field label="Temperature" description="Optional processing temperature">
          <Input
            placeholder="e.g., 25°C"
            value={formData.temperature}
            onChange={(e) => updateFormData('temperature', e.target.value)}
          />
        </Field>

        <Field label="Duration" description="Optional processing duration">
          <Input
            placeholder="e.g., 2 hours"
            value={formData.duration}
            onChange={(e) => updateFormData('duration', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Processing Description" required>
        <Textarea
          placeholder="Describe the processing step in detail..."
          rows={4}
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
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
            'Add Processing Step'
          )}
        </Button>
      </div>
    </motion.form>
  );
}