import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CustomerPanel } from './components/CustomerPanel';
import { AdminPanel } from './components/AdminPanel';
import { config } from './config';
import { toast } from '@/hooks/use-toast';
import heroImage from './assets/hero-herbs.jpg';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [activeTab, setActiveTab] = useState('customer');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if wallet is connected on app load
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          setWalletConnected(true);
          await initializeContract();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to use HerbTrace",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        setWalletConnected(true);
        await initializeContract();
        
        toast({
          title: "Wallet Connected!",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initializeContract = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        config.CONTRACT_ADDRESS,
        config.CONTRACT_ABI,
        signer
      );
      
      setProvider(provider);
      setContract(contract);
    } catch (error) {
      console.error('Error initializing contract:', error);
      toast({
        title: "Contract Error",
        description: "Failed to initialize smart contract",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setCurrentAccount('');
    setContract(null);
    setProvider(null);
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="herb-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="currentColor" className="text-primary/20" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#herb-pattern)" />
          </svg>
        </div>
        
        <div className="relative">
          <Header 
            walletConnected={walletConnected}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            isLoading={isLoading}
          />
          
          <div className="flex min-h-[calc(100vh-80px)]">
            <Sidebar 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            
            <main className="flex-1 overflow-hidden">
              {!walletConnected ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full p-8"
                >
                  <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl"
                    >
                      <img 
                        src={heroImage} 
                        alt="HerbTrace - Herbal Product Traceability" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h1 className="text-4xl font-bold mb-2">Welcome to {config.APP_NAME}</h1>
                        <p className="text-xl opacity-90">{config.APP_DESCRIPTION}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="glass-card p-8 rounded-3xl"
                    >
                      <h2 className="text-2xl font-semibold mb-4 text-foreground">
                        Connect Your Wallet to Get Started
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Track your herbal products from farm to shelf with blockchain technology
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={connectWallet}
                        disabled={isLoading}
                        className="gradient-hero text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                      >
                        {isLoading ? 'Connecting...' : 'Connect Wallet'}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {activeTab === 'customer' ? (
                      <CustomerPanel contract={contract} />
                    ) : (
                      <AdminPanel contract={contract} />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </main>
          </div>
        </div>
      </div>
      
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}

export default App;