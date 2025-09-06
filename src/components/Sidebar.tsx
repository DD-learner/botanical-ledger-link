import { motion } from 'framer-motion';
import { Search, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    {
      id: 'customer',
      label: 'Customer Portal',
      icon: Search,
      description: 'Track product provenance'
    },
    {
      id: 'admin',
      label: 'Admin Panel',
      icon: Settings,
      description: 'Manage batch data'
    }
  ];

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 border-r bg-glass backdrop-blur-xl p-6"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Navigation</h2>
          <p className="text-sm text-muted-foreground">
            Choose your portal to get started
          </p>
        </div>

        <nav className="space-y-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full p-4 rounded-2xl text-left transition-all duration-300 group
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'bg-card/50 hover:bg-card border border-border/50 hover:border-border'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-xl transition-colors duration-300
                    ${isActive 
                      ? 'bg-white/20' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                    }
                  `}>
                    <Icon className={`
                      w-5 h-5 transition-colors duration-300
                      ${isActive 
                        ? 'text-primary-foreground' 
                        : 'text-primary'
                      }
                    `} />
                  </div>
                  <div>
                    <h3 className={`
                      font-semibold transition-colors duration-300
                      ${isActive 
                        ? 'text-primary-foreground' 
                        : 'text-foreground'
                      }
                    `}>
                      {tab.label}
                    </h3>
                    <p className={`
                      text-sm transition-colors duration-300
                      ${isActive 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                      }
                    `}>
                      {tab.description}
                    </p>
                  </div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 rounded-2xl"
        >
          <h4 className="font-semibold text-foreground mb-2">About HerbTrace</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Blockchain-powered traceability for herbal products, ensuring transparency 
            from farm to consumer.
          </p>
        </motion.div>
      </div>
    </motion.aside>
  );
}