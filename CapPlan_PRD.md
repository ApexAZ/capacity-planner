# **Sprint Capacity Planning Tool - Software Requirements Document**

## **Document Information**

* **Document Version:** 1.0
* **Created Date:** 06/26/2025
* **Last Modified:** 06/26/2025
* **Author(s):** Brian Husk
* **Stakeholders:** [List key stakeholders]
* **Status:** Draft - Consolidated

---

## **1. Executive Summary**

### **1.1 Project Overview**

The Sprint Capacity Planning Tool is a web-based application designed to help agile teams accurately plan and track their sprint capacity. The tool enables team leads to create and manage development teams, configure baseline team velocity parameters, and manage team member availability through an integrated calendar system.

Key capabilities include:

* **Team Management**: Create teams and add/remove team members with role-based capacity settings and configurable working days
* **Velocity Configuration**: Set and adjust team velocity baselines based on historical performance and team composition
* **Integrated Calendar System**: Allow team members to log paid time off (PTO), holidays, and other time-off types that impact sprint capacity
* **Capacity Calculation**: Automatically calculate available sprint capacity based on team velocity, configured working days, and member availability
* **Sprint Planning Support**: Provide accurate capacity forecasts to improve sprint planning accuracy

The tool addresses the common challenge of sprint planning without reliable capacity data, helping teams make more informed commitments and improve delivery predictability.

### **1.2 Objectives**

The primary objectives of the Sprint Capacity Planning Tool are:

1. **Reduce Administrative Overhead**: Minimize time spent manually capturing and calculating team capacity by automating these processes through integrated tools and real-time data.

2. **Streamline Time-Off Management**: Provide team members direct access to log their time off (PTO, sick days, holidays) in a centralized calendar system that automatically impacts capacity calculations.

3. **Automate Capacity Adjustments**: Automatically reduce individual and team capacity for sprints affected by logged time-off, eliminating manual recalculations and reducing errors.

4. **Improve Sprint Planning Accuracy**: Provide real-time, accurate capacity data to enable more precise sprint commitments and better workload distribution.

5. **Enhance Delivery Predictability**: Create more reliable sprint forecasts by basing planning on actual available capacity rather than theoretical maximums.

6. **Increase Team Transparency**: Improve visibility into team availability, capacity constraints, and sprint commitments for all stakeholders.

7. **Support Global Teams**: Accommodate teams with different working schedules through configurable working days (e.g., Sunday-Thursday, 4-day work weeks) to ensure accurate capacity calculations across diverse team structures.

### **1.2.1 Calendar-First Approach**

This tool is designed with a **calendar-first philosophy** where user interaction primarily occurs through the calendar interface rather than manual data entry forms:

- **Primary User Interface**: The integrated calendar system serves as the main interaction point for team members and leads
- **Minimal Manual Input**: Forms are limited to initial team setup (working days, velocity baseline, sprint configuration) and one-time configurations
- **Automated Derivation**: All capacity calculations, sprint impacts, and availability adjustments are automatically derived from calendar entries
- **Real-Time Updates**: Changes to calendar entries (PTO additions, holiday updates) immediately trigger capacity recalculations across affected sprints
- **Single Source of Truth**: The calendar maintains all time-off and availability data, eliminating the need for separate tracking systems or manual spreadsheet updates

### **1.3 Scope**

#### **Phase 1: Core MVP (In Scope)**

The following features are included in the initial release to create a functional, learnable foundation:

1. **Basic User Management**: Simple user accounts with basic role distinction (Team Lead vs Team Member)

2. **Essential Team Management**: 
   * Single team creation and configuration
   * Basic team member management (add/remove)
   * Simple velocity baseline setting

3. **Core Calendar System**: 
   * **Calendar-Driven Interface**: Primary user interaction through integrated calendar view
   * Team Members can log personal time off (PTO, vacation, sick days) directly in calendar
   * Basic holiday management through calendar interface
   * **Automated Impact Calculation**: System automatically determines which calendar entries affect capacity
   * Simple date range selection with visual feedback

4. **Basic Capacity Calculation**: 
   * **Fully Automated**: Sprint capacity calculation derived entirely from calendar data
   * **Zero Manual Recalculation**: Changes to calendar entries automatically update all affected sprint capacities
   * Real-time updates when calendar changes (within 1 minute)
   * Basic dashboard showing current sprint capacity with calendar-driven data
   * **Configuration-Based**: Working days and sprint schedules drive which calendar entries impact capacity

#### **Phase 2: Enhanced Features (Nice-to-Have)**

Advanced features to be implemented after core functionality is stable:

1. **Advanced User Management**: 
   * System Administrator role with full system control
   * User role assignment and management
   * Audit trail for administrative actions

2. **Advanced Team Management**: 
   * Multiple team support
   * Team member self-service join requests
   * Team deletion with data archival
   * Advanced team configuration options

3. **Advanced Calendar System**: 
   * Calendar entry override capabilities for Team Leads with audit trail
   * Recurring holiday patterns
   * Calendar import from external systems
   * Bulk calendar operations

4. **Advanced Capacity Features**: 
   * Complex team size factor calculations
   * Capacity breakdown by team member
   * Historical capacity reporting
   * Export functionality (PDF, CSV)

5. **Enhanced UI/UX**: 
   * Advanced dashboard visualizations
   * Multiple view options (calendar, list, forecast)
   * Advanced filtering and search
   * Mobile-responsive design

