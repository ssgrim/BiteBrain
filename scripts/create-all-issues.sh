#!/bin/bash

# BiteBrain Issue Generation Script
# This script creates all GitHub issues for Phase 1, 2, and 3 with proper labels

set -e

echo "🧠 Creating BiteBrain GitHub Issues..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if gh CLI is available and authenticated
if ! command -v gh &> /dev/null; then
    echo -e "${RED}GitHub CLI (gh) is required but not installed.${NC}"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo -e "${RED}Please authenticate with GitHub first: gh auth login${NC}"
    exit 1
fi

echo -e "${BLUE}Creating remaining Phase 1 user stories...${NC}"

# Story 1.2.1: Real-Time Weather Data
gh issue create \
  --title "[Story 1.2.1] Real-Time Weather Data" \
  --body "**As an** angler  
**I want** to see current weather conditions  
**So that** I can make informed decisions about when and where to fish

## Epic
- **Epic ID**: Epic 1.2
- **Epic Name**: Weather & Conditions Integration

## Acceptance Criteria
- [ ] **Given** I'm viewing recommendations **When** the page loads **Then** I see current weather conditions for my location
- [ ] **Given** weather data is available **When** conditions change **Then** recommendations update accordingly
- [ ] **Given** severe weather alerts **When** they occur **Then** I receive appropriate warnings
- [ ] **Given** I select a different location **When** viewing the map **Then** weather data updates for that location

## Technical Requirements
- [ ] Integrate OpenWeatherMap API
- [ ] Create weather service in core package
- [ ] Add weather data to recommendation algorithm
- [ ] Implement weather display components
- [ ] Add weather-based recommendation adjustments

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests with mocked API
- [ ] Error handling for API failures
- [ ] Tested on web and mobile
- [ ] Weather affects recommendation scores

## Dependencies
- [ ] OpenWeatherMap API key
- [ ] Location services working

## Effort Estimate
**Story Points**: 5  
**Hours**: 8-10 hours

## Priority
**Phase**: 1  
**Sprint**: 1  
**Priority Score**: 90" \
  --label "user-story,phase-1,epic-weather,backend,high-priority,sprint-1"

echo -e "${GREEN}✓ Created Story 1.2.1${NC}"

# Story 1.3.1: Multiple Species Support
gh issue create \
  --title "[Story 1.3.1] Multiple Species Support" \
  --body "**As an** angler  
**I want** to select from multiple fish species  
**So that** I can get targeted recommendations for the fish I want to catch

## Epic
- **Epic ID**: Epic 1.3
- **Epic Name**: Enhanced Recommendation Engine

## Acceptance Criteria
- [ ] **Given** I open the recommendations **When** I view species options **Then** I see at least 10 common fish species
- [ ] **Given** I select a target species **When** recommendations generate **Then** they are optimized for that species
- [ ] **Given** different species have different preferences **When** I switch species **Then** recommendations change accordingly
- [ ] **Given** I haven't selected a species **When** viewing recommendations **Then** I see general multi-species advice

## Technical Requirements
- [ ] Expand species database with 10+ species
- [ ] Update recommendation algorithm for species-specific scoring
- [ ] Create species selection UI component
- [ ] Add species-specific tackle recommendations
- [ ] Implement species preference weighting

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests for all species
- [ ] Integration tests for species switching
- [ ] Documentation updated with species data
- [ ] Tested species-specific recommendations
- [ ] Performance maintained with expanded data

## Dependencies
- [ ] Species research and data collection
- [ ] UI design for species selector

## Effort Estimate
**Story Points**: 8  
**Hours**: 12-16 hours

## Priority
**Phase**: 1  
**Sprint**: 1  
**Priority Score**: 85" \
  --label "user-story,phase-1,epic-recommendations,backend,high-priority,sprint-1"

echo -e "${GREEN}✓ Created Story 1.3.1${NC}"

# Sprint 2 Stories
echo -e "${BLUE}Creating Sprint 2 user stories...${NC}"

# Story 1.1.2: Fishing Spot Markers
gh issue create \
  --title "[Story 1.1.2] Fishing Spot Markers" \
  --body "**As an** angler  
