import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestTube, Package, Truck, Plus } from 'lucide-react';
import { Card } from './Card';
import { LabForm } from './forms/LabForm';
import { ProcessingForm } from './forms/ProcessingForm';
import { TransportForm } from './forms/TransportForm';
import { Button } from '@/components/ui/button';

interface AdminPanelProps {
  contract: any;
}

type FormType = 'lab' | 'processing' | 'transport' | null;

export function AdminPanel({ contract }: AdminPanelProps) {
  const [activeForm, setActiveForm] = useState<FormType>(null);

  const formOptions = [
    {
      id: 'lab' as const,
      title: 'Lab Test',
      description: 'Add laboratory test results',
      icon: TestTube,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      component: LabForm,
    },
    {
      id: 'processing' as const,
      title: 'Processing Step',
      description: 'Record processing activities',
      icon: Package,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      component: ProcessingForm,
    },
    {
      id: 'transport' as const,
      title: 'Transport Event',
      description: 'Log transportation activities',
      icon: Truck,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      component: TransportForm,
    },
  ];

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setActiveForm(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage herbal product data throughout the supply chain. Add test results, processing steps, and transport events.
        </p>
      </motion.div>

      {!activeForm ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {formOptions.map((option) => {
            const Icon = option.icon;
            
            return (
              <Card
                key={option.id}
                className="p-6 cursor-pointer group"
                onClick={() => setActiveForm(option.id)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300
                    ${option.bgColor} group-hover:scale-110
                  `}>
                    <Icon className={`w-8 h-8 ${option.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {option.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  
                  <Button
                    variant="outline"
                    className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {option.title}
                  </Button>
                </div>
              </Card>
            );
          })}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeForm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const option = formOptions.find(opt => opt.id === activeForm);
                    const Icon = option?.icon || Package;
                    return (
                      <>
                        <div className={`
                          p-3 rounded-xl ${option?.bgColor || 'bg-primary/10'}
                        `}>
                          <Icon className={`w-6 h-6 ${option?.color || 'text-primary'}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground">
                            Add {option?.title}
                          </h2>
                          <p className="text-muted-foreground">
                            {option?.description}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveForm(null)}
                >
                  Back to Menu
                </Button>
              </div>

              {(() => {
                const option = formOptions.find(opt => opt.id === activeForm);
                const FormComponent = option?.component;
                
                return FormComponent ? (
                  <FormComponent
                    contract={contract}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setActiveForm(null)}
                  />
                ) : null;
              })()}
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Activity
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Lab Tests Today</p>
              </div>
              <TestTube className="w-8 h-8 text-blue-500 opacity-60" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Processing Steps</p>
              </div>
              <Package className="w-8 h-8 text-green-500 opacity-60" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Transport Events</p>
              </div>
              <Truck className="w-8 h-8 text-orange-500 opacity-60" />
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}