#### **Out of Scope**

The following features are explicitly excluded from this project phase:

* Actual task/story management and project management functionality
* Time tracking for completed work or detailed work logging
* Advanced reporting and analytics dashboards beyond basic capacity views
* Integration with external project management tools (Jira, Azure DevOps, etc.)
* Payroll or HR system integration
* Advanced workflow approvals for time-off requests
* Native mobile app development (web-responsive only)
* Multi-organization or multi-tenant architecture

---

## **2. Business Requirements**

### **2.1 Business Context**

Currently, the organization relies on a fragmented approach to sprint capacity planning that involves multiple disconnected tools and manual processes:

**Current State Challenges:**

* **Manual Spreadsheet Management**: Teams use rudimentary Excel spreadsheets with basic formulas to calculate capacity, requiring significant manual data manipulation each sprint and quarter
* **Fragmented Information Sources**: Capacity planning data is scattered across Excel files and crude tables in Confluence, making it difficult to maintain a single source of truth
* **Error-Prone Manual Processes**: Capacity estimates suffer from inaccuracy due to:
  * Missed or overlooked holidays
  * Incorrectly entered time-off data
  * Manual data entry errors and inconsistencies
  * Inability to handle teams with non-standard working schedules
* **Time-Intensive Data Management**: Substantial effort is required each sprint cycle to massage and reconcile data across different sources
* **Lack of Integration**: Calendar information and capacity calculations exist in separate systems, requiring manual synchronization
* **Global Team Challenges**: Current tools cannot accommodate teams working different schedules (e.g., Middle East teams working Sunday-Thursday, or teams with 4-day work weeks)

**Business Impact:** The current approach results in inaccurate sprint commitments, increased administrative overhead, and reduced confidence in delivery forecasts. Teams spend considerable time on data management rather than focusing on value-delivery activities.

**Solution Vision:** A unified, streamlined tool that combines calendar management with automated capacity calculation, eliminating manual data manipulation while improving accuracy and reducing administrative burden.

### **2.2 Business Goals and Success Metrics**

The Sprint Capacity Planning Tool aims to achieve the following specific business outcomes with measurable success criteria:

1. **Tool Consolidation**
   * **Goal**: Eliminate fragmented approach with single unified platform
   * **Success Metrics**:
     - 100% replacement of Confluence calendar system within 3 months of launch
     - Retirement of all capacity planning spreadsheets
     - Single source of truth adoption by all teams
     - Support for global teams with different working day configurations

2. **Process Automation**
   * **Goal**: Automate capacity calculations based on calendar entries
   * **Success Metrics**:
     - 90% reduction in manual data entry time
     - Zero manual formula maintenance required
     - Real-time capacity updates within 1 minute of calendar changes

3. **Sprint Planning Enhancement**
   * **Goal**: Improve accuracy and efficiency of sprint planning ceremonies
   * **Success Metrics**:
     - 50% reduction in time spent on capacity discussions during sprint planning
     - 80% improvement in sprint commitment accuracy
     - On-demand capacity reports available within 5 seconds

4. **Error Reduction**
   * **Goal**: Minimize human errors in capacity planning
   * **Success Metrics**:
     - Zero capacity calculation errors due to formula mistakes
     - 95% reduction in missed holidays/time-off in calculations
     - Automated validation of all capacity-affecting entries

5. **Data Consistency**
   * **Goal**: Establish standardized capacity planning across organization
   * **Success Metrics**:
     - 100% of teams using standardized velocity definitions
     - Consistent capacity calculation methodology across all teams
     - Unified reporting format for all stakeholders

### **2.3 Key Definitions**

* **Capacity**: The available work effort measured in story points per sprint, calculated as: Base Velocity × (Available Days / Total Sprint Days) × Team Size Factor

* **Velocity**: Historical average story points completed per sprint when team is at full capacity

* **Available Days**: Team's configured working days within the sprint minus logged time off (PTO, holidays, etc.)

* **Sprint**: A fixed time period (typically 2 weeks) during which a team commits to completing a set amount of work

* **Working Days**: Configurable per team (default Monday through Friday), representing which days of the week the team normally works. Teams can customize this to accommodate different work schedules (e.g., Sunday-Thursday, or 4-day work weeks)

### **2.4 Assumptions and Dependencies**

#### **Key Assumptions**

1. **User Adoption**: Teams will adopt the new unified tool and abandon existing fragmented spreadsheet and Confluence processes
2. **Consistent Data Entry**: Team members will consistently and accurately log their personal time off in the integrated calendar system
3. **Administrative Calendar Management**: Team administrators or leads will proactively update the calendar with company holidays and team-wide events that affect capacity
4. **Velocity Baseline Establishment**: Teams can establish and maintain realistic velocity baselines that serve as the foundation for capacity calculations
5. **Change Management Success**: Users will embrace the transition from manual processes to automated capacity planning

#### **External Dependencies**

1. **Cloud Infrastructure Access**: Availability of cloud services for application hosting and deployment (Azure, AWS, Google Cloud, or other providers)
2. **Authentication Infrastructure**: Access to existing organizational authentication systems (if integration is required)
3. **User Training Resources**: Availability of time and resources for user training and change management activities
4. **Data Migration Support**: Ability to extract and migrate existing capacity data from current spreadsheets and Confluence tables (if historical data preservation is required)
5. **Stakeholder Engagement**: Continued support and engagement from team leads, scrum masters, and organizational leadership throughout development and deployment