**I want** to see fishing spots marked on the map  
**So that** I can discover new locations and get detailed information about each spot

## Epic
- **Epic ID**: Epic 1.1
- **Epic Name**: Interactive Map Integration

## Acceptance Criteria
- [ ] **Given** I'm viewing the map **When** it loads **Then** I see markers for known fishing spots
- [ ] **Given** I tap/click a fishing spot marker **When** selected **Then** I see detailed information popup
- [ ] **Given** fishing spot information **When** displayed **Then** I see species, difficulty, and access info
- [ ] **Given** multiple fishing spots **When** zooming **Then** markers cluster appropriately for performance

## Technical Requirements
- [ ] Create fishing spots database/API
- [ ] Implement map marker clustering
- [ ] Design fishing spot info popup component
- [ ] Add spot rating and review system foundation
- [ ] Optimize marker rendering for performance

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests for marker components
- [ ] Integration tests for spot data
- [ ] Map performance maintained with markers
- [ ] Accessible marker interactions
- [ ] Mobile-friendly popup design

## Dependencies
- [ ] Fishing spots data collection
- [ ] Basic map display (Story 1.1.1)

## Effort Estimate
**Story Points**: 8  
**Hours**: 12-16 hours

## Priority
**Phase**: 1  
**Sprint**: 2  
**Priority Score**: 80" \
  --label "user-story,phase-1,epic-map,frontend"

echo -e "${GREEN}✓ Created Story 1.1.2${NC}"

# Story 1.2.2: Water Temperature Data
gh issue create \
  --title "[Story 1.2.2] Water Temperature Data" \
  --body "**As an** angler  
**I want** to see water temperature information  
**So that** I can understand how it affects fish behavior and adjust my strategy

## Epic
- **Epic ID**: Epic 1.2
- **Epic Name**: Weather & Conditions Integration

## Acceptance Criteria
- [ ] **Given** I'm viewing fishing recommendations **When** water temperature is available **Then** I see current water temp
- [ ] **Given** water temperature data **When** recommendations generate **Then** temp influences species activity predictions
- [ ] **Given** seasonal temperature patterns **When** available **Then** I see how current temp compares to seasonal norms
- [ ] **Given** different water bodies **When** I select them **Then** temperature data updates accordingly

## Technical Requirements
- [ ] Integrate water temperature data sources
- [ ] Add temperature-based scoring to recommendation engine
- [ ] Create water temperature display component
- [ ] Implement temperature trend visualization
- [ ] Add temperature-based fishing tips

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests for temperature integration
- [ ] Integration tests with temperature APIs
- [ ] Temperature data affects recommendations
- [ ] Visual temperature indicators working
- [ ] Error handling for missing temp data

## Dependencies
- [ ] Water temperature data source/API
- [ ] Real-time weather integration (Story 1.2.1)

## Effort Estimate
**Story Points**: 3  
**Hours**: 4-6 hours

## Priority
**Phase**: 1  
**Sprint**: 2  
**Priority Score**: 75" \
  --label "user-story,phase-1,epic-weather,backend"

echo -e "${GREEN}✓ Created Story 1.2.2${NC}"

# Story 1.4.1: Basic Tackle Inventory
gh issue create \
  --title "[Story 1.4.1] Basic Tackle Inventory" \
  --body "**As an** angler  
**I want** to track my tackle inventory  
**So that** I can get recommendations based on what gear I actually have

## Epic
- **Epic ID**: Epic 1.4
- **Epic Name**: Tackle Inventory Management

## Acceptance Criteria
- [ ] **Given** I want to add tackle **When** I access inventory **Then** I can add rods, reels, lures, and bait
- [ ] **Given** I have tackle in inventory **When** getting recommendations **Then** suggestions match my available gear
- [ ] **Given** I'm viewing recommendations **When** I don't have suggested tackle **Then** I see alternative options
- [ ] **Given** my tackle inventory **When** I view it **Then** I can edit, remove, or mark items as unavailable

