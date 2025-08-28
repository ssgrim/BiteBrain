#!/bin/bash

# BiteBrain Project Management Helper Script
# Provides quick commands to manage GitHub issues and project organization

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m'

show_help() {
    echo -e "${BLUE}BiteBrain Project Management Commands${NC}"
    echo ""
    echo -e "${GREEN}Issue Management:${NC}"
    echo "  $0 list-phase1        - List all Phase 1 issues"
    echo "  $0 list-sprint1       - List Sprint 1 high-priority items"
    echo "  $0 list-epics         - List all epics"
    echo "  $0 list-stories       - List all user stories"
    echo "  $0 create-all         - Create ALL issues (Phases 1-3)"
    echo "  $0 create-phase2      - Create Phase 2 issues only"
    echo "  $0 create-phase3      - Create Phase 3 issues only"
    echo ""
    echo -e "${GREEN}Project Organization:${NC}"
    echo "  $0 summary            - Show project summary"
    echo "  $0 priority           - Show issues by priority"
    echo "  $0 roadmap            - Show development roadmap"
    echo ""
    echo -e "${GREEN}Development:${NC}"
    echo "  $0 start-sprint1      - Setup for Sprint 1 development"
    echo "  $0 status             - Show current development status"
}

list_phase1() {
    echo -e "${BLUE}Phase 1 Issues (MVP Features):${NC}"
    gh issue list --label "phase-1" --state open
}

list_sprint1() {
    echo -e "${BLUE}Sprint 1 High-Priority Items:${NC}"
    gh issue list --label "sprint-1" --state open
    echo ""
    echo -e "${YELLOW}Ready to start development on these stories!${NC}"
}

list_epics() {
    echo -e "${BLUE}All Project Epics:${NC}"
    gh issue list --label "epic" --state open
}

list_stories() {
    echo -e "${BLUE}All User Stories:${NC}"
    gh issue list --label "user-story" --state open
}

create_all_issues() {
    echo -e "${BLUE}Creating ALL project issues (Phases 1-3)...${NC}"
    ./scripts/create-all-issues.sh
}

create_phase2() {
    echo -e "${BLUE}Creating Phase 2 issues...${NC}"
    # Create additional labels for Phase 2
    gh label create "epic-social" --color "F59E0B" --description "Social features and community" 2>/dev/null || true
    gh label create "epic-advanced-ai" --color "7C3AED" --description "Advanced AI and ML features" 2>/dev/null || true
    gh label create "epic-analytics" --color "059669" --description "Analytics and insights" 2>/dev/null || true
    
    echo "Phase 2 labels created. Run the full create-all script for Phase 2 epics."
}

create_phase3() {
    echo -e "${BLUE}Creating Phase 3 issues...${NC}"
    # Create additional labels for Phase 3
    gh label create "epic-iot" --color "6366F1" --description "IoT and hardware integration" 2>/dev/null || true
    gh label create "epic-marketplace" --color "EC4899" --description "Marketplace and commerce" 2>/dev/null || true
    gh label create "epic-pro" --color "DC2626" --description "Professional angler features" 2>/dev/null || true
    
    echo "Phase 3 labels created. Run the full create-all script for Phase 3 epics."
}

show_summary() {
    echo -e "${PURPLE}🧠 BiteBrain Project Summary${NC}"
    echo ""
    
    # Count issues by phase
    phase1_count=$(gh issue list --label "phase-1" --state open --json number | jq length)
    phase2_count=$(gh issue list --label "phase-2" --state open --json number | jq length)
    phase3_count=$(gh issue list --label "phase-3" --state open --json number | jq length)
    epic_count=$(gh issue list --label "epic" --state open --json number | jq length)
    story_count=$(gh issue list --label "user-story" --state open --json number | jq length)
    sprint1_count=$(gh issue list --label "sprint-1" --state open --json number | jq length)
    
    echo -e "${GREEN}Project Statistics:${NC}"
    echo "  Phase 1 Issues: $phase1_count"
    echo "  Phase 2 Issues: $phase2_count" 
    echo "  Phase 3 Issues: $phase3_count"
    echo "  Total Epics: $epic_count"
    echo "  Total Stories: $story_count"
    echo "  Sprint 1 Ready: $sprint1_count"
    echo ""
    
    echo -e "${GREEN}Development Status:${NC}"
    echo "  ✅ Foundation: Complete (working monorepo)"
    echo "  ✅ Core Engine: Complete (100% test coverage)"
    echo "  ✅ Documentation: Complete (roadmaps & guides)"
    echo "  🎯 Current Focus: Sprint 1 implementation"
    echo ""
    
    echo -e "${YELLOW}Next Actions:${NC}"
    echo "  1. Get Mapbox API key"
    echo "  2. Start Story 1.1.1 (Basic Map Display)"
    echo "  3. Run: pnpm dev"
    echo "  4. Begin Sprint 1 development"
}