---

## **3. User Requirements**

### **3.1 User Personas**

#### **3.1.1 User Roles and Permissions Matrix**

| Function | System Admin | Team Lead | Team Member | Stakeholder |
|----------|--------------|-----------|-------------|-------------|
| Create Team | Approve | Create | - | - |
| Delete Team | Execute | Request | - | - |
| Add Team Members | Consult | Execute | Request | - |
| Remove Team Members | Consult | Execute | - | - |
| Log Own PTO | - | Execute | Execute | - |
| Log Others' PTO | - | Execute* | - | - |
| Manage Holidays | - | Execute | - | - |
| Configure Velocity | Consult | Execute | View | View |
| View Team Capacity | View | View | View | View |
| Access Multiple Teams | All Teams | Assigned Teams | Member Teams | Authorized Teams |

*With audit trail

#### **3.1.2 Detailed User Personas**

**System Administrators**
* **Responsibilities**:
  * Manage system-wide configurations and settings
  * Delete teams with proper data archival
  * Manage user accounts and role assignments
  * Override team settings when necessary for troubleshooting
  * Monitor system usage and performance

**Team Leads**
* **Responsibilities**:
  * Create and configure teams with appropriate velocity settings
  * Manage team membership lifecycle
  * Configure and maintain sprint schedules
  * Manage company holidays and team-wide events in calendar
  * Override team member calendar entries when necessary (with audit trail)
  * Use capacity data for sprint planning and commitment

**Team Members**
* **Responsibilities**:
  * Log personal time off (PTO, sick days, personal days) in calendar
  * View team capacity and velocity information
  * Request to join teams (pending lead approval)
  * Participate in sprint planning with accurate capacity data

**Stakeholders (Read-Only)**
* **Responsibilities**:
  * View authorized teams' calendars and capacity
  * Monitor team availability for planning purposes
  * View sprint capacity forecasts for delivery planning
* **Restrictions**: 
  * Cannot modify any data
  * Access limited to specifically authorized teams

### **3.2 Consolidated User Stories**

#### **System Administrator Stories**

1. As a System Administrator, I want to manage the complete lifecycle of teams (including deletion with data archival) so that the system remains organized and performant

2. As a System Administrator, I want to manage user roles and permissions centrally so that access control is maintained consistently across the system

#### **Team Lead Stories**

1. As a Team Lead, I want to create and configure my team with velocity baselines and sprint schedules so that capacity planning is automated from the start

2. As a Team Lead, I want to configure my team's working days (e.g., Mon-Fri, Sun-Thu, or 4-day weeks) so that capacity calculations accurately reflect our actual work schedule

3. As a Team Lead, I want to manage my team roster (add/remove members, approve join requests) so that capacity calculations reflect current team composition

4. As a Team Lead, I want to manage both company holidays and team member time-off entries so that all capacity-affecting events are accurately captured

5. As a Team Lead, I want to view real-time capacity calculations for current and future sprints so that I can make informed planning decisions

#### **Team Member Stories**

1. As a Team Member, I want to manage my own time-off calendar entries so that my availability is accurately reflected in team capacity

2. As a Team Member, I want to view my team's capacity and understand how my time off affects it so that I can be a responsible team participant

3. As a Team Member, I want to request to join teams so that I can participate in multiple team capacities if needed

#### **Stakeholder Stories**

1. As a Stakeholder, I want to view capacity and availability for teams I'm authorized to see so that I can make informed project planning decisions

2. As a Stakeholder, I want to compare capacity across multiple teams so that I can identify resource constraints and opportunities

### **3.3 User Workflows**

#### **Workflow 1: Initial Team Setup (Team Lead)**

1. **Prerequisites**: Team Lead role assigned, Azure authentication completed
2. **Steps**:
   - Navigate to Team Management section
   - Click "Create New Team"
   - Enter team name, description, and initial velocity baseline
   - Configure working days (select from presets or customize)
   - Configure sprint cadence (1-4 weeks) and start date
   - System auto-generates next 12 sprints based on cadence and working days
   - Add initial team members from user directory
   - Import company holidays from organizational calendar
   - Review calculated working days for upcoming sprints
   - Confirm setup
3. **Output**: Fully configured team with calculated capacity for next 12 sprints based on configured working days

#### **Workflow 2: Time-Off Management (Team Member) - Calendar-First**

1. **Prerequisites**: Team membership active
2. **Steps**:
   - Access team dashboard (calendar view is default)
   - **Calendar-First Interaction**: Click directly on calendar date(s) for time-off entry
   - Select leave type (PTO, Sick, Personal, Other) from contextual popup
   - Add optional notes in popup interface
   - **One-Click Submission**: Submit entry directly from calendar interface
   - **Automatic Impact Visualization**: System immediately shows capacity impact on calendar
   - **Real-Time Updates**: Affected sprint capacities update automatically without page refresh
   - **Visual Feedback**: Calendar displays updated availability and capacity indicators
3. **Output**: Updated calendar with immediate visual feedback and automatically revised sprint capacity

#### **Workflow 3: Sprint Planning Preparation (Team Lead) - Automated**