## Technical Requirements
- [ ] Create tackle inventory data models
- [ ] Implement inventory management UI
- [ ] Update recommendation engine to consider inventory
- [ ] Add tackle-based filtering to recommendations
- [ ] Create tackle suggestion alternatives system

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests for inventory operations
- [ ] Integration tests for recommendation filtering
- [ ] Inventory persists across sessions
- [ ] Mobile-friendly inventory interface
- [ ] Recommendations respect inventory constraints

## Dependencies
- [ ] User authentication/storage system
- [ ] Basic recommendation engine (existing)

## Effort Estimate
**Story Points**: 8  
**Hours**: 12-16 hours

## Priority
**Phase**: 1  
**Sprint**: 2  
**Priority Score**: 70" \
  --label "user-story,phase-1,epic-tackle,frontend,backend"

echo -e "${GREEN}✓ Created Story 1.4.1${NC}"

# Story 1.5.1: Basic Trip Logging
gh issue create \
  --title "[Story 1.5.1] Basic Trip Logging" \
  --body "**As an** angler  
**I want** to log my fishing trips and catches  
**So that** I can track my success and improve future trips

## Epic
- **Epic ID**: Epic 1.5
- **Epic Name**: Trip Planning & Logging

## Acceptance Criteria
- [ ] **Given** I complete a fishing trip **When** I want to log it **Then** I can record location, duration, and conditions
- [ ] **Given** I catch fish **When** logging **Then** I can record species, size, and tackle used
- [ ] **Given** my trip history **When** I view it **Then** I see a list of all previous trips with summary info
- [ ] **Given** trip data **When** recommendations generate **Then** my historical success influences suggestions

## Technical Requirements
- [ ] Create trip and catch data models
- [ ] Implement trip logging form interface
- [ ] Add photo capture/upload for catches
- [ ] Create trip history view
- [ ] Integrate trip data into recommendation algorithm

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests for trip operations
- [ ] Integration tests for data persistence
- [ ] Trip data influences recommendations
- [ ] Photo upload working on mobile
- [ ] Trip history accessible and searchable

## Dependencies
- [ ] User authentication/storage system
- [ ] Camera/photo upload capability

## Effort Estimate
**Story Points**: 8  
**Hours**: 12-16 hours

## Priority
**Phase**: 1  
**Sprint**: 2  
**Priority Score**: 65" \
  --label "user-story,phase-1,epic-trip,frontend,backend"

echo -e "${GREEN}✓ Created Story 1.5.1${NC}"

# Sprint 3 Stories
echo -e "${BLUE}Creating Sprint 3 user stories...${NC}"

# Story 1.1.3: Offline Map Tiles
gh issue create \
  --title "[Story 1.1.3] Offline Map Tiles" \
  --body "**As an** angler  
**I want** maps to work offline  
**So that** I can use the app in remote areas without internet connection

## Epic
- **Epic ID**: Epic 1.1
- **Epic Name**: Interactive Map Integration

## Acceptance Criteria
- [ ] **Given** I'm in an area with no internet **When** I open the map **Then** I see cached map tiles
- [ ] **Given** I want to go fishing in a remote area **When** I have internet **Then** I can download map tiles for offline use
- [ ] **Given** I've downloaded offline maps **When** viewing them **Then** performance matches online experience
- [ ] **Given** limited storage **When** managing offline maps **Then** I can control which areas are cached

## Technical Requirements
- [ ] Implement map tile caching system
- [ ] Add offline map download interface
- [ ] Create storage management for cached tiles
- [ ] Handle offline/online state transitions
- [ ] Optimize offline map performance

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests for offline functionality
- [ ] Integration tests for cache management
- [ ] Offline maps work without internet
- [ ] Storage management prevents device overflow
- [ ] Smooth online/offline transitions

## Dependencies
- [ ] Basic map display (Story 1.1.1)
- [ ] Device storage management

## Effort Estimate
**Story Points**: 8  
**Hours**: 12-16 hours

## Priority
**Phase**: 1  
**Sprint**: 3  
**Priority Score**: 70" \
  --label "user-story,phase-1,epic-map,frontend"

echo -e "${GREEN}✓ Created Story 1.1.3${NC}"

