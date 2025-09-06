import { motion } from 'framer-motion';

interface DetailsItem {
  label: string;
  value: string;
}

interface DetailsListProps {
  items: DetailsItem[];
}

export function DetailsList({ items }: DetailsListProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex justify-between items-start py-2 border-b border-border/50 last:border-0"
        >
          <span className="text-sm font-medium text-muted-foreground min-w-0 flex-shrink-0">
            {item.label}:
          </span>
          <span className="text-sm text-foreground font-medium text-right ml-4">
            {item.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}