1. **Prerequisites**: Upcoming sprint within 2 weeks
2. **Steps**:
   - **Automatic Display**: System automatically displays upcoming sprint capacity on dashboard
   - **Calendar-Derived Data**: Review calculated capacity based entirely on current calendar entries
   - **Visual Constraint Identification**: Calendar view highlights capacity constraints and impacted dates
   - **One-Click Adjustments**: Optionally adjust velocity baseline if team composition changed
   - **Automated Report Generation**: Export capacity report with calendar-based calculations
   - **Real-Time Accuracy**: All data reflects current calendar state without manual synchronization
3. **Output**: Accurate, calendar-derived capacity data for sprint planning with zero manual calculation

#### **Workflow 4: Capacity Monitoring (Stakeholder)**

1. **Prerequisites**: Read-only access granted to specific teams
2. **Steps**:
   - Login and view authorized teams list
   - Select team(s) to monitor
   - View capacity dashboard showing:
     * Current sprint capacity
     * Future sprint forecasts
     * Team calendar with time-off visualization
   - Filter by date range or sprint
   - Export reports as needed
3. **Output**: Capacity visibility for planning and coordination

---

## **4. Functional Requirements**

### **4.1 Authentication and Authorization**

#### **4.1.1 User Authentication System**

**Primary Authentication Methods:**
* **Phase 1**: Session-based authentication with secure password verification
* **Phase 2**: Azure AD/SSO integration with local account fallback
* All users must authenticate before accessing any system functions
* Session timeout after 30 minutes of inactivity with warning at 25 minutes

**Login/Logout Functionality:**
* Secure login endpoint with username/password validation
* Password verification using bcrypt hashing
* Session creation with secure HTTP-only cookies
* Logout functionality that invalidates server-side sessions
* Automatic redirect to login page for unauthenticated requests

#### **4.1.2 User Registration and Onboarding**

**Account Creation Process:**
* **Phase 1**: Admin-created accounts with initial password setup
* **Phase 2**: Self-registration with email verification
* Email verification required for all new accounts
* Initial password setup via secure token-based link
* Profile completion workflow for new users

**Admin Account Management:**
* System administrators can create user accounts
* Bulk user import from CSV with email validation
* User invitation system with secure activation links
* Account deactivation vs deletion policies defined

#### **4.1.3 Password Security Requirements**

**Password Policy Enforcement:**
* Minimum 8 characters, maximum 128 characters
* Must contain: uppercase letter, lowercase letter, number, special character
* Cannot reuse last 5 passwords
* Password strength indicator during creation/change
* Optional password expiration (configurable, default: disabled)

**Password Management:**
* Secure password reset via email-based token system
* Password reset tokens expire after 1 hour
* Account lockout after 5 failed login attempts
* Lockout duration: 15 minutes (configurable)
* Self-service password change functionality

#### **4.1.4 Session Management**

**Session Security:**
* Sessions stored server-side with secure session tokens
* HTTP-only, secure cookies for session identification
* Session data includes: user ID, roles, team memberships, last activity
* Concurrent session limit: 3 per user (configurable)
* Session invalidation on password change or role modification

**Token Specifications:**
* Session tokens: cryptographically secure random strings (32 bytes)
* Remember me functionality: optional 30-day extended sessions
* API tokens: JWT format for service accounts (Phase 2)
* Token refresh mechanism for long-running sessions

#### **4.1.5 Role-Based Access Control**

**Permission Enforcement:**
* System shall enforce role-based permissions as defined in Section 3.1.1
* Users can have multiple roles across different teams
* Role changes take effect immediately upon assignment
* API-level permission checking for all endpoints
* Frontend route protection based on user roles

**Multi-Team Role Management:**
* Users can have different roles on different teams
* Role hierarchy: System Admin > Team Lead > Team Member > Stakeholder
* Cross-team permissions managed via explicit assignment
* Role inheritance rules for team creation and membership

#### **4.1.6 Account Recovery and Management**

**Password Recovery:**
* "Forgot Password" functionality with email-based reset
* Security questions as secondary recovery method (Phase 2)
* Account recovery via administrator intervention
* Password reset audit logging with user notification

**Account Security:**
* Account lockout notifications via email
* Suspicious activity detection and alerting
* Login history and device tracking (Phase 2)
* Multi-factor authentication option (Phase 2)

#### **4.1.7 Single Sign-On Integration (Phase 2)**

**Supported SSO Providers:**
* **Azure Active Directory**: Enterprise authentication for organizations using Microsoft 365
* **Google Workspace**: Enterprise authentication for organizations using Google Workspace
* **Google OAuth 2.0**: Consumer and enterprise Google account authentication
* Multiple provider support with provider selection on login page

**Azure AD Integration:**
* Azure AD tenant integration with app registration
* User attribute mapping: email, name, groups to local roles
* Group-based role assignment from Azure AD organizational units
* Automatic user provisioning from Azure AD groups
* Support for Azure AD B2B guest users

**Google SSO Integration:**
* Google Workspace domain authentication with admin controls
* Google OAuth 2.0 for consumer Google accounts
* User attribute mapping: email, name, profile picture to local user data
* Google Groups integration for role assignment (Workspace only)
* Automatic user provisioning from Google Workspace organizational units

**Multi-Provider Configuration:**
* Support for both Azure AD and Google SSO simultaneously
* Provider selection based on email domain or user choice
* Account linking between different SSO providers and local accounts
* Provider-specific role mapping and user attribute handling

