# 🎣 BiteBrain - AI Fishing Assistant

**One-liner:** AI that fuses local weather, seasonal bite patterns, and *your* tackle inventory to recommend **where/when/what** to fish — with maps, regs snapshots, and offline trip plans.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- pnpm 9+
- Git

### Development Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/ssgrim/BiteBrain.git
   cd BiteBrain
   pnpm install
   ```

2. **Start Development**
   ```bash
   # Start all development servers
   pnpm dev
   
   # Or start individual apps
   pnpm --filter @bitebrain/web dev      # Web app (localhost:3000)
   pnpm --filter @bitebrain/mobile start # Mobile app (Expo)
   pnpm --filter @bitebrain/api dev      # API service
   ```

3. **Run Tests**
   ```bash
   pnpm test           # Run all tests
   pnpm lint           # Lint all packages
   pnpm build          # Build all packages
   ```

## 📁 Project Structure (Turborepo)

```
├── apps/
│   ├── web/           # Next.js 14 app (App Router, TypeScript, Tailwind)
│   └── mobile/        # Expo React Native app (TypeScript)
├── packages/
│   ├── core/          # Recommendation engine & shared logic
│   └── ui/            # Shared UI components (Tailwind + shadcn/ui)
├── services/
│   └── api/           # AWS Lambda handlers (Node.js/TypeScript)
├── infra/
│   └── terraform/     # Infrastructure as Code (AWS)
└── docs/              # Documentation
```

## 🎯 Core Features

### ✅ Implemented
- **🧠 Recommendation Engine**: Rule-based scoring for patterns and lures
- **🌐 Web App**: Next.js with conditions input and recommendations display
- **📱 Mobile App**: Expo with trip planning and catch logging
- **⚡ API Service**: AWS Lambda handlers for recommendations
- **🏗️ Infrastructure**: Terraform configurations for AWS DynamoDB
- **🧪 Testing**: Jest test suite with coverage reporting
- **🔧 DevOps**: CI/CD pipeline, ESLint, Prettier, Husky hooks

### 🚧 Coming Soon
- **🗺️ Interactive Maps**: Mapbox integration with spot markers
- **🌤️ Weather Integration**: Real-time weather and water conditions
- **🎣 Tackle Inventory**: Personal tackle tracking and matching
- **📊 Catch Analytics**: Success tracking and pattern learning
- **🔒 User Authentication**: AWS Cognito integration
- **📴 Offline Mode**: Downloadable map tiles and cached data

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** (App Router, TypeScript)
- **Expo/React Native** (Mobile)
- **Tailwind CSS** + **shadcn/ui**
- **Mapbox** (Maps)

### Backend
- **AWS Lambda** (API)
- **DynamoDB** (Database)
- **AWS Cognito** (Authentication)
- **S3 + CloudFront** (Static assets)

### DevOps
- **Turborepo** (Monorepo)
- **pnpm** (Package management)
- **GitHub Actions** (CI/CD)
- **Terraform** (Infrastructure)
- **Jest** (Testing)
- **ESLint + Prettier** (Code quality)

## 🎮 Development Commands

```bash
# Development
pnpm dev                    # Start all development servers
pnpm dev --filter web       # Start only web app
pnpm dev --filter mobile    # Start only mobile app

# Building
pnpm build                  # Build all packages
pnpm build --filter core    # Build specific package

# Testing & Quality
pnpm test                   # Run all tests
pnpm test --filter core     # Run tests for specific package
pnpm lint                   # Lint all code
pnpm lint:fix              # Fix linting issues
pnpm format                # Format all code

# Utilities
pnpm clean                 # Clean build artifacts
```

## 🌍 Environment Setup

### Web App (`apps/web/.env.local`)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_FEATURE_FLAGS=OFFLINE_TILES,KAYAK_MODE
```

### API Service (`services/api/.env`)
```bash
AWS_REGION=us-east-1
DYNAMODB_TABLE_PREFIX=bitebrain-dev-
WEATHER_API_KEY=your_weather_api_key
```

## 🏗️ Infrastructure Deployment

```bash
cd infra/terraform
terraform init
terraform plan -var="environment=dev"
terraform apply -var="environment=dev"
```

## 📊 Recommendation Engine

The core recommendation engine uses a rule-based scoring system considering:

- **Season/Spawn Timing** (30% weight)
- **Water Temperature** (15% weight)  
- **Wind vs Structure** (15% weight)
- **Light/Time of Day** (15% weight)
- **Barometric Pressure** (10% weight)
- **Water Clarity** (10% weight)
- **Tackle Inventory Match** (5% weight)

### Example Rules
- **Pre-spawn + windy/overcast** → Chatterbait, spinnerbait, red/orange cranks
- **Spawn + calm/sunny** → Wacky worms, light Texas rigs, natural colors
- **Summer mid-day** → Drop shot, Ned rigs in shade/deeper structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is proprietary software owned by BiteBrain Technologies. All rights reserved.

For licensing inquiries, please contact: `licensing@bitebrain.tech`

See the [LICENSE](LICENSE) file for details.

## 🎣 Happy Fishing

Built with ❤️ for anglers by anglers. May your lines be tight and your batteries never die!
