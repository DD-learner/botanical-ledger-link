import { useState } from 'react';
import { motion } from 'framer-motion';
import { Field } from '../ui/Field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface LabFormProps {
  contract: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function LabForm({ contract, onSubmit, onCancel }: LabFormProps) {
  const [formData, setFormData] = useState({
    batchId: '',
    testType: '',
    result: '',
    labId: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testTypes = [
    'Purity Analysis',
    'Heavy Metals',
    'Pesticide Residue',
    'Microbial Testing',
    'Potency Testing',
    'Contaminants',
    'Moisture Content',
    'Ash Content',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.batchId || !formData.testType || !formData.result || !formData.labId) {
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
      // await contract.addLabTest(formData.batchId, formData.testType, formData.result, formData.labId);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Lab Test Added!",
        description: `Successfully recorded ${formData.testType} for batch ${formData.batchId}`,
      });
      
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting lab test:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to add lab test. Please try again.",
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

        <Field label="Test Type" required>
          <Select onValueChange={(value) => updateFormData('testType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select test type" />
            </SelectTrigger>
            <SelectContent>
              {testTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Test Result" required>
          <Input
            placeholder="Enter test result"
            value={formData.result}
            onChange={(e) => updateFormData('result', e.target.value)}
          />
        </Field>

        <Field label="Laboratory ID" required>
          <Input
            placeholder="Enter lab ID"
            value={formData.labId}
            onChange={(e) => updateFormData('labId', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Additional Notes" description="Optional additional information about the test">
        <Textarea
          placeholder="Enter any additional notes..."
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
          className="gradient-hero text-white min-w-[120px]"
        >
          {isSubmitting ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Add Lab Test'
          )}
        </Button>
      </div>
    </motion.form>
  );
}