**Fallback Authentication:**
* Local account authentication when SSO providers unavailable
* Account linking between SSO providers and local accounts
* Emergency admin access independent of SSO providers
* Graceful degradation during SSO provider outages
* Provider failover with user notification

### **4.2 Team Management**

#### **4.2.1 Team Creation**
* Team Leads can create new teams with unique names
* Required fields: Team Name, Description, Velocity Baseline, Sprint Cadence, Working Days Configuration
* Optional fields: Team Tags, Cost Center, Department
* System validates team name uniqueness
* Working days configuration allows selection of which days of the week are working days (e.g., Mon-Fri, Sun-Thu, or custom 4-day schedule)

#### **4.2.2 Team Member Management**
* Team Leads can add members from authenticated user directory
* Team Leads can remove members with confirmation prompt
* Members can request to join teams (requires Lead approval)
* System maintains audit trail of all membership changes

#### **4.2.3 Team Configuration**
* Velocity baseline adjustable by Team Leads at any time
* Sprint cadence configurable (1-4 weeks)
* Working days fully configurable per team:
  - Default: Monday-Friday
  - Preset options: Mon-Fri, Sun-Thu, Mon-Thu (4-day week)
  - Custom configuration: Select any combination of weekdays
  - Changes to working days trigger capacity recalculation for future sprints
* Time zone setting per team
* Configuration changes logged in audit trail

### **4.3 Sprint Management**

#### **4.3.1 Sprint Auto-Generation**
* System generates next 12 sprints based on configured cadence
* Sprints named automatically: [Team Name] Sprint [Number]
* Start date based on team configuration
* End date calculated from start date + cadence
* System calculates total working days per sprint based on team's configured working days
* Sprints automatically account for team's working day schedule (e.g., 8 working days for 2-week sprint with 4-day work week)

#### **4.3.2 Sprint Modification**
* Team Leads can adjust sprint dates for future sprints
* Cannot modify current or past sprint dates
* System recalculates capacity when dates change
* Warning displayed if sprint dates overlap

#### **4.3.3 Sprint Archival**
* Completed sprints move to archive 30 days after end date
* Archived sprints remain viewable but not editable
* Capacity data preserved for historical reporting

### **4.4 Calendar Management**

#### **4.4.1 Holiday Management**
* Team Leads can add company holidays affecting entire team
* Holidays can be single day or date range
* Recurring holiday patterns supported (annual)
* Import from organizational calendar if available

#### **4.4.2 Personal Time-Off**
* Team Members log their own PTO/sick/personal days
* Date range selection with partial day support
* Optional description/notes field
* Automatic conflict detection with existing entries
* System only counts time off on configured working days for capacity impact
* Visual indicator shows which days affect capacity (working days) vs non-working days

#### **4.4.3 Calendar Entry Override**
* Team Leads can add/modify/delete any team member's entries
* Override actions require confirmation
* Audit trail maintained showing who made changes
* Email notification to affected team member

### **4.5 Capacity Calculation**

#### **4.5.1 Calculation Formula**
```
Sprint Capacity = Velocity Baseline × (Available Working Days / Total Sprint Working Days) × Team Size Factor

Where:
- Total Sprint Working Days = Count of team's configured working days within sprint date range
- Available Working Days = Total Sprint Working Days - Sum(Time Off Days)
- Team Size Factor = Current Team Size / Baseline Team Size
- Time Off Days include both holidays and personal time off that fall on configured working days
- Only time off on configured working days affects capacity (e.g., if team works Mon-Fri, weekend time off doesn't impact capacity)
```

Example: For a 2-week sprint with Mon-Fri working days:
- Total Sprint Working Days = 10
- If 2 days of PTO logged: Available Working Days = 8
- Capacity reduced to 80% of baseline

#### **4.5.2 Real-Time Updates**
* Capacity recalculates immediately upon calendar changes
* Calculations performed server-side for consistency
* Results cached for performance with 1-minute expiry
* PostgreSQL NOTIFY/LISTEN for real-time updates to connected clients
* Calculation leverages PostgreSQL date functions for accuracy:
  ```sql
  -- Example: Calculate working days between dates excluding weekends
  SELECT COUNT(*) 
  FROM generate_series(start_date, end_date, '1 day'::interval) AS day
  WHERE EXTRACT(DOW FROM day) = ANY(
    SELECT jsonb_array_elements_text(working_days_config)::int 
    FROM teams WHERE id = team_id
  );
  ```

#### **4.5.3 Capacity Display**
* Current sprint capacity prominently displayed on dashboard
* Future sprint capacities shown in forecast view
* Visual indicators for capacity below threshold (configurable)
* Capacity breakdown by team member available on demand

### **4.6 Reporting and Views**

#### **4.6.1 Dashboard View**
* Current sprint capacity with visual gauge
* Upcoming sprint forecast (next 3 sprints)
* Recent calendar entries
* Quick actions for common tasks

#### **4.6.2 Calendar View**
* Monthly calendar showing all time-off entries
* Non-working days visually distinguished (grayed out)
* Color coding by entry type
* Hover details for each entry
* Filter by team member
* Clear indication of which time-off days impact capacity

#### **4.6.3 Capacity Report**
* Exportable capacity report for sprint planning
* Includes capacity calculation breakdown
* Shows impact of each time-off entry
* PDF and CSV export formats

