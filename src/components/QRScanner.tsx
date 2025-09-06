import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/Card';
import { Camera, X, QrCode } from 'lucide-react';
import { BrowserQRCodeReader } from '@zxing/library';
import { toast } from 'sonner';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export const QRScanner = ({ onScan, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);

  const startScanning = useCallback(async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Check if camera is available
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera if available
        } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Initialize QR code reader
      codeReaderRef.current = new BrowserQRCodeReader();
      
      // Start decoding from video
      try {
        const result = await codeReaderRef.current.decodeOnceFromVideoDevice(
          undefined, // Use default video device
          videoRef.current!
        );
        
        if (result) {
          onScan(result.getText());
          toast.success('QR code scanned successfully!');
          stopScanning();
        }
      } catch (scanError) {
        console.error('QR scanning error:', scanError);
        setError('Could not scan QR code. Please try again or enter the batch ID manually.');
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Camera access denied. Please allow camera access to scan QR codes.');
      setIsScanning(false);
    }
  }, [onScan]);

  const stopScanning = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    
    setIsScanning(false);
  }, []);

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 bg-card border-0 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Scan QR Code
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {!isScanning ? (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Position the QR code within the camera frame to scan the batch ID
                </p>
                <Button onClick={startScanning} className="w-full">
                  Start Camera
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-64 object-cover"
                    autoPlay
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 border-4 border-primary/50 rounded-lg pointer-events-none">
                    <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-lg" />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={stopScanning} variant="outline" className="flex-1">
                    Stop Camera
                  </Button>
                  <Button onClick={handleClose} variant="ghost" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <p className="text-destructive text-sm">{error}</p>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};