# Story 1.2.3: Solunar Calendar
gh issue create \
  --title "[Story 1.2.3] Solunar Calendar" \
  --body "**As an** angler  
**I want** to see solunar periods for optimal fishing times  
**So that** I can plan my trips during peak fish activity periods

## Epic
- **Epic ID**: Epic 1.2
- **Epic Name**: Weather & Conditions Integration

## Acceptance Criteria
- [ ] **Given** I'm planning a fishing trip **When** I check the app **Then** I see major and minor solunar periods
- [ ] **Given** solunar data **When** viewing recommendations **Then** current period affects fishing success predictions
- [ ] **Given** I want to plan ahead **When** viewing the calendar **Then** I see solunar periods for the next 7 days
- [ ] **Given** different locations **When** I change location **Then** solunar times adjust for local timezone

## Technical Requirements
- [ ] Implement solunar calculation algorithms
- [ ] Create solunar calendar display component
- [ ] Add solunar weighting to recommendation engine
- [ ] Handle timezone conversions for solunar times
- [ ] Add visual indicators for current solunar status

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests for solunar calculations
- [ ] Integration tests for timezone handling
- [ ] Solunar data affects recommendations
- [ ] Calendar view displays correctly
- [ ] Accurate solunar time calculations

## Dependencies
- [ ] Location services for timezone
- [ ] Date/time management system

## Effort Estimate
**Story Points**: 5  
**Hours**: 8-10 hours

## Priority
**Phase**: 1  
**Sprint**: 3  
**Priority Score**: 65" \
  --label "user-story,phase-1,epic-weather,backend"

echo -e "${GREEN}✓ Created Story 1.2.3${NC}"

echo -e "${BLUE}Creating remaining Phase 1 epics...${NC}"

# Epic 1.4: Tackle Inventory Management
gh issue create \
  --title "[Epic 1.4] Tackle Inventory Management" \
  --body "Implement comprehensive tackle and gear inventory management system.

## Epic Overview
Allow users to track their fishing gear and get personalized recommendations based on available tackle.

## User Stories Included
- Story 1.4.1: Basic Tackle Inventory (8 pts)
- Story 1.4.2: Tackle Recommendations (5 pts)
- Story 1.4.3: Gear Maintenance Tracking (3 pts)

## Acceptance Criteria
- [ ] Users can maintain complete tackle inventory
- [ ] Recommendations consider available gear
- [ ] Tackle suggestions include alternatives
- [ ] Gear maintenance reminders available

## Dependencies
- User authentication system
- Recommendation engine integration
- Photo upload capability

## Effort Estimate
**Total Epic Points**: 16 story points

## Priority
**Phase**: 1
**Epic Priority**: 70/100" \
  --label "epic,phase-1,epic-tackle,frontend,backend"

echo -e "${GREEN}✓ Created Epic 1.4${NC}"

# Epic 1.5: Trip Planning & Logging
gh issue create \
  --title "[Epic 1.5] Trip Planning & Logging" \
  --body "Implement trip planning and comprehensive fishing trip logging functionality.

## Epic Overview
Enable users to plan fishing trips and log their experiences for improved future recommendations.

## User Stories Included
- Story 1.5.1: Basic Trip Logging (8 pts)
- Story 1.5.2: Trip Planning (8 pts)
- Story 1.5.3: Catch Photo Management (5 pts)

## Acceptance Criteria
- [ ] Users can plan and log fishing trips
- [ ] Trip history influences recommendations
- [ ] Photo documentation of catches
- [ ] Trip analysis and insights

## Dependencies
- User authentication system
- Camera/photo capabilities
- Location services
- Data storage system

## Effort Estimate
**Total Epic Points**: 21 story points

## Priority
**Phase**: 1
**Epic Priority**: 75/100" \
  --label "epic,phase-1,epic-trip,frontend,backend"

echo -e "${GREEN}✓ Created Epic 1.5${NC}"

echo -e "${BLUE}Creating Phase 2 epics and stories...${NC}"

# Create additional labels for Phase 2
gh label create "epic-social" --color "F59E0B" --description "Social features and community" 2>/dev/null || true
gh label create "epic-advanced-ai" --color "7C3AED" --description "Advanced AI and ML features" 2>/dev/null || true
gh label create "epic-analytics" --color "059669" --description "Analytics and insights" 2>/dev/null || true

