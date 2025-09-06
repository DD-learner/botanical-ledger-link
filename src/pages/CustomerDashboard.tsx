import { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomerPanel } from '@/components/CustomerPanel';
import { QRScanner } from '@/components/QRScanner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/Card';
import { Field } from '@/components/ui/Field';
import { Leaf, QrCode, LogOut, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const CustomerDashboard = () => {
  const { profile, signOut } = useAuth();
  const [batchId, setBatchId] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [contract] = useState(null); // Mock contract for now

  const handleScan = (scannedId: string) => {
    setBatchId(scannedId);
    setShowScanner(false);
  };

  const handleSearch = () => {
    if (batchId.trim()) {
      // The CustomerPanel will handle the search with the provided batchId
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 border-b border-border/50 bg-card/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HerbTrace</h1>
              <p className="text-sm text-muted-foreground">Customer Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{profile?.full_name || profile?.email}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Search Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-card/90 backdrop-blur-sm border-0 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1">
                <Field label="Batch ID">
                  <div className="relative">
                    <Input
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      placeholder="Enter batch ID or scan QR code"
                      className="pl-10"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setShowScanner(true)}
                  variant="outline"
                  className="flex-1 sm:flex-none flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  Scan QR
                </Button>
                <Button
                  onClick={handleSearch}
                  disabled={!batchId.trim()}
                  className="flex-1 sm:flex-none"
                >
                  Search
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Customer Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CustomerPanel contract={contract} initialBatchId={batchId} />
        </motion.div>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};