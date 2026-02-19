# Specification

## Summary
**Goal:** Create a groomer onboarding page where groomers can sign up, list their services, and register with the platform.

**Planned changes:**
- Add a new `/groomer-onboard` route with a signup form for groomers
- Collect groomer details including name, contact information, and business information
- Provide a service listing interface where groomers can add, edit, and remove services with title, description, and price range
- Apply the existing Chewy blue color scheme and typography consistently across all onboarding UI elements
- Create backend methods to handle groomer registration and store groomer profiles and services
- Connect the frontend form to backend using React Query with loading states and success/error feedback
- Add navigation between the scheduler page and groomer onboarding page

**User-visible outcome:** Groomers can visit a dedicated onboarding page to sign up and list their services, while pet owners can navigate between the scheduler and groomer onboarding flows.
