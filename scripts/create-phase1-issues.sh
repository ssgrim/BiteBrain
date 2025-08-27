#!/bin/bash

# BiteBrain Phase 1 Remaining Issues Script
# Creates the remaining Phase 1 user stories and epics

set -e

echo "🧠 Creating remaining Phase 1 GitHub Issues..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "Please authenticate with GitHub first: gh auth login"
    exit 1
fi

echo -e "${BLUE}Creating Phase 1 Sprint 2 & 3 stories...${NC}"

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

## Effort Estimate: 8 story points
## Priority: Phase 1, Sprint 2, Score 80" \
  --label "user-story,phase-1,epic-map,frontend"

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

## Effort Estimate: 8 story points
## Priority: Phase 1, Sprint 3, Score 70" \
  --label "user-story,phase-1,epic-map,frontend"

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

## Effort Estimate: 3 story points
## Priority: Phase 1, Sprint 2, Score 75" \
  --label "user-story,phase-1,epic-weather,backend"

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

## Effort Estimate: 5 story points
## Priority: Phase 1, Sprint 3, Score 65" \
  --label "user-story,phase-1,epic-weather,backend"

# Story 1.3.2: Location-Based Recommendations
gh issue create \
  --title "[Story 1.3.2] Location-Based Recommendations" \
  --body "**As an** angler  
**I want** recommendations tailored to my specific location  
**So that** I get advice relevant to local conditions and fish populations

## Epic
- **Epic ID**: Epic 1.3
- **Epic Name**: Enhanced Recommendation Engine

## Acceptance Criteria
- [ ] **Given** I'm at a specific fishing location **When** getting recommendations **Then** they reflect local fish species and conditions
- [ ] **Given** different water bodies **When** I change location **Then** recommendations update for local characteristics
- [ ] **Given** seasonal patterns **When** recommendations generate **Then** they consider location-specific seasonal variations
- [ ] **Given** local regulations **When** viewing recommendations **Then** I see relevant fishing rules and limits

## Technical Requirements
- [ ] Integrate location-specific fish population data
- [ ] Add geographical weighting to recommendation algorithm
- [ ] Create location-based condition adjustments
- [ ] Implement local regulation database
- [ ] Add seasonal pattern data by region

## Effort Estimate: 5 story points
## Priority: Phase 1, Sprint 2, Score 75" \
  --label "user-story,phase-1,epic-recommendations,backend"

# Story 1.3.3: Historical Data Integration
gh issue create \
  --title "[Story 1.3.3] Historical Data Integration" \
  --body "**As an** angler  
**I want** my past fishing trips to influence future recommendations  
**So that** the app learns from my experience and improves suggestions over time

## Epic
- **Epic ID**: Epic 1.3
- **Epic Name**: Enhanced Recommendation Engine

## Acceptance Criteria
- [ ] **Given** I have logged previous trips **When** getting recommendations **Then** successful past conditions are weighted higher
- [ ] **Given** I've caught specific species **When** viewing recommendations **Then** successful techniques are prioritized
- [ ] **Given** my fishing history **When** recommendations generate **Then** they adapt to my skill level and preferences
- [ ] **Given** seasonal success patterns **When** planning trips **Then** I see insights from my historical data

## Technical Requirements
- [ ] Implement historical data analysis algorithms
- [ ] Add machine learning for pattern recognition
- [ ] Create personalized recommendation weighting
- [ ] Integrate trip logging data into recommendations
- [ ] Add historical success trend visualization

## Effort Estimate: 8 story points
## Priority: Phase 1, Sprint 3, Score 70" \
  --label "user-story,phase-1,epic-recommendations,backend"

# Create remaining epics
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

## Total Epic Points: 16 story points
## Priority: Phase 1, Epic Priority 70/100" \
  --label "epic,phase-1,epic-tackle,frontend,backend"

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

## Total Epic Points: 21 story points
## Priority: Phase 1, Epic Priority 75/100" \
  --label "epic,phase-1,epic-trip,frontend,backend"

echo -e "${GREEN}✨ Phase 1 remaining issues created successfully!${NC}"
echo ""
echo "Created:"
echo "• 6 additional Phase 1 user stories"
echo "• 2 remaining Phase 1 epics"
echo ""
echo "Phase 1 is now complete with all stories and epics!"
