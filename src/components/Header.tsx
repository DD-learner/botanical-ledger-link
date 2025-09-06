import { motion } from 'framer-motion';
import { Leaf, Wallet, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { config } from '../config';

interface HeaderProps {
  walletConnected: boolean;
  currentAccount: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isLoading: boolean;
}

export function Header({ 
  walletConnected, 
  currentAccount, 
  connectWallet, 
  disconnectWallet, 
  isLoading 
}: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b bg-glass backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl gradient-hero shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{config.APP_NAME}</h1>
              <p className="text-sm text-muted-foreground">Herbal Traceability</p>
            </div>
          </motion.div>

          {/* Network Status */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-success font-medium">{config.CHAIN_NAME}</span>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {walletConnected ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={disconnectWallet}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isLoading}
                className="gradient-hero text-white hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}