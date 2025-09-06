import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, MapPin, Clock, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { Card } from './Card';
import { Timeline } from './ui/Timeline';
import { DetailsList } from './ui/DetailsList';
import { Field } from './ui/Field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleBatchData } from '../config';
import { toast } from '@/hooks/use-toast';

interface CustomerPanelProps {
  contract: any;
}

export function CustomerPanel({ contract }: CustomerPanelProps) {
  const [batchId, setBatchId] = useState('');
  const [batchData, setBatchData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!batchId.trim()) {
      toast({
        title: "Batch ID Required",
        description: "Please enter a batch ID to search",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // For demo purposes, use sample data
      // In production, this would query the smart contract
      if (sampleBatchData[batchId]) {
        setBatchData(sampleBatchData[batchId]);
        
        // Generate QR code
        const qrUrl = await QRCode.toDataURL(`HerbTrace:${batchId}`);
        setQrCodeUrl(qrUrl);
        
        toast({
          title: "Batch Found!",
          description: `Successfully loaded data for ${batchId}`,
        });
      } else {
        setBatchData(null);
        setQrCodeUrl('');
        toast({
          title: "Batch Not Found",
          description: `No data found for batch ID: ${batchId}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching batch data:', error);
      toast({
        title: "Search Failed",
        description: "Failed to fetch batch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAllEvents = () => {
    if (!batchData) return [];
    
    const events = [];
    
    // Harvest event
    events.push({
      type: 'Harvest',
      icon: Package,
      timestamp: batchData.harvest.timestamp,
      title: 'Harvested',
      description: `${batchData.harvest.quantity}kg of ${batchData.harvest.plantType} harvested by ${batchData.harvest.farmer}`,
      location: batchData.harvest.location,
    });
    
    // Lab test events
    batchData.labTests?.forEach(test => {
      events.push({
        type: 'Lab Test',
        icon: Search,
        timestamp: test.timestamp,
        title: test.testType,
        description: `Result: ${test.result} (${test.labId})`,
      });
    });
    
    // Processing events
    batchData.processing?.forEach(process => {
      events.push({
        type: 'Processing',
        icon: Package,
        timestamp: process.timestamp,
        title: process.stepType,
        description: `${process.description} by ${process.processor}`,
      });
    });
    
    // Transport events
    batchData.transport?.forEach(transport => {
      events.push({
        type: 'Transport',
        icon: MapPin,
        timestamp: transport.timestamp,
        title: 'Transported',
        description: `From ${transport.from} to ${transport.to} by ${transport.transporterId}`,
      });
    });
    
    return events.sort((a, b) => a.timestamp - b.timestamp);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Customer Portal</h1>
        <p className="text-muted-foreground">
          Track your herbal products from farm to shelf. Enter a batch ID to view the complete provenance.
        </p>
      </motion.div>

      {/* Search Section */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Field label="Batch ID" required>
              <Input
                placeholder="Enter batch ID (e.g., BATCH_001)"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="h-12"
              />
            </Field>
          </div>
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="h-12 px-8 gradient-hero text-white self-end"
          >
            {loading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      {batchData ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Package className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                  Verified
                </span>
              </div>
              <h3 className="font-semibold text-foreground">Plant Type</h3>
              <p className="text-2xl font-bold text-primary">{batchData.harvest.plantType}</p>
              <p className="text-sm text-muted-foreground mt-1">{batchData.harvest.quantity}kg harvested</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <MapPin className="w-8 h-8 text-accent" />
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Origin</h3>
              <p className="text-lg font-semibold text-accent">{batchData.harvest.farmer}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {formatTimestamp(batchData.harvest.timestamp)}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Search className="w-8 h-8 text-warning" />
                <span className="text-sm font-medium text-warning">
                  {batchData.labTests?.length || 0} Tests
                </span>
              </div>
              <h3 className="font-semibold text-foreground">Lab Tests</h3>
              <p className="text-sm text-muted-foreground">
                All tests passed quality standards
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <QrCode className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-3">QR Code</h3>
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl} 
                  alt="Batch QR Code" 
                  className="w-20 h-20 rounded-lg border border-border"
                />
              )}
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Harvest Details */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Package className="w-6 h-6 mr-2 text-primary" />
                Harvest Information
              </h3>
              <DetailsList
                items={[
                  { label: 'Farmer', value: batchData.harvest.farmer },
                  { label: 'Plant Type', value: batchData.harvest.plantType },
                  { label: 'Quantity', value: `${batchData.harvest.quantity} kg` },
                  { label: 'Location', value: batchData.harvest.location },
                  { label: 'Harvest Date', value: formatTimestamp(batchData.harvest.timestamp) },
                ]}
              />
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-accent" />
                Supply Chain Timeline
              </h3>
              <Timeline events={getAllEvents()} />
            </Card>
          </div>

          {/* Lab Tests */}
          {batchData.labTests && batchData.labTests.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Search className="w-6 h-6 mr-2 text-warning" />
                Laboratory Tests
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batchData.labTests.map((test, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{test.testType}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(test.timestamp)}
                      </span>
                    </div>
                    <p className="text-success font-medium mb-1">{test.result}</p>
                    <p className="text-sm text-muted-foreground">Tested by {test.labId}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      ) : (
        !loading && batchId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No data found for this batch ID</p>
              <p className="text-sm">Try searching for "BATCH_001" to see sample data</p>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}