# Phase 2 Epic 2.1: Social Features
gh issue create \
  --title "[Epic 2.1] Social Features & Community" \
  --body "Implement social features to build a fishing community within the app.

## Epic Overview
Add social functionality including spot sharing, community recommendations, and social fishing networks.

## User Stories Included
- Story 2.1.1: Fishing Spot Sharing (8 pts)
- Story 2.1.2: Community Recommendations (8 pts)
- Story 2.1.3: Angler Profiles (5 pts)
- Story 2.1.4: Fishing Groups (8 pts)

## Acceptance Criteria
- [ ] Users can share and discover fishing spots
- [ ] Community-driven recommendations available
- [ ] User profiles with fishing statistics
- [ ] Group fishing trip coordination

## Dependencies
- User authentication system
- Map integration
- Photo sharing capabilities
- Notification system

## Effort Estimate
**Total Epic Points**: 29 story points

## Priority
**Phase**: 2
**Epic Priority**: 85/100" \
  --label "epic,phase-2,epic-social,frontend,backend"

echo -e "${GREEN}✓ Created Epic 2.1${NC}"

# Phase 2 Epic 2.2: Advanced AI Features
gh issue create \
  --title "[Epic 2.2] Advanced AI & Machine Learning" \
  --body "Implement advanced AI features including pattern recognition and predictive analytics.

## Epic Overview
Enhance the AI capabilities with machine learning models for pattern recognition and predictive fishing success.

## User Stories Included
- Story 2.2.1: Fishing Pattern Recognition (13 pts)
- Story 2.2.2: Predictive Success Modeling (13 pts)
- Story 2.2.3: Personalized AI Assistant (8 pts)
- Story 2.2.4: Computer Vision for Fish ID (13 pts)

## Acceptance Criteria
- [ ] AI recognizes successful fishing patterns
- [ ] Predictive models for fishing success
- [ ] Personalized fishing assistant
- [ ] Automatic fish species identification

## Dependencies
- Large dataset of fishing trips
- Machine learning infrastructure
- Computer vision capabilities
- Advanced analytics platform

## Effort Estimate
**Total Epic Points**: 47 story points

## Priority
**Phase**: 2
**Epic Priority**: 90/100" \
  --label "epic,phase-2,epic-advanced-ai,backend"

echo -e "${GREEN}✓ Created Epic 2.2${NC}"

# Phase 2 Epic 2.3: Advanced Analytics
gh issue create \
  --title "[Epic 2.3] Advanced Analytics & Insights" \
  --body "Implement comprehensive analytics and insights for fishing performance tracking.

## Epic Overview
Provide detailed analytics on fishing performance, trends, and personalized insights for improvement.

## User Stories Included
- Story 2.3.1: Performance Dashboard (8 pts)
- Story 2.3.2: Trend Analysis (8 pts)
- Story 2.3.3: Goal Setting & Tracking (5 pts)
- Story 2.3.4: Fishing Reports (8 pts)

## Acceptance Criteria
- [ ] Comprehensive performance dashboard
- [ ] Trend analysis for fishing success
- [ ] Goal setting and progress tracking
- [ ] Detailed fishing reports and analytics

## Dependencies
- Trip logging data
- Analytics infrastructure
- Data visualization tools
- Export capabilities

## Effort Estimate
**Total Epic Points**: 29 story points

## Priority
**Phase**: 2
**Epic Priority**: 75/100" \
  --label "epic,phase-2,epic-analytics,frontend,backend"

echo -e "${GREEN}✓ Created Epic 2.3${NC}"

echo -e "${BLUE}Creating Phase 3 epics...${NC}"

# Create additional labels for Phase 3
gh label create "epic-iot" --color "6366F1" --description "IoT and hardware integration" 2>/dev/null || true
gh label create "epic-marketplace" --color "EC4899" --description "Marketplace and commerce" 2>/dev/null || true
gh label create "epic-pro" --color "DC2626" --description "Professional angler features" 2>/dev/null || true

