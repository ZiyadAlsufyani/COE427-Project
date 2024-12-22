# COE427-Project

Dashboard and monitoring interface for the restaurant order management system.

## Features
- Real-time metrics visualization
- System monitoring capabilities
- Integration with RTI Connext DDS
- Dashboard for tracking orders and system performance

## Setup
1. Install dependencies:
```bash
npm install
```
2. Start the development environment:
```bash
# Start both server and application
npm run start:all

# Or start individually:
npm run start:server  # Starts DDS server
npm run start:app     # Starts Electron app
```

## Building
```bash
# Build for current platform
npm run build

# Platform specific builds
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```