---

## **5. Non-Functional Requirements**

### **5.1 Performance Requirements**

* Page load time: < 2 seconds for dashboard
* Capacity calculation: < 1 second for single sprint
* Calendar view rendering: < 3 seconds for monthly view
* Support 100 concurrent users without degradation
* 99.9% uptime during business hours

### **5.2 Usability Requirements**

* Responsive design for desktop and tablet (minimum 1024x768)
* WCAG 2.1 AA compliance for accessibility
* Maximum 3 clicks to any major function
* Inline help and tooltips for complex features
* Consistent UI patterns throughout application

### **5.3 Security Requirements**

#### **5.3.1 Transport Security**
* All data transmission encrypted (HTTPS/TLS 1.2+)
* HTTP Strict Transport Security (HSTS) headers enforced
* Secure cookie flags (HttpOnly, Secure, SameSite) for all authentication cookies
* Content Security Policy (CSP) headers to prevent XSS attacks

#### **5.3.2 Authentication Security**
* Role-based access control enforced at API level
* Session management with secure token handling
* Cross-Site Request Forgery (CSRF) protection for all state-changing operations
* Rate limiting: 5 login attempts per minute per IP address
* Account lockout after 5 failed attempts with exponential backoff

#### **5.3.3 Data Protection**
* Password hashing using bcrypt with minimum 10 salt rounds
* Sensitive data encryption at rest using AES-256
* Personal Identifiable Information (PII) handling per privacy regulations
* Secure password reset token generation (cryptographically random, 32+ bytes)
* Password history storage (hashed) to prevent reuse

#### **5.3.4 API Security**
* Input validation and sanitization for all user inputs
* SQL injection prevention through parameterized queries
* Authorization checks on every API endpoint
* Secure error handling (no sensitive information in error messages)
* API versioning security considerations

#### **5.3.5 Audit and Monitoring**
* Audit logging for all authentication events and data modifications
* Login attempt logging with IP address and user agent
* Failed authentication attempt monitoring and alerting
* Security event logging with tamper-evident storage
* Regular security vulnerability scanning and penetration testing

#### **5.3.6 Frontend Security**
* Client-side input validation (with server-side verification)
* Protection against XSS attacks through output encoding
* Secure handling of authentication tokens in frontend
* Protection of sensitive data in browser storage
* Content Security Policy compliance in frontend code

### **5.4 Compatibility Requirements**

* **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
* **Operating Systems**: Windows 10+, macOS 10.15+
* **Screen Resolution**: Minimum 1024x768
* No browser plugins required
* Progressive enhancement for older browsers

### **5.5 Scalability Requirements**

* Architecture supports horizontal scaling
* Database designed for up to 1000 teams
* Support for 10,000 total users
* Calendar entries: 100,000+ without performance impact
* Archival strategy for data older than 2 years

---

## **6. Technical Requirements**

### **6.1 Technology Stack**

#### **Phase 1: Learning-Focused Stack**

* **Frontend**: 
  - Vanilla TypeScript (current setup) with HTML/CSS
  - Progressive enhancement approach
  - Migration to React 18+ planned for Phase 2
  
* **Backend**: 
  - Node.js 16+ with Express
  - Simple RESTful API architecture
  - Basic authentication (session-based initially)
  
* **Database**: 
  - PostgreSQL 14+ (local development with Docker)
  - Simple connection pooling
  - Redis deferred to Phase 2
  
* **Hosting**: 
  - Local development initially
  - Cloud deployment planned for Phase 2 (provider TBD)

#### **Phase 2: Production-Ready Stack**

* **Frontend**: 
  - React 18+ with TypeScript
  - Material-UI or similar component library
  - State management: Redux or Context API
  
* **Backend**: 
  - Enhanced Express API with middleware
  - JWT for authentication tokens
  - SSO integration libraries (Passport.js with Azure AD and Google OAuth strategies)
  - Full caching layer
  
* **Database**: 
  - Managed PostgreSQL service (cloud provider specific)
  - Redis for caching and sessions
  
* **Hosting**: 
  - Cloud application platform (Azure App Service, AWS Elastic Beanstalk, Google Cloud Run, or similar)
  - Managed PostgreSQL database service
  - Managed Redis cache service

**Database Selection Rationale:**
PostgreSQL was selected for the following reasons:
- **Cost-effective**: Open source with managed service options across all major cloud providers
- **JSON support**: Native JSONB type perfect for flexible team configurations (working days, custom settings)
- **Excellent date/time handling**: Critical for calendar operations and timezone support
- **ACID compliance**: Ensures data integrity for capacity calculations
- **Cloud portability**: Available as managed service on AWS, Azure, Google Cloud, and others
- **Developer familiarity**: Common in Node.js ecosystem

### **6.2 Architecture Overview**

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│   Express API   │────▶│  PostgreSQL DB  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                          │
                               ▼                          ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │   Redis Cache   │     │   File Storage  │
                        └─────────────────┘     └─────────────────┘
