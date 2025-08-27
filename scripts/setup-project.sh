#!/bin/bash

# BiteBrain Project Setup Script
# This script helps set up the GitHub project and create initial issues

set -e

echo "🧠 Setting up BiteBrain GitHub Project..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}GitHub CLI (gh) is required but not installed.${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}Please authenticate with GitHub first:${NC}"
    echo "gh auth login"
    exit 1
fi

echo -e "${BLUE}Creating GitHub project...${NC}"

# Create project (if it doesn't exist)
PROJECT_NAME="BiteBrain Development"
if ! gh project list --owner $(gh api user --jq .login) | grep -q "$PROJECT_NAME"; then
    gh project create --title "$PROJECT_NAME" --body "AI-powered fishing assistant development tracker"
    echo -e "${GREEN}✓ Created project: $PROJECT_NAME${NC}"
else
    echo -e "${YELLOW}! Project already exists: $PROJECT_NAME${NC}"
fi

echo -e "${BLUE}Creating project columns...${NC}"

# Note: Project v2 uses different column management
# This would need to be adapted for the specific project structure

echo -e "${BLUE}Creating initial Epic issues...${NC}"

# Epic 1.1: Interactive Map Integration
gh issue create \
  --title "[Epic 1.1] Interactive Map Integration" \
  --body "Implement comprehensive map functionality for fishing location discovery and navigation.

## Epic Overview
This epic encompasses all map-related features including basic display, fishing spot markers, and offline capability.

## User Stories Included
- Story 1.1.1: Basic Map Display
- Story 1.1.2: Fishing Spot Markers  
- Story 1.1.3: Offline Map Tiles

## Acceptance Criteria
- [ ] Interactive map displays correctly on web and mobile
- [ ] Users can view fishing spots with detailed information
- [ ] Maps work offline with cached tiles
- [ ] Map performance meets benchmarks (<2s load time)

## Dependencies
- Mapbox API access
- Fishing spot database
- Offline storage implementation

## Effort Estimate: 21 story points" \
  --label "epic,phase-1,epic-map"

# Epic 1.2: Weather & Conditions Integration  
gh issue create \
  --title "[Epic 1.2] Weather & Conditions Integration" \
  --body "Integrate real-time weather data and fishing conditions to enhance recommendations.

## Epic Overview
Comprehensive weather and environmental data integration for informed fishing decisions.

## User Stories Included
- Story 1.2.1: Real-Time Weather Data
- Story 1.2.2: Water Temperature Data
- Story 1.2.3: Solunar Calendar

## Acceptance Criteria
- [ ] Real-time weather data displays accurately
- [ ] Water temperature affects recommendations
- [ ] Solunar calendar provides optimal fishing times
- [ ] Weather alerts notify users of dangerous conditions

## Dependencies
- Weather API (OpenWeatherMap/AccuWeather)
- Solunar calculation library
- Location services

## Effort Estimate: 13 story points" \
  --label "epic,phase-1,epic-weather"

echo -e "${GREEN}✓ Created Epic issues${NC}"

echo -e "${BLUE}Creating Phase 1 Sprint 1 user stories...${NC}"

# Story 1.1.1: Basic Map Display
gh issue create \
  --title "[Story 1.1.1] Basic Map Display" \
  --body "**As an** angler  
**I want** to view an interactive map of my area  
**So that** I can see nearby water bodies and potential fishing locations

## Epic
- **Epic ID**: Epic 1.1
- **Epic Name**: Interactive Map Integration

## Acceptance Criteria
- [ ] **Given** I open the app **When** I navigate to the map screen **Then** I see an interactive map centered on my location
- [ ] **Given** I'm viewing the map **When** I pinch/zoom **Then** the map scales appropriately with smooth animations
- [ ] **Given** I'm on the map **When** I drag/pan **Then** the map moves fluidly without lag
- [ ] **Given** the map loads **When** displaying **Then** water bodies are clearly distinguished from land

## Technical Requirements
- [ ] Integrate Mapbox SDK for web and mobile
- [ ] Implement geolocation services
- [ ] Configure map styling with water body emphasis
- [ ] Add zoom controls and user location indicator
- [ ] Optimize performance for mobile devices

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Tested on web and mobile
- [ ] Accessibility requirements met
- [ ] Performance benchmarks met (<2s initial load)

## Dependencies
- [ ] Mapbox API key configuration
- [ ] Geolocation permissions setup

## Effort Estimate
**Story Points**: 5  
**Hours**: 8-12 hours

## Priority
**Phase**: 1  
**Sprint**: 1  
**Priority Score**: 95

## Testing Strategy
- [ ] Unit tests for map component initialization
- [ ] Integration tests for geolocation services
- [ ] E2E tests for map interaction (zoom, pan)
- [ ] Performance tests for load time and memory usage" \
  --label "user-story,phase-1,epic-map,frontend,high-priority"

echo -e "${GREEN}✓ Created user story issues${NC}"

echo -e "${BLUE}Setting up development environment...${NC}"

# Create development branch structure
git checkout -b develop 2>/dev/null || git checkout develop
git checkout -b feature/sprint-1-setup 2>/dev/null || echo "Branch already exists"

echo -e "${GREEN}✨ BiteBrain project setup complete!${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Visit your GitHub repository to see the created issues"
echo "2. Set up the GitHub project board columns"
echo "3. Start working on Story 1.1.1: Basic Map Display"
echo "4. Get Mapbox API key from https://mapbox.com"
echo ""
echo -e "${YELLOW}Development Commands:${NC}"
echo "• Start development: pnpm dev"
echo "• Run tests: pnpm test"
echo "• Build project: pnpm build"
echo "• View project: http://localhost:3000"
