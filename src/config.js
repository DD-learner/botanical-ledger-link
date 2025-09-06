// HerbTrace Configuration
// Smart contract configuration for herbal product traceability

export const config = {
  // Contract Configuration
  CONTRACT_ADDRESS: process.env.VITE_CONTRACT_ADDRESS || "0x742d35Cc6634C0532925a3b8D45Bf124e4394b8E",
  
  // Network Configuration
  CHAIN_ID: process.env.VITE_CHAIN_ID || "11155111", // Sepolia testnet
  CHAIN_NAME: "Sepolia",
  RPC_URL: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
  
  // App Configuration
  APP_NAME: "HerbTrace",
  APP_DESCRIPTION: "Herbal Product Traceability & Supply Chain Management",
  
  // Contract ABI - Simplified for demo purposes
  CONTRACT_ABI: [
    {
      "inputs": [{"internalType": "string", "name": "batchId", "type": "string"}],
      "name": "getBatchDetails",
      "outputs": [
        {"internalType": "string", "name": "farmer", "type": "string"},
        {"internalType": "string", "name": "plantType", "type": "string"},
        {"internalType": "uint256", "name": "quantity", "type": "uint256"},
        {"internalType": "string", "name": "location", "type": "string"},
        {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "string", "name": "batchId", "type": "string"},
        {"internalType": "string", "name": "testType", "type": "string"},
        {"internalType": "string", "name": "result", "type": "string"},
        {"internalType": "string", "name": "labId", "type": "string"}
      ],
      "name": "addLabTest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "string", "name": "batchId", "type": "string"},
        {"internalType": "string", "name": "stepType", "type": "string"},
        {"internalType": "string", "name": "processor", "type": "string"},
        {"internalType": "string", "name": "description", "type": "string"}
      ],
      "name": "addProcessingStep",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "string", "name": "batchId", "type": "string"},
        {"internalType": "string", "name": "from", "type": "string"},
        {"internalType": "string", "name": "to", "type": "string"},
        {"internalType": "string", "name": "transporterId", "type": "string"}
      ],
      "name": "addTransportEvent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
};

// Sample data for development/demo
export const sampleBatchData = {
  "BATCH_001": {
    harvest: {
      farmer: "Green Valley Farms",
      plantType: "Echinacea Purpurea",
      quantity: 500,
      location: "Oregon, USA (45.5152°N, 122.6784°W)",
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30 // 30 days ago
    },
    labTests: [
      {
        testType: "Purity Analysis",
        result: "99.2% Pure",
        labId: "BioLab Sciences",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 25
      },
      {
        testType: "Heavy Metals",
        result: "Below Detection Limits",
        labId: "SafeTest Labs",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 23
      }
    ],
    processing: [
      {
        stepType: "Extraction",
        processor: "HerbTech Processing",
        description: "CO2 supercritical extraction at 31°C",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 20
      },
      {
        stepType: "Standardization",
        processor: "Quality Herb Co.",
        description: "Standardized to 4% Echinacoside content",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 18
      }
    ],
    transport: [
      {
        from: "Green Valley Farms",
        to: "HerbTech Processing",
        transporterId: "NaturalTrans Inc.",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 22
      },
      {
        from: "HerbTech Processing",
        to: "Distribution Center",
        transporterId: "EcoLogistics",
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 15
      }
    ]
  }
};