```

**Key Architectural Decisions:**

1. **Database Connection Pooling**: Use pg-pool for PostgreSQL to manage connections efficiently
2. **ORM Selection**: Prisma or TypeORM for database abstraction and migration management
3. **JSONB Usage**: Leverage PostgreSQL's JSONB type for flexible team configurations while maintaining queryability
4. **Caching Strategy**: Redis for session management and frequently accessed capacity calculations
5. **API Design**: RESTful endpoints with option to add GraphQL for complex queries

### **6.3 Data Requirements**

#### **6.3.1 Data Models**

```sql
-- PostgreSQL-specific schema leveraging native types
-- Core Entities
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  velocity_baseline INTEGER NOT NULL CHECK (velocity_baseline > 0),
  sprint_cadence_weeks INTEGER NOT NULL CHECK (sprint_cadence_weeks BETWEEN 1 AND 4),
  working_days_config JSONB NOT NULL DEFAULT '["Monday","Tuesday","Wednesday","Thursday","Friday"]'::jsonb,
  created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  -- Validation for working_days_config format
  CONSTRAINT valid_working_days CHECK (
    jsonb_typeof(working_days_config) = 'array' AND
    jsonb_array_length(working_days_config) BETWEEN 1 AND 7
  )
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- bcrypt hash for local authentication
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('system_admin', 'team_lead', 'team_member', 'stakeholder')) NOT NULL DEFAULT 'team_member',
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  email_verification_token VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP WITH TIME ZONE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  failed_login_attempts INTEGER DEFAULT 0,
  account_locked_until TIMESTAMP WITH TIME ZONE,
  azure_id VARCHAR(255) UNIQUE, -- For Azure AD integration
  google_id VARCHAR(255) UNIQUE, -- For Google SSO integration
  sso_provider VARCHAR(50), -- 'azure', 'google', 'local', or NULL
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT users_email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT users_names_not_empty CHECK (length(trim(first_name)) > 0 AND length(trim(last_name)) > 0),
  CONSTRAINT users_sso_provider_valid CHECK (sso_provider IN ('azure', 'google', 'local') OR sso_provider IS NULL)
);

-- User sessions table for server-side session management
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(64) UNIQUE NOT NULL, -- Cryptographically secure token
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_remember_me BOOLEAN DEFAULT false
);

-- Password history for preventing reuse
CREATE TABLE password_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced audit log for authentication events
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id UUID REFERENCES user_sessions(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  ip_address INET,
  user_agent TEXT,
  old_value JSONB,
  new_value JSONB,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE team_members (
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  left_date DATE,
  PRIMARY KEY (team_id, user_id)
);

CREATE TABLE sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_working_days INTEGER NOT NULL CHECK (total_working_days > 0),
  calculated_capacity DECIMAL(10,2) CHECK (calculated_capacity >= 0),
  status VARCHAR(50) DEFAULT 'future',
  CONSTRAINT valid_sprint_dates CHECK (end_date > start_date),
  CONSTRAINT valid_status CHECK (status IN ('future', 'active', 'completed', 'archived')),
  UNIQUE(team_id, name)
);

CREATE TABLE calendar_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  entry_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_entry_dates CHECK (end_date >= start_date)
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  old_value JSONB,
  new_value JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_calendar_entries_dates ON calendar_entries(start_date, end_date);
CREATE INDEX idx_calendar_entries_user_team ON calendar_entries(user_id, team_id);
CREATE INDEX idx_sprints_team_dates ON sprints(team_id, start_date, end_date);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_team_members_user ON team_members(user_id) WHERE left_date IS NULL;

-- Authentication-specific indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_azure_id ON users(azure_id) WHERE azure_id IS NOT NULL;
CREATE INDEX idx_users_google_id ON users(google_id) WHERE google_id IS NOT NULL;
CREATE INDEX idx_users_sso_provider ON users(sso_provider) WHERE sso_provider IS NOT NULL;
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_user_active ON user_sessions(user_id, expires_at) WHERE expires_at > NOW();
CREATE INDEX idx_password_history_user ON password_history(user_id, created_at);
CREATE INDEX idx_audit_log_user_action ON audit_log(user_id, action, timestamp);
CREATE INDEX idx_audit_log_session ON audit_log(session_id) WHERE session_id IS NOT NULL;

