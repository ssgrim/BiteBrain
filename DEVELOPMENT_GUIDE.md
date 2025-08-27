# BiteBrain Development Guide

Welcome to BiteBrain development! This guide will help you get started with contributing to our AI-powered fishing assistant.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Git and GitHub CLI
- VS Code (recommended)
- Mapbox account (for map features)

### Initial Setup
```bash
# Clone and setup
git clone <your-repo-url>
cd BiteBrain
pnpm install

# Run the setup script
./scripts/setup-project.sh

# Start development
pnpm dev
```

## 📋 Development Workflow

### 1. Sprint Planning
Each sprint is 2 weeks with clearly defined user stories:

**Current Sprint 1 (Weeks 1-2)**
- Story 1.1.1: Basic Map Display
- Story 1.2.1: Real-Time Weather Data  
- Story 1.3.1: Multiple Species Support

### 2. Story Development Process

#### Step 1: Pick a Story
1. Go to GitHub Issues
2. Filter by `user-story` + `sprint-1` labels
3. Assign yourself to an unassigned story
4. Move to "In Progress" column

#### Step 2: Create Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/story-1-1-1-map-display
```

#### Step 3: Development
1. Read the story acceptance criteria carefully
2. Break down into smaller tasks
3. Implement with TDD approach
4. Test thoroughly on web and mobile

#### Step 4: Testing
```bash
# Run all tests
pnpm test

# Test specific package
pnpm test:core
pnpm test:web
pnpm test:mobile

# E2E tests
pnpm test:e2e
```

#### Step 5: Create Pull Request
1. Push feature branch
2. Create PR against `develop`
3. Reference the story issue number
4. Ensure all checks pass
5. Request review

### 3. Code Standards

#### TypeScript
- Strict mode enabled
- Proper type definitions
- No `any` types without justification

#### Testing
- Minimum 80% code coverage
- Unit tests for all functions
- Integration tests for API endpoints
- E2E tests for user workflows

#### Commits
Follow conventional commits:
```bash
feat(map): implement basic map display component
fix(api): handle geolocation permission denied
test(core): add recommendation engine tests
docs(readme): update setup instructions
```

## 🏗️ Architecture Overview

### Monorepo Structure
```
BiteBrain/
├── apps/
│   ├── web/          # Next.js web application
│   └── mobile/       # Expo React Native app
├── packages/
│   └── core/         # Shared business logic
├── services/
│   └── api/          # AWS Lambda functions
└── infra/            # Terraform infrastructure
```

### Technology Stack
- **Frontend**: Next.js 14, React Native (Expo)
- **Backend**: AWS Lambda, DynamoDB
- **Shared Logic**: TypeScript packages
- **Infrastructure**: Terraform, AWS
- **Testing**: Jest, Playwright
- **Maps**: Mapbox GL JS/React Native

## 🎯 Current Phase 1 Features

### Epic 1.1: Interactive Map Integration
Build comprehensive mapping functionality for fishing location discovery.

**Stories:**
- 1.1.1: Basic Map Display (Sprint 1) - 5 pts
- 1.1.2: Fishing Spot Markers (Sprint 2) - 8 pts
- 1.1.3: Offline Map Tiles (Sprint 3) - 8 pts

### Epic 1.2: Weather & Conditions Integration  
Integrate real-time environmental data for better recommendations.

**Stories:**
- 1.2.1: Real-Time Weather Data (Sprint 1) - 5 pts
- 1.2.2: Water Temperature Data (Sprint 2) - 3 pts
- 1.2.3: Solunar Calendar (Sprint 3) - 5 pts

### Epic 1.3: Enhanced Recommendation Engine
Improve recommendations with more species and location data.

**Stories:**
- 1.3.1: Multiple Species Support (Sprint 1) - 8 pts
- 1.3.2: Location-Based Recommendations (Sprint 2) - 5 pts
- 1.3.3: Historical Data Integration (Sprint 3) - 8 pts

## 🔧 Development Commands

### Package Management
```bash
# Install dependencies
pnpm install

# Add package to workspace
pnpm add <package> --filter @bitebrain/web

# Remove package
pnpm remove <package> --filter @bitebrain/core
```

### Development Servers
```bash
# Start all development servers
pnpm dev

# Start specific app
pnpm dev:web      # http://localhost:3000
pnpm dev:mobile   # Expo development server
pnpm dev:api      # Local API server
```

### Building
```bash
# Build all packages
pnpm build

# Build specific package
pnpm build:core
pnpm build:web
pnpm build:mobile
```

### Testing
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test suites
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

### Code Quality
```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Type checking
pnpm type-check
```

## 🐛 Debugging

### Common Issues

#### Map Not Loading
1. Check Mapbox API key in environment variables
2. Verify geolocation permissions
3. Check browser console for errors

#### Build Failures
1. Clear node_modules: `rm -rf node_modules && pnpm install`
2. Clear build cache: `pnpm clean`
3. Check TypeScript errors: `pnpm type-check`

#### Test Failures
1. Update snapshots: `pnpm test -u`
2. Check test environment setup
3. Verify mock implementations

### Debug Tools
- React DevTools for frontend debugging
- VS Code debugger for Node.js
- Chrome DevTools for web performance
- Flipper for React Native debugging

## 📱 Mobile Development

### Expo Setup
```bash
# Install Expo CLI
npm install -g @expo/cli

# Start development
cd apps/mobile
expo start

# Run on device
expo start --tunnel
```

### Testing on Device
1. Install Expo Go app
2. Scan QR code from development server
3. Test core user workflows

## 🚀 Deployment

### Development Environment
- Web app deploys automatically via Vercel
- API deploys to AWS Lambda on PR merge
- Mobile builds via EAS Build service

### Production Deployment
1. Merge to `main` branch
2. CI/CD pipeline runs tests
3. Terraform applies infrastructure changes
4. Applications deploy automatically

## 📊 Monitoring

### Metrics to Track
- App performance (Core Web Vitals)
- API response times
- User engagement
- Error rates
- Map load times

### Tools
- Vercel Analytics for web performance
- AWS CloudWatch for API monitoring
- Sentry for error tracking
- Expo Analytics for mobile metrics

## 🤝 Contributing Guidelines

### Before Starting
1. Read the story requirements thoroughly
2. Understand acceptance criteria
3. Estimate effort realistically
4. Ask questions in GitHub discussions

### During Development
1. Commit frequently with clear messages
2. Write tests as you code
3. Document complex logic
4. Update README files as needed

### Before Submitting
1. Run full test suite
2. Check code formatting
3. Verify on both web and mobile
4. Update documentation

## 📚 Resources

### Documentation
- [Mapbox Documentation](https://docs.mapbox.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)

### Learning Resources
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Testing Library Documentation](https://testing-library.com/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

### Community
- GitHub Discussions for questions
- Slack workspace for real-time communication
- Weekly standup meetings

---

**Happy coding! 🎣** Let's build the best AI fishing assistant together!
