import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TimelineEvent {
  type: string;
  icon: LucideIcon;
  timestamp: number;
  title: string;
  description: string;
  location?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Harvest':
        return 'bg-success text-success-foreground';
      case 'Lab Test':
        return 'bg-warning text-warning-foreground';
      case 'Processing':
        return 'bg-primary text-primary-foreground';
      case 'Transport':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

      <div className="space-y-6">
        {events.map((event, index) => {
          const Icon = event.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start space-x-4"
            >
              {/* Timeline dot with icon */}
              <div className={`
                relative z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-lg
                ${getEventColor(event.type)}
              `}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Event content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-foreground">
                    {event.title}
                  </h4>
                  <span className="text-xs text-muted-foreground font-medium">
                    {formatTimestamp(event.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {event.description}
                </p>
                
                {event.location && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="font-medium">{event.location}</span>
                  </div>
                )}
                
                <div className="mt-2">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${getEventColor(event.type).replace('text-', 'bg-').replace('-foreground', '/10')} 
                    ${getEventColor(event.type).replace('bg-', 'text-')}
                  `}>
                    {event.type}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}