# Phase 3 Epic 3.1: IoT Integration
gh issue create \
  --title "[Epic 3.1] IoT & Hardware Integration" \
  --body "Integrate with fishing hardware and IoT devices for enhanced data collection.

## Epic Overview
Connect with fish finders, smart rods, weather stations, and other fishing hardware for automated data collection.

## User Stories Included
- Story 3.1.1: Fish Finder Integration (13 pts)
- Story 3.1.2: Smart Rod Sensors (13 pts)
- Story 3.1.3: Weather Station Data (8 pts)
- Story 3.1.4: Boat Integration (13 pts)

## Acceptance Criteria
- [ ] Integration with popular fish finder brands
- [ ] Smart rod sensor data collection
- [ ] Personal weather station connectivity
- [ ] Boat electronics integration

## Dependencies
- Hardware partnership agreements
- Bluetooth/WiFi connectivity
- Device-specific SDKs
- Real-time data processing

## Effort Estimate
**Total Epic Points**: 47 story points

## Priority
**Phase**: 3
**Epic Priority**: 80/100" \
  --label "epic,phase-3,epic-iot,backend"

echo -e "${GREEN}✓ Created Epic 3.1${NC}"

# Phase 3 Epic 3.2: Marketplace & Commerce
gh issue create \
  --title "[Epic 3.2] Marketplace & Commerce Integration" \
  --body "Implement marketplace features for tackle recommendations and local guide bookings.

## Epic Overview
Create a marketplace for tackle purchases, guide bookings, and fishing-related services.

## User Stories Included
- Story 3.2.1: Tackle Marketplace (13 pts)
- Story 3.2.2: Guide Booking System (13 pts)
- Story 3.2.3: Charter Integration (8 pts)
- Story 3.2.4: Local Bait Shop Finder (5 pts)

## Acceptance Criteria
- [ ] Integrated tackle purchasing
- [ ] Professional guide booking
- [ ] Charter boat reservations
- [ ] Local bait shop directory

## Dependencies
- E-commerce integration
- Payment processing
- Vendor partnership agreements
- Location-based services

## Effort Estimate
**Total Epic Points**: 39 story points

## Priority
**Phase**: 3
**Epic Priority**: 70/100" \
  --label "epic,phase-3,epic-marketplace,frontend,backend"

echo -e "${GREEN}✓ Created Epic 3.2${NC}"

# Phase 3 Epic 3.3: Professional Angler Features
gh issue create \
  --title "[Epic 3.3] Professional Angler Features" \
  --body "Implement advanced features for professional and tournament anglers.

## Epic Overview
Provide professional-grade features for tournament preparation, advanced analytics, and competitive fishing support.

## User Stories Included
- Story 3.3.1: Tournament Mode (13 pts)
- Story 3.3.2: Professional Analytics (13 pts)
- Story 3.3.3: Sponsorship Integration (8 pts)
- Story 3.3.4: Competition Platform (13 pts)

## Acceptance Criteria
- [ ] Tournament-specific features and modes
- [ ] Professional-grade analytics and insights
- [ ] Sponsorship and branding support
- [ ] Competitive fishing platform

## Dependencies
- Tournament data integration
- Advanced analytics platform
- Professional user verification
- Competition management system

## Effort Estimate
**Total Epic Points**: 47 story points

## Priority
**Phase**: 3
**Epic Priority**: 85/100" \
  --label "epic,phase-3,epic-pro,frontend,backend"

echo -e "${GREEN}✓ Created Epic 3.3${NC}"

echo -e "${GREEN}✨ All GitHub issues created successfully!${NC}"
echo ""
echo -e "${BLUE}Summary:${NC}"
echo "• 3 Phase 1 Epics created"
echo "• 8 Phase 1 User Stories created"
echo "• 3 Phase 2 Epics created"
echo "• 3 Phase 3 Epics created"
echo "• All issues properly labeled with phases, epics, and priorities"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Visit GitHub Issues to see all created items"
echo "2. Set up GitHub Project board with columns"
echo "3. Start working on Sprint 1 high-priority stories"
echo "4. Get Mapbox API key for Story 1.1.1"
