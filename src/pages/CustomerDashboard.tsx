import { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomerPanel } from '@/components/CustomerPanel';
import { QRScanner } from '@/components/QRScanner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Leaf, QrCode, LogOut } from 'lucide-react';
import { AccountHover } from '@/components/ui/AccountHover';

export const CustomerDashboard = () => {
  const { profile, user, signOut } = useAuth();
  const [batchId, setBatchId] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [contract] = useState(null); // Mock contract for now

  const handleScan = (scannedId: string) => {
    setBatchId(scannedId);
    setShowScanner(false);
  };

  const handleSearch = () => {
    // Manual search removed; using QR scan only
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
          
          <div className="flex items-center gap-2 sm:gap-4">
            {(() => {
              const email = profile?.email || user?.email || null;
              const name = profile?.full_name || (user?.user_metadata as any)?.full_name || email || null;
              const role = profile?.role || (user?.user_metadata as any)?.role || null;
              return (
                <AccountHover
                  name={name}
                  email={email}
                  role={role}
                  userId={profile?.user_id || user?.id || null}
                  createdAt={profile?.created_at || (user as any)?.created_at || null}
                  updatedAt={profile?.updated_at || (user as any)?.updated_at || null}
                  lastSignInAt={user?.last_sign_in_at ?? null}
                />
              );
            })()}
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
        {/* Customer Panel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CustomerPanel contract={contract} initialBatchId={batchId} />
        </motion.div>

        {/* QR Scan Section moved down */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-8 flex items-center justify-center"
        >
          <Button
            onClick={() => setShowScanner(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Scan Batch QR
          </Button>
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