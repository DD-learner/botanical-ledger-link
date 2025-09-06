import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import heroImage from '../assets/hero-herbs.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-3xl gradient-hero shadow-2xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">HerbTrace</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Blockchain-powered traceability for herbal products. Track your products 
            from farm to shelf with complete transparency and trust.
          </p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl mb-8"
          >
            <img 
              src={heroImage} 
              alt="HerbTrace - Herbal Product Traceability" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Transparent Supply Chain</h2>
              <p className="text-lg opacity-90">Every step verified on the blockchain</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 rounded-3xl"
          >
            <p className="text-muted-foreground">
              This is a production-ready React + Vite application with blockchain integration. 
              Connect your wallet to access the HerbTrace platform.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