show_priority() {
    echo -e "${BLUE}Issues by Priority:${NC}"
    echo ""
    echo -e "${RED}High Priority (Sprint 1):${NC}"
    gh issue list --label "high-priority" --state open
    echo ""
    echo -e "${YELLOW}Phase 1 (MVP):${NC}"
    gh issue list --label "phase-1" --label "!high-priority" --state open
}

show_roadmap() {
    echo -e "${PURPLE}🗺️ BiteBrain Development Roadmap${NC}"
    echo ""
    echo -e "${GREEN}Phase 1 - MVP (Weeks 1-6):${NC}"
    echo "  Sprint 1 (Weeks 1-2): Map Display, Weather Data, Multiple Species"
    echo "  Sprint 2 (Weeks 3-4): Fishing Spots, Water Temp, Location-Based Recs"
    echo "  Sprint 3 (Weeks 5-6): Offline Maps, Solunar Calendar, Historical Data"
    echo ""
    echo -e "${YELLOW}Phase 2 - Social & AI (Weeks 7-18):${NC}"
    echo "  • Social features and community"
    echo "  • Advanced AI and machine learning"
    echo "  • Analytics and insights"
    echo ""
    echo -e "${BLUE}Phase 3 - Professional (Weeks 19-30):${NC}"
    echo "  • IoT and hardware integration"
    echo "  • Marketplace and commerce"
    echo "  • Professional angler features"
}

start_sprint1() {
    echo -e "${BLUE}🚀 Setting up Sprint 1 Development${NC}"
    echo ""
    
    # Check if development environment is ready
    if [ -f "package.json" ] && [ -d "node_modules" ]; then
        echo -e "${GREEN}✅ Development environment ready${NC}"
    else
        echo -e "${YELLOW}Setting up development environment...${NC}"
        pnpm install
    fi
    
    # Check if Mapbox token is configured
    if [ -f "apps/web/.env.local" ] && grep -q "MAPBOX" apps/web/.env.local; then
        echo -e "${GREEN}✅ Mapbox API key configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Mapbox API key needed for Story 1.1.1${NC}"
        echo "   1. Get key from https://mapbox.com"
        echo "   2. Add to apps/web/.env.local:"
        echo "      NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here"
    fi
    
    echo ""
    echo -e "${GREEN}Sprint 1 Ready! Start with:${NC}"
    echo "  1. pnpm dev (start development servers)"
    echo "  2. Work on Issue #4: Basic Map Display"
    echo "  3. Follow acceptance criteria in GitHub issue"
}

show_status() {
    echo -e "${PURPLE}📊 Current Development Status${NC}"
    echo ""
    
    # Check if servers are running
    if pgrep -f "next dev" > /dev/null; then
        echo -e "${GREEN}✅ Web server running${NC}"
    else
        echo -e "${YELLOW}⚠️  Web server not running (run: pnpm dev:web)${NC}"
    fi
    
    if pgrep -f "expo start" > /dev/null; then
        echo -e "${GREEN}✅ Mobile server running${NC}"
    else
        echo -e "${YELLOW}⚠️  Mobile server not running (run: pnpm dev:mobile)${NC}"
    fi
    
    # Check test status
    echo ""
    echo -e "${BLUE}Running quick health check...${NC}"
    if pnpm test:core > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Core tests passing${NC}"
    else
        echo -e "${RED}❌ Core tests failing${NC}"
    fi
    
    if pnpm build:web > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Web build working${NC}"
    else
        echo -e "${RED}❌ Web build failing${NC}"
    fi
}

# Main command handling
case "${1:-help}" in
    "list-phase1"|"phase1")
        list_phase1
        ;;
    "list-sprint1"|"sprint1")
        list_sprint1
        ;;
    "list-epics"|"epics")
        list_epics
        ;;
    "list-stories"|"stories")
        list_stories
        ;;
    "create-all"|"all")
        create_all_issues
        ;;
    "create-phase2"|"phase2")
        create_phase2
        ;;
    "create-phase3"|"phase3")
        create_phase3
        ;;
    "summary")
        show_summary
        ;;
    "priority")
        show_priority
        ;;
    "roadmap")
        show_roadmap
        ;;
    "start-sprint1"|"start")
        start_sprint1
        ;;
    "status")
        show_status
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
