import { motion } from 'framer-motion';
import { AdminPanel } from '@/components/AdminPanel';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Leaf, LogOut, Shield, User } from 'lucide-react';

export const AdminDashboard = () => {
  const { profile, signOut } = useAuth();

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
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin Portal
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{profile?.full_name || profile?.email}</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                Admin
              </span>
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AdminPanel contract={null} />
        </motion.div>
      </div>
    </div>
  );
};