-- PostgreSQL-specific: GIN index for JSONB working_days_config searches
CREATE INDEX idx_teams_working_days ON teams USING GIN (working_days_config);
```

#### **6.3.2 Data Retention**

* Active data: Real-time access required
* Archived sprints: Read-only after 30 days
* Audit logs: Retained for 1 year
* Deleted teams: Soft delete with 90-day recovery

**PostgreSQL Archival Strategy:**
- Use table partitioning for calendar_entries by year
- Archive completed sprints to separate schema after 6 months
- Implement PostgreSQL table inheritance for transparent access
- Automated archival process using pg_cron or external scheduler
- Compressed backups for data older than 2 years

#### **6.3.3 Data Security**

* All connections use SSL/TLS encryption
* Database credentials stored in cloud provider's key management service (Azure Key Vault, AWS Secrets Manager, Google Secret Manager)
* Row-level security for multi-tenant isolation
* Encrypted backups using cloud provider's storage encryption
* Regular security audits of database access patterns

### **6.4 Frontend Authentication Requirements**

#### **6.4.1 Authentication UI Components**

**Login Interface:**
* Login form with email/password fields for local authentication
* Password visibility toggle
* "Remember Me" checkbox (optional)
* "Forgot Password" link
* **SSO Provider Buttons**: "Sign in with Google" and "Sign in with Microsoft" options
* Provider selection based on email domain detection
* Loading states during authentication for all providers
* Clear error messaging for failed attempts (local and SSO)
* Account lockout notifications
* Provider-specific error handling and user guidance

**Session Management UI:**
* Session timeout warning (5 minutes before expiry)
* Automatic logout with user notification
* Session extension prompt for active users
* Multiple session management indicator

#### **6.4.2 Protected Route Handling**

**Route Protection:**
* Automatic redirect to login for unauthenticated users
* Return to intended page after successful login
* Role-based route access control
* Loading states during authentication checks
* Graceful handling of session expiry

**State Management:**
* User authentication state persistence
* Role and permission caching
* Team membership state management
* Automatic state refresh on permission changes

#### **6.4.3 Security Implementation**

**Client-Side Security:**
* Secure token storage (HTTP-only cookies preferred)
* XSS protection through output encoding
* Input validation with server-side verification
* CSRF token handling for state-changing operations
* Secure logout with token invalidation

---

## **7. Testing Requirements**

### **7.1 Testing Strategy**

* Test-Driven Development approach
* Automated testing pipeline in CI/CD
* Manual testing for UI/UX validation
* Security testing for authentication flows

### **7.2 Test Coverage Requirements**

* **Unit Tests**: 80% code coverage minimum
* **Integration Tests**: All API endpoints including SSO callbacks
* **Authentication Tests**: Local login, Azure AD SSO, Google SSO, and fallback scenarios
* **UI Tests**: Critical user workflows including multi-provider login flows
* **Performance Tests**: Load testing for 100 concurrent users
* **Security Tests**: Penetration testing before launch including SSO security validation
* **Provider Testing**: Mock testing for Azure AD and Google OAuth responses

### **7.3 User Acceptance Testing**

* Beta testing with 2-3 pilot teams
* 2-week testing period
* Feedback incorporation before general release
* Success criteria: 90% task completion rate

---

## **8. Implementation Approach**

### **8.1 Development Phases**

#### **Phase 1: Learning-Focused MVP (Weeks 1-8)**

**Week 1-2: Foundation Setup**
* Set up TypeScript project structure
* Create basic HTML templates and CSS
* Set up PostgreSQL with Docker
* Implement basic user model and authentication

**Week 3-4: Core Team & Calendar**
* Build team creation and management
* Implement basic calendar entry system
* Create simple forms for data entry
* Basic data validation

**Week 5-6: Capacity Calculation**
* Implement simplified capacity formula
* Create basic sprint management
* Build simple dashboard display
* Add real-time updates

**Week 7-8: Testing & Polish**
* Write comprehensive tests (TDD approach)
* Fix bugs and edge cases
* Basic UI improvements
* Local deployment testing

#### **Phase 2: Enhanced Features (Future Sprints)**

**Advanced Features Implementation (Weeks 9-16)**
* Migrate to React framework
* Add advanced user roles
* Implement complex capacity algorithms
* Add reporting and export features
* Cloud deployment
* Production hardening

### **8.2 Database Deployment Strategy**

**Development Environment:**
- Local PostgreSQL 14+ installation or Docker container
- Sample data seeding scripts
- Development-specific configurations

**Staging Environment:**
- Managed PostgreSQL service (cloud provider specific)
- Automated backup configuration
- Performance testing environment

**Production Deployment Options:**

**Option 1: Managed PostgreSQL Service (Recommended for initial launch)**
- **Examples**: Azure Database for PostgreSQL, AWS RDS for PostgreSQL, Google Cloud SQL for PostgreSQL
- **Cost**: ~$25-100/month depending on provider and tier
- **Benefits**: Managed service, automated backups, easy scaling
- **Configuration**: General Purpose tier with 2-4 vCores equivalent

**Option 2: Containerized PostgreSQL**
- **Examples**: Azure Container Instances, AWS ECS, Google Cloud Run
- **Cost**: ~$50-150/month including storage
- **Benefits**: More control, portable across cloud providers
- **Considerations**: Requires more operational overhead

**Cloud Provider Migration Strategy:**
1. Use database abstraction layer (e.g., Prisma, TypeORM) for portability
2. Minimize cloud-specific database features
3. Use standard PostgreSQL features for maximum compatibility
4. Container-based deployment for easy cloud migration

### **8.3 Migration Strategy**

1. Export existing data from spreadsheets and Confluence
2. Data transformation scripts for import
3. Pilot team validation of migrated data
4. Phased rollout by department
5. Legacy system retirement after 90 days

### **8.4 Development Environment Setup**

**PostgreSQL Local Development Options:**

**Option 1: Docker Compose (Recommended)**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: sprint_capacity
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

**Option 2: Direct Installation**
- Install PostgreSQL 14+ locally
- Create development database and user
- Configure pg_hba.conf for local development

**Database Migrations:**
- Use migration tool (Prisma Migrate, TypeORM migrations, or node-pg-migrate)
- Version control all schema changes
- Automated migration running in CI/CD pipeline

**Development Data:**
- Seed scripts for test teams, users, and calendar entries
- Anonymized production data for realistic testing
- Reset scripts for clean development state

---

## **Document Approval**

| Role | Name | Signature | Date |
| ----- | ----- | ----- | ----- |
| Product Owner |  |  |  |
| Technical Lead |  |  |  |
| Development Lead |  |  |  |
| QA Lead |  |  |  |
| Key Stakeholder |  |  |  |